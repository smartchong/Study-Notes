// pages/owner/goodsDetail.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    image:'',
    title:'',
    price:'',
    name:'',
    addr:'',
    phone:'',
    descText:'',
    descPic:'',
    thumb:'',
    productCode:null,
    hasToken:null,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    app.wxp.request({
      url: app.globalData.apiPath+'/product/getProduct/'+options.id,
      method:"GET",
      header:{
        token:app.globalData.third_session
      }
    }).then(r1=>{
        if(r1.data.code==='200'){
          let data = r1.data.result;
          this.setData({
            loading:false,
            title:data.pfProductInfoDO.productName,
            image:data.pfProductInfoDO.masterGraphUrl,
            name:data.pfMerchantInfoDO.merchantName,
            price:data.pfProductInfoDO.productPrice,
            addr:data.pfMerchantInfoDO.merchantAddr,
            phone:'联系方式：'+data.pfMerchantInfoDO.contact,
            descText:data.pfProductInfoDO.productDesc,
            descPic:data.pfProductInfoDO.productGraphDesc,
            thumb:data.pfProductInfoDO.thumbnailUrl,
            productCode:options.id,
            hasToken:app.globalData.third_session
          });
        }else{
          wx.showToast({title: r1.data.message,
            icon: 'none',
            duration: 2000
          })
        }
    })
  },
  getUserInfo(e){
    if(e.detail.errMsg.indexOf('ok')>-1){
      app.globalData.userInfo = e.detail.userInfo;
      app.wxp.login().then(r=>{
        app.wxp.request({
          url: app.globalData.apiPath+'/petowner/login/login',
          data:{
            code:r.code
          },
          method:"POST"}).then(r1=>{
            if(r1.data.code==='200'){
              //console.log(r1.header.token);
              //app.wxp.setStorageSync('app_role', 1);
              app.wxp.setStorageSync('third_session', r1.header.token);
              app.globalData.third_session = r1.header.token;
              this.goToOrder();
            }else{
              wx.showToast({title: r1.data.message,
                icon: 'none',
                duration: 2000
              })
            }
          })
      });
    }
  },
  goToOrder(){
    app.globalData.goodsInfo = this.data;
    wx.navigateTo({
      url: '/pages/owner/confirmOrder?id='+this.data.productCode
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