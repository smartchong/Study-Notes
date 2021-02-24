// pages/owner/confirmOrder.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardTitle:'',
    cardThumb:'',
    cardName:'',
    cardAddr:'',
    cardPrice:'',
    userName:'',
    userMobile:'',
    region:{},
    address:'',
    isShowAddr:false,
    isShowPet:false,
    isAgree:false,
    pets:[],
    petKindDesc:'',
    planServiceDate:'',
    planServiceDateF:'',
    orderRemark:'',
    serviceTimeSort:'',
    serviceTimeSortValue:'',
    isLoading:false,
    showDiaglog:false,
    productCode:null
  },
  lastData:null,
  timeZone:null,
  async getLastData(){
    if(this.lastData !== null){
      return this.lastData;
    }
    const r = await app.wxp.request({
      url: app.globalData.apiPath+'/petOwner/order/getLast',
      header:{
        token:app.globalData.third_session
      }
    })
    if(r.data.code==='200'){
      this.lastData = r.data.result;
    }
    return this.lastData;
  },
  async getTimeZone(){
    if(this.timeZone!==null){
      return this.timeZone;
    }
    const r = await app.wxp.request({
      url: app.globalData.apiPath+'/timeZone/getTimeZone',
      header:{
        token:app.globalData.third_session
      }
    })
    if(r.data.code==='200'){
      this.timeZone = r.data.result;
    }
    //console.log(this.timeZone)
    return this.timeZone;
  },
  goToAddr(){
    const _this = this;
    this.getLastData().then(r=>{
      //console.log(r);
      wx.navigateTo({
        url: '/pages/owner/orderAddr',
        events: {
          acceptDataFromOpenedPage: function(r1) {
            //console.log(111111)
            //console.log(r.data)
            _this.setData({...r1.data,isShowAddr:true});
          }
        },
        success: function(res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', { lastData: r.address })
        }
      })
    })
  },
  editAddr(){
    const _this = this;
    wx.navigateTo({
      url: '/pages/owner/orderAddr',
      events: {
        acceptDataFromOpenedPage: (r) => {
          //console.log(111111)
          //console.log(r.data)
          _this.setData(r.data);
        }
      },
      success: function(res) {
        //console.log(_this.data);
        res.eventChannel.emit('acceptDataFromOpenerPage', { lastData: {
          userMobile: _this.data.userMobile,
          userName: _this.data.userName,
          serviceDetailAddress:_this.data.address,
          parker: _this.data.region
        } })
        wx.setNavigationBarTitle({
          title: '编辑联系信息'
        })
      }
    })
  },
  goToPet(){
    const _this = this;
    Promise.all([this.getLastData(),this.getTimeZone()]).then(([r1,r2])=>{
      //console.log(r1)
      //console.log(r2)
      wx.navigateTo({
        url: '/pages/owner/orderPet',
        events: {
          acceptDataFromPetPage: function(d) {
            //console.log(111111)
            //console.log(d)
            _this.setData({...d.data,isShowPet:true});
          }
        },
        success: function(res) {
          res.eventChannel.emit('acceptDataFromPetPage', { lastData: r1.pets,timeZone:r2,petKindDesc:r1.petKindDesc})
        }
      })
    })
  },
  editPet(){
    const _this = this;
    wx.navigateTo({
      url: '/pages/owner/orderPet',
      events: {
        acceptDataFromPetEditePage: (r) => {
          //console.log(22222)
          //console.log(r)
          _this.setData(r.data);
        }
      },
      success: function(res) {
        res.eventChannel.emit('acceptDataFromPetEditePage', { 
          pets:_this.data.pets,
          petKindDesc:_this.data.petKindDesc,
          planServiceDate:_this.data.planServiceDate,
          orderRemark:_this.data.orderRemark,
          serviceTimeSort:_this.data.serviceTimeSort,
          timeZone:_this.timeZone})
          wx.setNavigationBarTitle({
            title: '编辑服务需求'
          })
      }
    })
  },
  submitOrder(){
    this.setData({isLoading:true},()=>{
      app.wxp.request({
        url: app.globalData.apiPath+'/petOwner/order/createOrder',
        header:{
          token:app.globalData.third_session
        },
        method:"POST",
        data:{
          product:{
            productCode:this.data.productCode,
            productNum:1,
          },
          pets:this.data.pets,
          order:{
            orderRemark:this.data.orderRemark,
            parker:this.data.region,
            petKindDesc:this.data.petKindDesc,
            planServiceDate:this.data.planServiceDate+' 00:00:00',
            serviceDetailAddress:this.data.address,
            serviceTimeSort:this.data.serviceTimeSort,
            userMobile:this.data.userMobile,
            userName:this.data.userName
          }
        }
      }).then(r=>{
        if(r.data.code==="200"){
          this.setData({isLoading:false,showDiaglog:true});
        }else{
          this.setData({isLoading:false},()=>{
            wx.showToast({title: r.data.message,
              icon: 'none',
              duration: 2000
            })
          })
        }
      })
    });
    
  },
  goToOrderList(){
    // let pages = getCurrentPages()
    // console.log(pages)
    // if(pages.find(n=>n.route==="")){

    // }
    this.setData({ showDiaglog: false },()=>{
      wx.switchTab({
        url: '/pages/owner/orderList',
        success: function (e) { 
          var page = getCurrentPages().pop(); 
          if (page == undefined || page == null) return;
          app.wxp.pageScrollTo({scrollTop: 0}).then(()=>{
            page.onPullDownRefresh();
          });
        } 
      })
    });
  },
  goToAgree() {
    wx.navigateTo({
      url: '/pages/user/agreement'
    })
  },
  setAgree(){
    this.setData({ isAgree: !this.data.isAgree})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData.goodsInfo)
    this.setData({
      cardTitle:app.globalData.goodsInfo.title,
      cardThumb:app.globalData.goodsInfo.thumb,
      cardName:app.globalData.goodsInfo.name,
      cardAddr:app.globalData.goodsInfo.addr,
      cardPrice:app.globalData.goodsInfo.price,
      productCode:options.id
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