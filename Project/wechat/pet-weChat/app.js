//app.js
//import { promisifyAll } from './miniprogram_npm/miniprogram-api-promise/index';
import { promisifyAll} from 'miniprogram-api-promise';
const wxp = {}
promisifyAll(wx, wxp);
App({
  onLaunch: function () {
    //console.log(wxp.getSetting())
    wxp.getSetting().then((res)=>{
      //console.log(1111111)
      if (res.authSetting['scope.userInfo']) {
        wxp.getUserInfo().then((r)=>{
          this.globalData.userInfo = r.userInfo;
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(r)
          }
          try{
            const role = wxp.getStorageSync('app_role');
            const session = wxp.getStorageSync('third_session');
            if(role && session && ((role==1&&session.indexOf('petowner')>-1)||(role==1&&session.indexOf('petfeeder')>-1))){
              this.globalData.app_role = role;
              this.globalData.third_session = session;
              wxp.request({
                url: role==2?this.globalData.apiPath+'/petfeeder/login/isLogin':this.globalData.apiPath+'/petowner/login/isLogin',
                header:{
                  token:session
                }}).then(r1=>{
                  if(r1.data.code==='200'){
                    wx.switchTab({
                      url: role==2?'/pages/worker/orderList':'/pages/owner/goodsList',
                    })
                  }
                })
            }
          }catch(e){} 
        })
      }
    })
  },
  globalData: {
    apiPath:'https://center.komect.com/pfapi',
    //apiPath:'http://172.28.65.33/pfapi',
    userInfo: null,
    userAuthList:[],
    app_role:null,
    third_session:null,
    goodsInfo:'',
    tabBar:[
      [],
      [
        {
          pagePath: "/pages/owner/goodsList",
          iconPath: "/images/tabBar-goods.png",
          selectedIconPath: "/images/tabBar-goods-active.png",
          text: "服务"
        }, {
          pagePath: "/pages/owner/orderList",
          iconPath: "/images/tabBar-order.png",
          selectedIconPath: "/images/tabBar-order-active.png",
          text: "订单"
        }, {
          pagePath: "/pages/user/info",
          iconPath: "/images/tabBar-user.png",
          selectedIconPath: "/images/tabBar-user-active.png",
          text: "我的"
        }
      ],
      [
        {
          pagePath: "/pages/worker/orderList",
          iconPath: "/images/tabBar-order.png",
          selectedIconPath: "/images/tabBar-order-active.png",
          text: "订单"
        }, {
          pagePath: "/pages/worker/curOrder",
          iconPath: "/images/tabBar-goods.png",
          selectedIconPath: "/images/tabBar-goods-active.png",
          text: "当前服务订单"
        }, {
          pagePath: "/pages/user/info",
          iconPath: "/images/tabBar-user.png",
          selectedIconPath: "/images/tabBar-user-active.png",
          text: "我的"
        }
      ]
    ],
    liveContext: null
  },
  wxp:wxp
})