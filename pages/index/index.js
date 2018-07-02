//index.js
//获取应用实例
const app = getApp()
const service = require('../../utils/service.js')
const util = require('../../utils/util.js')

Page({
  /**
 * 页面的初始数据
 */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    winHeight: "",//窗口高度
    article: {}, //文章列表
    hotArticle: {}, //热门文章列表
    searchWord: '',//搜索的名词
    pageIndex: 1, //显示的页数
    currentTab: 0 //预设当前项的值
  },
  onLoad: function(){
    const that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    util.setUserInfo(that);
    const keyWord = that.data.searchWord;
    service.getArticle(that,1, 10, keyWord,true); //得到文章列表
    service.getHotArticle(that);
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  //跳转到搜索页面
  linkSearch: function(){
    wx.navigateTo({
      url: "../search/search"
    }) 
  },
  //跳转到具体文章页面
  showArticle: function (e) {
    wx.navigateTo({
      url: "../showArticle/showArticle?id=" + e.currentTarget.dataset.text
    })
  },
  //搜索表单提交
  search: function (e) {
    const that = this
    service.getArticle(that, that.data.pageIndex, 10, e.detail.value) 
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    const that = this;
    that.data.pageIndex = 1;
    service.upRefresh(that,that.data.pageIndex, 10, that.data.searchWord) 
    wx.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 2000
    })
  },
  /**
 * 页面相关事件处理函数--监听用户上拉加载
 */
  onReachBottom: function () {
    const that = this;
    that.data.pageIndex++;
    service.downRefresh(that, that.data.pageIndex, 10, that.data.searchWord);

  }
})
