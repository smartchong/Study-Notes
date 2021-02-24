// pages/owner/orderList.js
const app =getApp();
const createRecycleContext = require('miniprogram-recycle-view');

Page({

  /**
   * 页面的初始数据
   */
  totalPage:1,
  nextPage:1,
  ctx1:null,
  isLoading:false,
  data: {
    third_session:'',
    noData:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  // onPageScroll:function(e){
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.init();
    if(app.globalData.third_session){
      this.setData({third_session:app.globalData.third_session});
    }
    this.getNextData();
  },
  init(){
    let pages = getCurrentPages();// 获取页面栈
    let current= pages[pages.length - 1]; 
    this.ctx1 = createRecycleContext({
      id: 'recycleIdOrderList',
      dataKey: 'recycleList',
      page: this,
      itemSize: this.itemSizeFunc,
      useInPage:true,
      root:current
    });
  },
  itemSizeFunc: function (item, idx) {
    return {
        width: this.ctx1.transformRpx(750),
        height: 144
    }
  },

  getNextData(e){
    //console.log(22222)
    if(this.totalPage >= this.nextPage && !this.isLoading){
      this.isLoading = true;
      wx.showLoading();
      app.wxp.request({
        url: app.globalData.apiPath+'/petOwner/order/ownerList',
        method:"POST",
        data:{
          pageNum:this.nextPage,
          pageSize:10
        },
        header:{
          token:app.globalData.third_session
        }
      }).then(r1=>{
        wx.hideLoading();
        this.isLoading = false;
        if(r1.data.code==='200'){
          const list = JSON.parse(JSON.stringify(r1.data.result.list));
          if(list.length!==0){
            //console.log(list)
            this.ctx1.append(list);
            this.nextPage = this.nextPage + 1;
            this.totalPage = r1.data.result.totalPage;
          }
        }else{
          // wx.showToast({title: r1.data.message,
          //   icon: 'none',
          //   duration: 2000
          // })
          this.setData({noData:true});
        }
      })
    }
  },

  /**
   * 跳转订单详情
   */
  toDetailsTap(e) {
    app.wxp.navigateTo({
      url: '/pages/owner/orderDetail?id=' + e.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //console.log(this.data.third_session);
    //console.log(app.globalData.third_session);
    if(!app.globalData.third_session){
      this.setData({noData:true});
    }else if(app.globalData.third_session && !this.ctx1){
      //console.log(333333);
      this.setData({noData:false,third_session:app.globalData.third_session},()=>{
        //console.log(222222);
        this.init();
        this.getNextData();
        //this.setData({third_session:app.globalData.third_session});
      })
    }else{
      this.setData({noData:false});
      //console.log(44444);
      this.getNextData();
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      const data = {selected:1};
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
    //console.log(111111)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //console.log(111111)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if(!this.isLoading){
      this.isLoading = true;
      app.wxp.startPullDownRefresh().then(()=>{
        app.wxp.request({
          url: app.globalData.apiPath+'/petOwner/order/ownerList',
          method:"POST",
          data:{
            pageNum:1,
            pageSize:10
          },
          header:{
            token:app.globalData.third_session
          }
        }).then(r1=>{
          wx.stopPullDownRefresh();
          this.isLoading = false;
          this.nextPage = 1;
          if(r1.data.code==='200'){
            const list = JSON.parse(JSON.stringify(r1.data.result.list));
            if(list.length!==0){
              this.nextPage = this.nextPage + 1;
              this.totalPage = r1.data.result.totalPage;
              this.ctx1.splice(0,this.totalPage*10,list);
            }
          }else{
            wx.showToast({title: r1.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        })
      })
    }
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