// pages/worker/orderDetail.js
const app =getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData:null,
    durl:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.wxp.request({
      url: app.globalData.apiPath+'/petfeeder/order/detail?orderCode='+options.id,
      method:"POST",
      header:{
        token:app.globalData.third_session
      }
    }).then(r1=>{
      if(r1.data.code==='200'){
        let durl = "";
        const data = JSON.parse(JSON.stringify(r1.data.result));
        if (data.orderStatus == 4 && data.vedioList.length > 0) {
          durl = data.vedioList[0].url;
        }
        this.setData({
          orderData:data,
          durl
        });
      }else{
        wx.showToast({title: r1.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = app.wxp.createVideoContext("orderDetailVideo");
  },

  /**
   * 播放结束退出全屏
   */
  bindPlayEnd: function() {
    this.videoContext.exitFullScreen();
  },

  /**
   * 切换视频
   */
  switchVideo: function(e) {
    let index = e.currentTarget.dataset.index;
    const vedioList = this.data.orderData.vedioList;
    this.setData({
      durl:vedioList[index].url
    },() => {
      this.videoContext.src = this.data.durl;
      this.videoContext.play();
    })
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