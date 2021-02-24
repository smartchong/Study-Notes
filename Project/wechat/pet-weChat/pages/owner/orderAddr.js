// pages/owner/orderAddr.js
const CheckFun = require('../../utils/checkFun').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData:{
      userName:'',
      userMobile:'',
      region:{value:['','','']},
      address:'',
    },
    formData: {
      userName:'',
      userMobile:'',
      region:'',
      address:'',
    },
    region:["北京市", "北京市", "东城区"],
    rules: [{
          name: 'userName',
          rules: [{required: true, message: '请输入宠物主姓名'},{validator:CheckFun.isChars,message:'请输入2-10位宠物主姓名，不支持特殊符号。'}],
      },{
          name: 'userMobile',
          rules: [{required: true, message: '请输入联系号码！'}, {validator:CheckFun.isMobile,message: '请输入正确的联系号码！'}],
      },{
        name: 'region',
        rules: [{required: true, message: '请输入所在地区！'}],
    },{
      name: 'address',
      rules: [{required: true, message: '请输入详细地址！'}]
  }]
  },
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value,
        [`postData.${field}`]: e.detail.value
    })
  },
  bindRegionChange(e){
    console.log(e.detail);
    this.setData({
      region:e.detail.value,
      [`postData.region`]: e.detail,
      ['formData.region']:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (r) => {
      //console.log(r.lastData)
      this.setData({
        region:r.lastData.parker.value,
        ['formData.userName']:r.lastData.userName,
        ['formData.userMobile']:r.lastData.userMobile,
        ['formData.region']:r.lastData.parker.value[0]===''?'':r.lastData.parker.value,
        ['formData.address']:r.lastData.serviceDetailAddress,
        ['postData.userName']:r.lastData.userName,
        ['postData.userMobile']:r.lastData.userMobile,
        ['postData.region']:r.lastData.parker,
        ['postData.address']:r.lastData.serviceDetailAddress
      })
    })
  },
  submitForm(){
    const eventChannel = this.getOpenerEventChannel();
    this.selectComponent('#form').validate((valid, errors) => {
      //console.log('valid', valid, errors)
      // this.selectComponent('#form').validateField('region',(valid, errors)=>{
      //   console.log('valid', valid, errors)
      // })
      if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
              wx.showToast({
                title: errors[firstError[0]].message,
                icon: 'none',
                duration: 2000
              })
          }
      } else {
        eventChannel.emit('acceptDataFromOpenedPage',{data: this.data.postData});
        wx.navigateBack({delta: 1});
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})