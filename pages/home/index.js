const app = getApp();
const {
  $Message
} = require('../plugin/index.js');
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    swiperList: ['/images/h1.jpg','/images/h2.jpg','/images/h8.jpg','/images/h9.jpg'],
    datas:[]
  },
  onShow() {
  
  },
  
  previewImage() {
    wx.previewImage({
      current: '/images/dg.jpg',
      urls: ['/images/dg.jpg'] // 需要预览的图片http链接列表   
    })
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
  },onReachBottom: function () {
    console.log('加载更多');
    
  },onPullDownRefresh: function () {
    console.log('下拉操作');
    
  },
})