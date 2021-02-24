// pages/owner/orderPet.js
const M = require('../../utils/moment');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate:M().add(1, 'days').format('YYYY-MM-DD'),
    endDate:M().add(90, 'days').format('YYYY-MM-DD'),
    cat:0,
    dog:0,
    formData:{
      planServiceDate:M().add(1, 'days').format('YYYY-MM-DD'),
      orderRemark:'',
      serviceTimeSort:'',
      petKindDesc:'',
    },
    postData:{
      pets:[],
      planServiceDate:M().add(1, 'days').format('YYYY-MM-DD'),
      orderRemark:'',
      serviceTimeSort:'',
      petKindDesc:'',
      planServiceDateF:M().add(1, 'days').format('YYYY-MM-DD').replace(/(.+?)\-(.+?)\-(.+)/,"$1年$2月$3日"),
      serviceTimeSortValue:''
    },
    rules: [{
      name: 'petKindDesc',
      rules: [{required: true, message: '请输入宠物品种'}],
  },{
      name: 'planServiceDate',
      rules: [{required: true, message: '请选择期望服务日期及时间段'}],
  },{
    name: 'serviceTimeSort',
    rules: [{required: true, message: '请选择期望服务日期及时间段'}],
}],
    timeZone:[]
  },
  formType:null,
  bindDateChange(e){
    //console.log(e.detail.value.replace(/(.+?)\-(.+?)\-(.+)/,"$1年$2月$3日"))
    this.setData({
      [`postData.planServiceDate`]: e.detail.value,
      ['formData.planServiceDate']: e.detail.value,
      [`postData.planServiceDateF`]: e.detail.value.replace(/(.+?)\-(.+?)\-(.+)/,"$1年$2月$3日")
    })
  },
  radioChange(e){
    console.log(e.detail.value)
    console.log(this.data.timeZone)
    const serviceTimeSortValue = this.data.timeZone.find(n=>n.timeCode===e.detail.value*1).timeZone;
    this.setData({
        [`formData.serviceTimeSort`]: e.detail.value,
        [`postData.serviceTimeSort`]: e.detail.value*1,
        [`postData.serviceTimeSortValue`]:serviceTimeSortValue
    })
  },
  formInputChange(e){
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value,
        [`postData.${field}`]: e.detail.value
    })
  },
  onChangeCat(e){
    //console.log(e.detail)
    this.setData({
      cat: e.detail,
      [`postData.pets`]: this.data.postData.pets.map(n=>(n.petType===1?{petType:1,petNum:e.detail}:n))
    })
  },
  onChangeDog(e){
    this.setData({
      dog: e.detail,
      [`postData.pets`]: this.data.postData.pets.map(n=>(n.petType===2?{petType:2,petNum:e.detail}:n))
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromPetPage', (r) => {
      this.setData({
        timeZone:r.timeZone,
        cat:r.lastData.find(n=>n.petType===1).petNum,
        dog:r.lastData.find(n=>n.petType===2).petNum,
        ['postData.pets']:r.lastData,
        ['postData.petKindDesc']:r.petKindDesc,
        ['formData.petKindDesc']:r.petKindDesc
      })
      this.formType = 1;
    })
    eventChannel.on('acceptDataFromPetEditePage', (r) => {
      let timeZone =r.timeZone;
      let index = timeZone.findIndex(n=>n.timeCode==r.serviceTimeSort);
      timeZone[index].checked = 'true';
      //console.log(index);
      //console.log(timeZone);
      this.setData({
        timeZone:timeZone,
        cat:r.pets.find(n=>n.petType===1).petNum,
        dog:r.pets.find(n=>n.petType===2).petNum,
        ['formData.petKindDesc']:r.petKindDesc,
        ['formData.planServiceDate']:r.planServiceDate,
        ['formData.orderRemark']:r.orderRemark,
        ['formData.serviceTimeSort']:r.serviceTimeSort,
        ['postData.pets']:r.pets,
        ['postData.petKindDesc']:r.petKindDesc,
        ['postData.planServiceDate']:r.planServiceDate,
        ['postData.orderRemark']:r.orderRemark,
        ['postData.serviceTimeSort']:r.serviceTimeSort
      })
      this.formType = 2;
    })
  },
  submitForm(){
    const eventChannel = this.getOpenerEventChannel();
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
              wx.showToast({
                title: errors[firstError[0]].message,
                icon: 'none',
                duration: 2000
              })
          }
      } else if(this.data.cat == 0 && this.data.dog == 0){
        wx.showToast({
          title: '请输入宠物数量',
          icon: 'none',
          duration: 2000
        })
      } else {
        //console.log(this.data.postData)
        if(this.formType === 1){
          eventChannel.emit('acceptDataFromPetPage',{data: this.data.postData});
        }else{
          eventChannel.emit('acceptDataFromPetEditePage',{data: this.data.postData});
        }
        wx.navigateBack({delta: 1});
      }
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