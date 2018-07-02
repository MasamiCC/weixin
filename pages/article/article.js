// pages/article/article.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //用户头像地址
    imageSrc: {
      type: String,
      value: ''
    },
    //用户名
    name: {
      type: String,
      value: ''
    },
    //发布时间
    time: {
      type: String,
      value: ''
    },
    //文章标题
    title: {
      type: String,
      value: ''
    },
    //文章内容
    content: {
      type: String,
      value: ''
    },
    //阅读
    reading: {
      type: String,
      value: ''      
    },
    //评论
    comment: {
      type: String,
      value: ''
    },
    //喜欢
    like: {
      type: String,
      value: ''
    }    
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
