const service = require('../../../utils/service.js')

// pages/user/writeArticle//writeArticle.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: ''
  },
  onLoad: function(){
    const that = this;
    service.getArticleTypes(that);
  },
  //多选框发生改变的事件
  checkboxChange: function (e) {
  },
  formSubmit: function(){
  }
})