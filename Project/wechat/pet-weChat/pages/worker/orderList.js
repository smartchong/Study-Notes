// pages/worker/orderList.js
const app =getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab data
    tabs:[
      {title:'待服务'},
      {title:'已服务'}
    ],
    activeTab: 0,
    // list data
    list: [],
    isLoading: false,
    // loadingMoreHidden: true,
    pageNum: 1
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
   * 获取订单列表
   */
  getList(append) {
    wx.showLoading();
    app.wxp.request({
      url: app.globalData.apiPath+'/petfeeder/order/list',
      method:"POST",
      data:{
        pageNum:this.data.pageNum,
        pageSize:10,
        queryType: this.data.activeTab == 0 ? 1 : 2
      },
      header:{
        token:app.globalData.third_session
      }
    }).then(r1=>{
        wx.hideLoading();
        if(r1.data.code==='200'){
          let list = [];
          if (append) {
            list = this.data.list;
          }
          if (!r1.data.result.list.length) {
            this.setData({
              list: list,
              // loadingMoreHidden: false,
            });
            return
          }
          for (let i = 0; i < r1.data.result.list.length; i++) {
            list.push(r1.data.result.list[i]);
          }
          this.setData({
            list: list,
            // loadingMoreHidden: true,
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
   * 跳转订单详情
   */
  toDetailsTap(e) {
    app.wxp.navigateTo({
      url: '/pages/worker/orderDetail?id=' + e.currentTarget.dataset.id
    })
  },

  /**
   * 内容区域滚动导致 tab 变化时触发事件
   */
  onChange(e) {
    const index = e.detail.index;
    this.setData({
      activeTab: index,
      pageNum: 1
    });
    this.getList(0);
  },

  /**
   * 立即上门
   */
  optFun(e) {
    if (!this.data.isLoading) {
      this.setData({isLoading:true},() => {
        app.wxp.request({
          url: app.globalData.apiPath+'/petfeeder/order/operate',
          method:"POST",
          data:{
            orderCode:e.currentTarget.dataset.id,	
            operateType:'1001'
          },
          header:{
            token:app.globalData.third_session
          }
        }).then(r1=>{  
            if(r1.data.code==='200'){
              const index = this.data.list.findIndex(item => item.orderCode == e.currentTarget.dataset.id);
              const list = JSON.parse(JSON.stringify(this.data.list));
              list[index].serviceNow = 1;
              this.setData({
                isLoading:false,
                list
              });
            }else{
              this.setData({
                isLoading:false
              },() => {
                wx.showToast({
                  title: r1.data.message,
                  icon: 'none',
                  duration: 2000
                })
              });
            }
        })
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.pageNum != 1) {
      const that = this;
      this.setData({
        pageNum: 1
      },() => {
        that.getList(0);
      });
    } else {
      this.getList(0);
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      const data = {selected:0};
      const list = app.globalData.app_role===null?[]:app.globalData.tabBar[app.globalData.app_role];
      if(JSON.stringify(this.getTabBar().data.list)!==JSON.stringify(list)){
        data.list = list;
      }
      this.getTabBar().setData(data);
   }
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
    this.setData({
      pageNum: 1
    },() => {
      this.getList(0);
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageNum: this.data.pageNum + 1
    });
    this.getList(true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})