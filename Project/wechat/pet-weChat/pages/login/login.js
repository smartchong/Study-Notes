//index.js
//获取应用实例
const RSA = require('../../utils/rsa').default;
const CheckFun = require('../../utils/checkFun').default;
const app = getApp();
Page({
  data: {
    formData: {},
    rules: [{
          name: 'mobile',
          rules: [{required: true, message: '请输入手机号码！'}, {validator:CheckFun.isMobile, message: '手机号码或密码错误，请重新输入！'}],
      }, {
          name: 'password',
          rules: [{required: true, message: '请输入密码！'}, {validator:CheckFun.isPassword, message: '手机号码或密码错误，请重新输入！'}],
      }],
    imageUrl:'',
    hasUserInfo:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    // app.wxp.request({
    //   url: app.globalData.apiPath+'/petfeeder/login/getCaptcha',
    // }).then((r)=>{
    //   if(r.data.code==='200'){
    //     app.globalData.third_session = r.header.token;
    //     app.wxp.setStorageSync('third_session', r1.header.token);
    //     this.setData({imageUrl:r.data.url});
    //   }
    // })
    if (app.globalData.userInfo) {
      this.setData({
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          hasUserInfo: true
        })
      }
    }
  },
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },
  getUserInfo(e){
    if(e.detail.errMsg.indexOf('ok')>-1){
      app.globalData.userInfo = e.detail.userInfo;
      this.submitForm();
    }
  },
  submitForm () {
    this.selectComponent('#form').validate((valid, errors) => {
      //console.log('valid', valid, errors)
      if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
              // this.setData({
              //     error: errors[firstError[0]].message
              // })
              wx.showToast({
                title: errors[firstError[0]].message,
                icon: 'none',
                duration: 2000
              })
          }
      } else {
          wx.showLoading({title: '加载中'});
          app.wxp.request({
            url: app.globalData.apiPath+'/petfeeder/login/getModulus',
            // header:{
            //   'token':app.globalData.third_session
            // }
          }).then(res=>{
              app.globalData.third_session = res.header.token;
              app.wxp.setStorageSync('third_session', res.header.token);          
              if(res.data.code==='200'){
                const pk = RSA.getKeyPair(res.data.result.exponent,'',res.data.result.modulus);
                app.wxp.request({
                  url: app.globalData.apiPath+'/petfeeder/login/login',
                  method:"POST",
                  data:{
                      password:RSA.encryptedString(pk,this.data.formData.password),
                      userName:this.data.formData.mobile
                  },
                  header:{
                    'token':res.header.token
                  }}).then(r1=>{
                    wx.hideLoading();
                    if(r1.data.code==='200'){
                      app.globalData.app_role=2;
                      app.globalData.third_session = r1.header.token;
                      app.globalData.userInfo.mobile = r1.data.result.mobile;
                      app.wxp.setStorageSync('app_role', 2);
                      app.wxp.setStorageSync('third_session', r1.header.token);
                      app.wxp.switchTab({
                        url: '/pages/worker/orderList',
                      })
                    }else{
                      wx.showToast({title: r1.data.message,
                        icon: 'none',
                        duration: 2000
                      })
                    }
                  })
              }else{
                wx.hideLoading();
                wx.showToast({title: r1.data.message,
                  icon: 'none',
                  duration: 2000
                })
              }
            })
      }
    }) 
  },
  reLoad(){
    this.setData({imageUrl:this.data.imageUrl+'&r='+Math.random()})
  }
})
