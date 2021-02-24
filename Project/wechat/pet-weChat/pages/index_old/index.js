// //index.js
// //获取应用实例
// const app = getApp()

// Page({
//   data: {
//     hasUserInfo:false,
//     userInfo:null,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   goToRole: function() {
//     wx.redirectTo({
//       url: '/pages/role/role',
//     })
//   },
//   onLoad: function () {
//     //console.log(222222222)
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse) {
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     }
//   },
//   getUserInfo:function(e){
//     //console.log(e.detail.userInfo);
//     app.globalData.userInfo = e.detail.userInfo;
//     if(e.detail.errMsg.indexOf('ok')>-1){
//       wx.redirectTo({
//         url: '/pages/role/role',
//       });
//     }
//   }
// })
