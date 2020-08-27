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
  confirm(e) {
    console.log(e.detail.value);
    var p = e.detail.value;
    if (p.name) {
      wx.cloud.callFunction({
        name: 'addCategory',
        data: p,
        success: function (res) {        
          if (res.errMsg==='cloud.callFunction:ok' && res.result.errMsg==='collection.add:ok') {
            $Message({
              content:'分类保存成功',
              type:'success'
            })
          }else{
            $Message({
              content:'分类报错报错',
              type:'error'
            })
          }
        }
      })
    } else {
      $Message({
        content:'请输入分类名称',
        type:'error'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})