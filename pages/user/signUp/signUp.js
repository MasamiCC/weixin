//获取应用实例
const check = require('../../../utils/check.js')

// pages/user/signUp/signUp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "step": 1, //第几步
    "phoneNum": '', //手机号
    "identifyCode": 111 //验证码
  },
  //获取用户输入的手机号
  userPhoneNumInput: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  //第一步被点击
  next_1: function(){
    const phoneNum = this.data.phoneNum;
    const flag = check.checkPhoneNum(phoneNum);
    if(flag){
      wx.showToast({
        title: '下一步',
        icon: 'loading',
        duration: 1000
      })
      this.setData({
        phoneNum: phoneNum,
        step: 2
      })
    }else {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      this.setData({
        phoneNum: ''
      })
    }
  },
  //第二步
  next_2: function(){
    
  }
})