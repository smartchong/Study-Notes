// pages/owner/orderDetail.js
const app =getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 订单数据
    orderData:null,
    // 直播视频
    pullURL: null,
    // 竖屏方向
    isYz: false,
    // 全屏控制
    fullScreen: false,
    // 直播控制按钮显示
    hiddenControl: false,
    // 刷新
    isRefresh: false,
    // 录播视频
    durl:"",
    mode: ["push", "pop"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading();
    this.getDetails(options.id);
  },

  getDetails: function (id) {
    app.wxp.request({
      url: app.globalData.apiPath+'/petOwner/order/ownerDetail?orderCode=' + id,
      method:"POST",
      header:{
        token:app.globalData.third_session
      }
    }).then(r1=>{
      wx.hideLoading();
      if(r1.data.code==='200'){
        let durl = "";
        const data = JSON.parse(JSON.stringify(r1.data.result));
        if (data.orderStatus == 4 && data.vedioList.length > 0) {
          durl = data.vedioList[0].url;
          this.setData({
            orderData:data,
            durl
          },() => {
            this.videoContext = app.wxp.createVideoContext("orderDetailVideo");
            // 保持屏幕常亮
            app.wxp.setKeepScreenOn({
              keepScreenOn: true
            });
          });
        } else if (data.orderStatus == 3) {
          const that = this;
          //console.log(data.pullStreamUrl)
          this.setData({
            orderData:data,
            pullURL:data.pullStreamUrl
          },() => {
            if (!app.globalData.liveContext) {
              app.globalData.liveContext = app.wxp.createLivePlayerContext('player', this);
              app.globalData.liveContext.play({
                success: function() {
                  that.setData({
                    isRefresh:false
                  });
                  console.log('play success');
                },
                fail: function() {
                  that.setData({
                    isRefresh:true
                  });
                  console.log('play fail');
                },
                complete: function() {
                  //console.log('complete');
                }
              });
              // 保持屏幕常亮
              app.wxp.setKeepScreenOn({
                keepScreenOn: true
              });
            } else {
              console.log(this.data.pullURL)
              app.globalData.liveContext.src = this.data.pullURL;
              app.globalData.liveContext.play({
                success: function() {
                  that.setData({
                    isRefresh:false
                  });
                  console.log('play success');
                },
                fail: function() {
                  that.setData({
                    isRefresh:true
                  });
                  //console.log('play fail');
                },
                complete: function() {
                  //console.log('complete');
                }
              });
              // 保持屏幕常亮
              app.wxp.setKeepScreenOn({
                keepScreenOn: true
              });
            }
          }) 
        } else {
          this.setData({
            orderData:data
          })
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
   * 刷新页面
   */
  refreshPage: function () {
    wx.showLoading();
    this.getDetails(this.data.orderData.orderCode);
  },

  /**
   * 直播状态变化
   */
  statechange(e) {
    console.log(e.detail.code);
    switch (e.detail.code) {
      case 2004:
        this.setData({
          isRefresh:false
        });
        break;
      case 2103:
        wx.showToast({ title: '断开连接，正在重连', icon: 'none' });
        break;
      case -2301:
        this.setData({
          isRefresh:true
        });
        wx.showToast({ title: '和远程服务断开连接', icon: 'none' });
        break;
    }
  },

  coverTap: function() {
    let t = new Date().getTime();
    this.data.lastTime && t - this.data.lastTime < 400 && (console.log("双击"), this.fullScreenCtrl());
    this.setData({
      lastTime: t,
      hiddenControl: !this.data.hiddenControl
    },() => {
      this.restControl();
    });
  },

  restControl: function() {
    const that = this;
    clearTimeout(this.coverTimeout);
    this.coverTimeout = null; 
    this.coverTimeout = setTimeout(function() {
      that.setData({
          hiddenControl: true
      });
    }, 7e3);
  },

  /**
   * 直播全屏切换事件
   */
  fullScreenEvent: function() {
    this.fullScreenCtrl();
  },

  fullscreenchange: function(t) {
    this.fullScreen = t.detail.fullScreen;
  },

  fullScreenCtrl: function() {
    const that = this;
    if (!this.data.fullScreen) {
      app.globalData.liveContext.requestFullScreen({
        direction: this.data.isYz ? 90 : 0,
        success: function() {
          that.setData({
              fullScreen: true
          });
        }
      });
    } else {
      app.globalData.liveContext.exitFullScreen({
        direction: this.data.isYz ? 90 : 0,
        success: function() {
          that.setData({
            fullScreen: false
          });
        }
      });
    }
  },

  /**
   * 播放结束退出全屏
   */
  bindPlayEnd: function() {
    this.videoContext.exitFullScreen();
  },

  /**
   * 切换录播视频
   */
  switchVideo: function(e) {
    let index = e.currentTarget.dataset.index;
    const vedioList = this.data.orderData.vedioList;
    this.setData({
      durl:vedioList[index].url
    },() => {
      this.videoContext.src = this.data.durl;
      console.log(this.videoContext.src);
      this.videoContext.play();
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 屏幕常亮关闭
    wx.setKeepScreenOn({
      keepScreenOn: false,
    });
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    app.globalData.liveContext = null;
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