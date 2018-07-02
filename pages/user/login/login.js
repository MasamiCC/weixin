const app = getApp()

// pages/user/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  //获取信息成功
  getUserInfo: function (e) {
    wx.login();
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userInfo = res.userInfo;
              wx.reLaunch({
                url: '../user_index/user_index'
              })
              wx.showToast({
                title: '登陆成功',
                icon: 'success',
                duration: 1000
              });
            }
          })
        }
      }
    })
  }
})