const app = getApp();
const {
  $Message
} = require('../plugin/index.js');
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    datas:[]
  },
  onShow() {
  
  },
  onShareAppMessage() {
    return {
      title: '东篱里花艺礼品',
      path: '/pages/home/index'
    }
  },
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    wx.cloud.callFunction({
      name: 'getFlower',
      success: (res) => {
        if (res.errMsg === 'cloud.callFunction:ok' && res.result.errMsg === 'collection.get:ok') {
          this.setData({
            datas:res.result.data
          })
        } else {
          $Message({
            content: '报错报错',
            type: 'error'
          })
        }
      }
    })
  },opendetails(e){
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../details/index?id='+e.currentTarget.dataset.id,
    })
  }
})