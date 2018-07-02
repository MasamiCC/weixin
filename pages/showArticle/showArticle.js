const service = require('../../utils/service.js')
// pages/showArticle/showArticle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blog: {}//blog信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function(){
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
      }
    })
    const that = this;
    service.specificArticle(that,options.id)
  }

})