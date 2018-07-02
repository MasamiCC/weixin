// pages/user/user.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    const that = this;
    util.setUserInfo(that);
  },
  //跳转到登录页面
  login: function(){
    wx.navigateTo({
      url: "../login/login"
    }) 
  },
  //跳转到新写文章页面
  writeArticle: function(){
    wx.navigateTo({
      url: "../writeArticle/writeArticle"
    }) 
  }
})