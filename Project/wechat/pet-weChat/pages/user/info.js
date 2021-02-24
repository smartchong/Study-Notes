// pages/user/info.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    app_role:null,
    show: false,
    isLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      const data = { selected: 2 };
      const list = app.globalData.app_role === null ? [] : app.globalData.tabBar[app.globalData.app_role];
      if (JSON.stringify(this.getTabBar().data.list) !== JSON.stringify(list)) {
        data.list = list;
      }
      this.getTabBar().setData(data);
    }
    this.setData({
      userInfo: app.globalData.userInfo,
      app_role: app.globalData.app_role,
      isLogin: app.globalData.third_session?true:false
    })
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

  },
  logout() {
    app.wxp.request({
      url: app.globalData.apiPath + (app.globalData.app_role == 1 ? "/petowner/login/logout" : "/petfeeder/login/logout"),
      header: {
        token: app.globalData.third_session || ''
      }
    }).then(res => {
      if (res.data.code === '200') {
        //console.log(app.globalData.liveContext)
        if (app.globalData.liveContext) {
          app.globalData.liveContext.exitPictureInPicture();
          app.globalData.liveContext = null;
        }
        wx.clearStorage();
        app.globalData.app_role = null;
        app.globalData.third_session = null;
        app.wxp.redirectTo({
          url: '/pages/index/index',
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  onClose: function () {
    this.setData({
      show: false
    })
  },

  showLogout() {
    if (this.data.show) return;
    this.setData({
      show: true
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
              this.setData({
                userInfo: app.globalData.userInfo,
                app_role: app.globalData.app_role,
                isLogin: app.globalData.third_session?true:false
              })
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
  goToIndex(){
    app.globalData.app_role = null;
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  goToAgree() {
    wx.navigateTo({
      url: '/pages/user/agreement'
    })
  },

})