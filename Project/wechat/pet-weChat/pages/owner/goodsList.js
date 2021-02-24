// pages/owner/goodsList.js
const app =getApp();
const createRecycleContext = require('miniprogram-recycle-view');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noData:false
  },
  totalPage:1,
  nextPage:1,
  ctx:null,
  isLoading:false,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goToDetails(e){
    //console.log(e)
    wx.navigateTo({
      url: "/pages/owner/goodsDetail?id="+e.currentTarget.dataset.code,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let pages = getCurrentPages();// 获取页面栈
    let current= pages[pages.length - 1]; 
    //console.log(current)
    this.ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: this.itemSizeFunc,
      useInPage:true,
      root:current
    });
    this.getNextData();
  },
  itemSizeFunc: function (item, idx) {
      //console.log(this.ctx.transformRpx(246));
      return {
          width: this.ctx.transformRpx(750),
          height: 134
      }
  },
  getNextData(e){
    if(this.totalPage >= this.nextPage && !this.isLoading){
      this.isLoading = true;
      wx.showLoading();
      app.wxp.request({
        url: app.globalData.apiPath+'/product/getProductList',
        method:"GET",
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
            let list = [];
            list = r1.data.result.list.map(n=>(
              {
                id:n.pfProductInfoDO.productCode,
                thumb:n.pfProductInfoDO.thumbnailUrl,
                title:n.pfProductInfoDO.productName,
                price:n.pfProductInfoDO.productPrice,
                merchantName:n.pfMerchantInfoDO.merchantName,
                merchantAddr:n.pfMerchantInfoDO.merchantAddr
              }
            ));
            if(list.length===0){
              this.setData({noData:true});
            }else{
              this.ctx.append(list);
              this.nextPage = this.nextPage + 1;
              this.totalPage = r1.data.result.totalPage;
            }
          }else{
            wx.showToast({title: r1.data.message,
              icon: 'none',
              duration: 2000
            })
          }
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
  onPageScroll:function(e){
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //console.log(222222222)
    if(!this.isLoading){
      this.isLoading = true;
      app.wxp.startPullDownRefresh().then(()=>{
        app.wxp.request({
          url: app.globalData.apiPath+'/product/getProductList',
          method:"GET",
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
              let list = [];
              list = r1.data.result.list.map(n=>(
                {
                  id:n.pfProductInfoDO.productCode,
                  thumb:n.pfProductInfoDO.thumbnailUrl,
                  title:n.pfProductInfoDO.productName,
                  price:n.pfProductInfoDO.productPrice,
                  merchantName:n.pfMerchantInfoDO.merchantName,
                  merchantAddr:n.pfMerchantInfoDO.merchantAddr
                }
              ));
              if(list.length===0){
                this.setData({noData:true});
              }else{
                this.nextPage = this.nextPage + 1;
                this.totalPage = r1.data.result.totalPage;
                this.ctx.splice(0,this.totalPage*10,list);
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