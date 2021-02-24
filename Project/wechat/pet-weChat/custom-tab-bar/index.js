const app =getApp();
Component({
  data: {
    selected: 0,
    color: "#666666",
    selectedColor: "#ff7043",
    list: []
  },
  lifetimes: {
    //组件的生命周期函数
    attached() {
      const list = app.globalData.app_role===null?[]:app.globalData.tabBar[app.globalData.app_role];
      const _old = JSON.stringify(this.data.list);
      if(_old !== JSON.stringify(list)){
        this.setData({
          list: list
        })
      }
    },
   },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      const pages = getCurrentPages();// 获取页面栈
      const current= pages[pages.length - 1]; 
      console.log(current.route);
      console.log(url)
      if(url.slice(1) === current.route){
        //console.log(11111)
        app.wxp.pageScrollTo({scrollTop: 0}).then(()=>{
          current.onPullDownRefresh();
        })
      }else{
        wx.switchTab({url})
        this.setData({
          selected: data.index
        })
      }
    }
  }
})