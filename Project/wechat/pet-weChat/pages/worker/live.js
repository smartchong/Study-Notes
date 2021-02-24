// pages/worker/live.js
const app = getApp();
const pushModeMap = {
  '标清': 'SD',
  '高清': 'HD',
  '超清': 'FHD',
};

Page({
  data: {
    orderCode: '',
    pushURL: null,
    pushMode: 'SD',
    pushModeText: '标清',
    active: true,
    magic: true,
    pushState: 'stop', 
    count: 5,
    timer:null,
    isTimer: false
  },

  onLoad: function (option) {
    this.pushContext = app.wxp.createLivePusherContext();
    this.getPushUrl(option.id);
  },

  getPushUrl(id) {
    const that = this;
    wx.showLoading();
    app.wxp.request({
      url: app.globalData.apiPath+'/petfeeder/order/operate',
      method:"POST",
      data:{
        orderCode:id,	
        operateType:'1003'
      },
      header:{
        token:app.globalData.third_session
      }
    }).then(r1=>{  
        wx.hideLoading();
        if(r1.data.code==='200'){
          console.log(r1.data.result.pushStreamUrl)
          that.setData({
            orderCode:id,
            pushURL:r1.data.result.pushStreamUrl
          },() => {
            that.startPush();
          });
        }else{
          app.wxp.showToast({
            title: typeof r1.data.message !== 'undefined' ? r1.data.message : '服务器暂无响应，请稍后重试',
            icon: 'none',
            duration: 2000
          }).then(() => {
            that.setData({
              orderCode:id
            },() => {
              wx.navigateBack();
            });
          });  
        }
    }).catch(() => {
      wx.hideLoading();
      app.wxp.showToast({
        title: '服务器暂无响应，请稍后重试',
        icon: 'none',
        duration: 2000
      }).then(() => {
        that.setData({
          orderCode:id
        },() => {
          wx.navigateBack();
        });
      });
    })
  },

  onShow() {
    wx.setKeepScreenOn({
      keepScreenOn: true,
    });
  },

  onHide() {
    wx.setKeepScreenOn({
      keepScreenOn: false,
    });
    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.setData({
        isTimer:false,
        timer:null,
        count:5
      });
    }
  },

  onShareAppMessage() {
  
  },

  /**
   * 展示直播功能菜单
   */
  onViewTap() {
    this.setData({ active: !this.data.active });
  },

  /**
   * 切换模式
   */
  onModeTap() {
    const list = ['标清', '高清', '超清'];
    wx.showActionSheet({
      itemList: list,
      success: (res) => {
        this.setData({ pushMode: pushModeMap[list[res.tapIndex]], pushModeText: list[res.tapIndex] });
      },
    })
  },

  /**
   * 美颜开启关闭
   */
  onMagicTap() {
    this.setData({ magic: !this.data.magic });
  },

  /**
   * 退出直播
   */
  onCloseTap() {
    wx.showLoading();
    app.wxp.request({
      url: app.globalData.apiPath+'/petfeeder/order/operate',
      method:"POST",
      data:{
        orderCode:this.data.orderCode,	
        operateType:'1004'
      },
      header:{
        token:app.globalData.third_session
      }
    }).then(r1=>{  
        wx.hideLoading();
        if(r1.data.code==='200'){
          const pages = getCurrentPages();
          const prevPage = pages[pages.length-2];
          prevPage.setData(
            {
              isLiveEnd:true,
              isNeedTimer:true
            });
          wx.navigateBack({
            delta:1
          });
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
   * 切换摄像头
   */
  onSwitchCamera() {
    this.pushContext.switchCamera();
  },

  startPush() {
    const that = this;
    this.setData({ pushState: 'pending' });
    this.pushContext.start({
      success: () => {
        app.sendWsMsg && app.sendWsMsg({type: 'live-status-change'});
        console.log('send', app.sendWsMsg);
        this.setData({ pushState: 'pushing',isTimer: true },() => {
          that.data.timer = setInterval(function(){
            let count = that.data.count - 1;
              that.setData({ 
                count,
              },() => {
                if (count <= 1) {
                  clearInterval(that.data.timer);
                  that.setData({
                    isTimer:false,
                    timer:null,
                    count:5
                  });
                }
              });
          },1000);
        });
      },
      fail: () => {
        wx.showToast({ title: '推流失败' });
        this.setData({ pushState: 'stop' });
      },
    });
  },

  statechange(e) {
    switch (e.detail.code) {
      case -1307:
        wx.showToast({ title: '和远程服务器失去连接', icon: 'none' });
        break;
      case 3004:
        wx.showToast({ title: '远程服务器主动断开连接', icon: 'none' });
        break;
      case 1101:
        wx.showToast({ title: '当前网络状况不佳', icon: 'none' });
        break;
      default:
        break;
    }
    console.log('live-pusher code:', e.detail.code)
    console.log('live-pusher code:', e.detail)
  },
  netstatuschange(e){
    console.log('live-pusher info',e.detail.info);
  },
  /**
   * 结束推流
   */
  onUnload() {
    this.pushContext.stop();
    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.setData({
        isTimer:false,
        timer:null,
        count:5
      });
    }
  },
})
