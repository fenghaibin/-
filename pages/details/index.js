const {
  $Message
} = require('../plugin/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getFlowerById',
      data:{
        id:options.id
      },
      success: (res) => {
        wx.hideLoading()
        if (res.errMsg === 'cloud.callFunction:ok' && res.result.errMsg === 'collection.get:ok') {
          this.setData(res.result.data[0])
        }
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

  },liveFlower(){
    wx.cloud.callFunction({
      name: 'updateLiveNum',
      data:{
        id:this.data._id,
        livenum:this.data.live+1
      },
      success: (res) => {
        console.log(res,'点赞返回结果');
        if (res.errMsg === 'cloud.callFunction:ok' && res.result.errMsg === 'document.update:ok') {
          $Message({
            content: '点赞成功',
            type: 'success'
          })
        }
      }
    })
  },
  onShareAppMessage() {
    return {
      title: '东篱里花艺礼品',
      path: '/pages/details/index'
    }
  }
})