const app = getApp();
const {
  $Message
} = require('../plugin/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    imgList: [],
    ftypes:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.callFunction({
    //   name: 'getCategory',
    //   success: (res) => {
    //     if (res.errMsg === 'cloud.callFunction:ok' && res.result.errMsg === 'collection.get:ok') {
    //      this.setData({
    //       ftypes:res.result.data
    //      })
    //     } else {
    //       $Message({
    //         content: '报错报错',
    //         type: 'error'
    //       })
    //     }
    //   }
    // })
  },PickerChange(e) {
    this.setData({
      index: e.detail.value
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        console.log(res.tempFilePaths);
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  confirm(e) {
    console.log(e.detail.value);
    var p = e.detail.value;
    if (!p.name) {
      $Message({
        content: '请输入花束描述',
        type: 'error'
      })
    } else if (this.data.imgList.length == 0) {
      $Message({
        content: '请选择图片',
        type: 'error'
      })
    } else if (!p.price) {
      $Message({
        content: '请输入价格',
        type: 'error'
      })
    } else {
      wx.showLoading({
        title: '正在保存',
      })
      let cloudImgs = []
      //先上传图片文件，拿到fileID数组
      var promiseArr = []
      this.data.imgList.forEach(function (item, index) {
        //定义Promise并丢进promiseArr数组
        var promise = new Promise((resolve, reject) => {
          //上传文件
          wx.getImageInfo({
            src: item,
            success: function (res) {
              wx.cloud.uploadFile({
                cloudPath: new Date().getTime() + "." + res.type,
                filePath: item, // 文件路径
                success: function (res) {
                  if (res.errMsg === 'cloud.uploadFile:ok') {
                    cloudImgs.push(res.fileID)
                    resolve(res.fileID)
                  }
                },
                fail: err => {
                  wx.hideLoading()
                }
              })
            }
          })
        })
        promiseArr.push(promise)
      }) //循环结束
      Promise.all(promiseArr).then(res => {
        p.createdata = new Date().getTime(); //上架时间
        p.live = 0; //点赞数量
        p.imgs = cloudImgs;
        wx.cloud.callFunction({
          name: 'addFlower',
          data: p,
          success: function (res) {
            wx.hideLoading();
            if (res.errMsg === 'cloud.callFunction:ok' && res.result.errMsg === 'collection.add:ok') {
              $Message({
                content: '保存成功',
                type: 'success'
              })
            } else {
              $Message({
                content: '保存报错',
                type: 'error'
              })
            }
          }
        })
      })
    }
  },
})