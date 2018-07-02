
//获取应用实例
const service = require('../../utils/service.js')

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searching: false, //搜索中。。。
    search: '',//搜索内容
    article: {}, //文章内容
    historySearches: [],//历史记录
    hotSearches: {} //热门搜索 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getStorage({
      key: "historySearches",
      success: function (res) {
        that.setData({
          historySearches: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    service.hotSearch(that); 
  },
  //跳转到具体文章页面
  showArticle: function (e) {
    wx.navigateTo({
      url: "../showArticle/showArticle?id=" + e.currentTarget.dataset.text
    })
  },
  /*点击热门搜索*/
  search: function(e){
    const search = e.currentTarget.dataset.text;
    const that = this;
    service.searchArticle(that, 1, 10, search);
  },

  /*输入框值改变*/
  bindKeyInput: function(e){
    const that = this;
    service.searchArticle(that, 1, 10, e.detail.value);
  },

  /*输入框点完成按钮，增加搜索历史*/
  bindconfirmInput: function(e){
    this.data.historySearches.push(e.detail.value);
    let newHistorySearches = [...new Set(this.data.historySearches)];
    wx.setStorage({
      key: "historySearches",
      data: newHistorySearches
    })
    this.setData({
      historySearches: newHistorySearches
    })
  }


})