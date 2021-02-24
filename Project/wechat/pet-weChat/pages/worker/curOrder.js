// pages/worker/curOrder.js
const app =getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData:null,
    isLiveEnd:false,
    noOptDisable:false,
    finishDisable:false,
    isNeedTimer:false,
    liveBtnTxt:'直播',
    count:6,
    timer:null
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
   * 跳转直播页
   */
  startLive: function (e) {
    if (!this.data.isNeedTimer) {
      app.wxp.navigateTo({
        url: '/pages/worker/live?id=' + e.currentTarget.dataset.id,
      });
    }
  },

  /**
   * 暂不处理
   */
  noOpt: function () {
    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.setData({
        isNeedTimer:false,
        timer:null,
        count:6,
        liveBtnTxt:'直播'
      });
    }
    wx.showLoading();
    app.wxp.request({
      url: app.globalData.apiPath+'/petfeeder/order/operate',
      method:"POST",
      data:{
        orderCode:this.data.orderData.orderCode,	
        operateType:'1002'
      },
      header:{
        token:app.globalData.third_session
      }
    }).then(r1=>{  
        wx.hideLoading();
        if(r1.data.code==='200'){
          app.wxp.switchTab({
            url: '/pages/worker/orderList',
          })
        }else{
          wx.showToast({
            title: r1.data.message,
            icon: 'none',
            duration: 2000
          })
        }
    })
  }, 

  /**
   * 关闭订单
   */
  closeOrder: function () {
    const that = this;
    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.setData({
        isNeedTimer:false,
        timer:null,
        count:6,
        liveBtnTxt:'直播'
      });
    }
    wx.showLoading();
    app.wxp.request({
      url: app.globalData.apiPath+'/petfeeder/order/operate',
      method:"POST",
      data:{
        orderCode:this.data.orderData.orderCode,	
        operateType:'1005'
      },
      header:{
        token:app.globalData.third_session
      }
    }).then(r1=>{  
        wx.hideLoading();
        if(r1.data.code==='200'){
          that.setData({
            isLiveEnd:false
          },() => {
            app.wxp.switchTab({
              url: '/pages/worker/orderList',
            })
          })
        }else{
          wx.showToast({
            title: r1.data.message,
            icon: 'none',
            duration: 2000
          })
        }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCurOrder();
    if (this.data.isNeedTimer && !this.data.timer) {
      var that = this;
      this.data.timer = setInterval(
        function () {
            let count = that.data.count - 1;
            that.setData({ 
              count,
              liveBtnTxt:count 
            },() => {
              if (count < 1) {
                clearInterval(that.data.timer);
                that.setData({
                  isNeedTimer:false,
                  timer:null,
                  count:6,
                  liveBtnTxt:'直播'
                });
              }
            });
        }, 1000); 
    }  
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      const data = {selected:1};
      const list = app.globalData.app_role===null?[]:app.globalData.tabBar[app.globalData.app_role];
      if(JSON.stringify(this.getTabBar().data.list)!==JSON.stringify(list)){
        data.list = list;
      }
      this.getTabBar().setData(data);
   }
   if (this.data.isLiveEnd) {
      wx.showToast({
        title: '您是否已完成该订单，若完成请及时结束订单',
        icon: 'none',
        duration: 2000
      })
    }
    
  },

  getCurOrder: function() {
    app.wxp.request({
      url: app.globalData.apiPath+'/petfeeder/order/curservice', 
      method:"POST",
      header:{
        token:app.globalData.third_session
      }
    }).then(r1=>{
      if(r1.data.code==='200'){
        const data = JSON.parse(JSON.stringify(r1.data.result));
        if (!data || data == 'null') {
          this.setData({
            orderData:null
          },() => {
            wx.showToast({title: '没有当前服务订单，请先针对待服务订单进行立即上门处理',
              icon: 'none',
              duration: 2000
            })
          });
        } else {
          let noOptDisable = data.buttons.find(item => item.type == 1002) && data.buttons.find(item => item.type == 1002).disable == 0 ? false : true;
          let finishDisable = data.buttons.find(item => item.type == 1005) && data.buttons.find(item => item.type == 1005).disable == 0 ? false : true;
          this.setData({
            orderData:data,
            noOptDisable,
            finishDisable
          });
        }
      }else{
        wx.showToast({title: r1.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.setData({
        isNeedTimer:false,
        timer:null,
        count:6,
        liveBtnTxt:'直播'
      });
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.setData({
        isNeedTimer:false,
        timer:null,
        count:6,
        liveBtnTxt:'直播'
      });
    }
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