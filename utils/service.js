const util = require('/util.js'); //调用公共方法
const WxParse = require('../pages/wxParse/wxParse.js');

const url = 'https://admin.anyfuns.cn'; //域名
const getArticleUrl = url +'/api/blogs/search'; //得到文章
const getHotArticleUrl = url + '/api/blogs/rank_list'; //得到热门文章
const hotSearchUrl = url + '/api/blogs/hot_keywords'; //根据搜索条件得到文章
const specificArticleUrl = url + '/api/blogs/info'; //得到具体文章信息
const getArticleTypesUrl = url + '/api/blogs/article_types'; //得到文章类别

//获取第n页共m条的文章
const getArticle = function(that,n,m,keyword,modle){
  var articles;
  wx.request({
    url: getArticleUrl, //仅为示例，并非真实的接口地址
    data: {
      page: n,
      size: m,
      keyword: keyword
    },
    header: {
      'content-type': 'application/json',
      'dataType': 'json',
      'method': 'get'
    },
    success: function (res) {
      articles = res.data.articles
      articles.forEach((item) => {
        item.user_picture_url = 'https://admin.anyfuns.cn' + item.user_picture_url
      })
      that.setData({
        article: articles
      })
      if(modle){
        wx.hideLoading()
      }
    }
  }) 
}

//得到热门文章
const getHotArticle = function (that) {
  var hotArticles;
  wx.request({
    url: getHotArticleUrl, //仅为示例，并非真实的接口地址
    header: {
      'content-type': 'application/json',
      'dataType': 'json',
      'method': 'get'
    },
    success: function (res) {
      hotArticles = res.data
      that.setData({
        hotArticle: hotArticles
      })
    }
  })
}

//上拉刷新
const upRefresh = function (that, n, m, keyword){
  wx.showNavigationBarLoading()
  var articles;
  wx.request({
    url: getArticleUrl, //仅为示例，并非真实的接口地址
    data: {
      page: n,
      size: m,
      keyword: keyword
    },
    header: {
      'content-type': 'application/json',
      'dataType': 'json',
      'method': 'get'
    },
    success: function (res) {
      articles = res.data.articles
      articles.forEach((item) => {
        item.user_picture_url = 'https://admin.anyfuns.cn' + item.user_picture_url
      })
      that.setData({
        article: articles
      })
    },
    complete: function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
  }) 
}


//下拉加载刷新
const downRefresh = function (that, n, m, keyword) {
  wx.showNavigationBarLoading()
  var articles;
  wx.request({
    url: getArticleUrl, //仅为示例，并非真实的接口地址
    data: {
      page: n,
      size: m,
      keyword: keyword
    },
    header: {
      'content-type': 'application/json',
      'dataType': 'json',
      'method': 'get'
    },
    success: function (res) {
      articles = res.data.articles
      if(articles.length > 0){
        articles.forEach((item) => {
          item.user_picture_url = 'https://admin.anyfuns.cn' + item.user_picture_url
        })
        //合并数组
        const newArticles = that.data.article.concat(articles);
        that.setData({
          article: newArticles
        })
        wx.showToast({
          title: '操作成功',
          icon: 'success',
          duration: 1000
        });
      }else{
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none',
          duration: 1000
        });
      }
    },
    complete: function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
  })
}

//热门搜索
const hotSearch = function (that) {
  let hotSearches;
  wx.request({
    url: hotSearchUrl, 
    header: {
      'content-type': 'application/json',
      'dataType': 'json',
      'method': 'get'
    },
    success: function (res) {
      hotSearches = res.data.hot_keywords
      that.setData({
        hotSearches: hotSearches
      })
    }
  })
}

//根据搜索条件搜索文章
const searchArticle = function (that, n, m, keyword) {
  that.setData({
    search: keyword,
    searching: true
  })
  var articles;
  wx.request({
    url: getArticleUrl, //仅为示例，并非真实的接口地址
    data: {
      page: n,
      size: m,
      keyword: keyword
    },
    header: {
      'content-type': 'application/json',
      'dataType': 'json',
      'method': 'get'
    },
    success: function (res) {
      articles = res.data.articles
      articles.forEach((item) => {
        item.user_picture_url = 'https://admin.anyfuns.cn' + item.user_picture_url
      })
      that.setData({
        article: articles,
        searching: false
      })
    }
  })
}


//根据id得到文章具体信息
const specificArticle = function(that,id){
  wx.request({
    url: specificArticleUrl, //仅为示例，并非真实的接口地址
    data: {
      id: id
    },
    header: {
      'content-type': 'application/json',
      'dataType': 'json',
      'method': 'get'
    },
    success: function (res) {
      WxParse.wxParse('article', 'html', res.data.article.content, that, 5);
      res.data.article.user_picture_url = 'https://admin.anyfuns.cn' + res.data.article.user_picture_url;
      that.setData({
        blog: res.data.article
      });
    }
  })
}

//查找文章类别
const getArticleTypes = function (that) {
  wx.request({
    url: getArticleTypesUrl, //仅为示例，并非真实的接口地址
    header: {
      'content-type': 'application/json',
      'dataType': 'json',
      'method': 'get'
    },
    success: function (res) {
      res.data.article_types[0].push(true)
      that.setData({
        items: res.data.article_types
      });
    }
  })
}




module.exports = {
  getArticle: getArticle,
  getHotArticle: getHotArticle,
  upRefresh: upRefresh,
  downRefresh: downRefresh,
  hotSearch: hotSearch,
  searchArticle: searchArticle,
  specificArticle: specificArticle,
  getArticleTypes: getArticleTypes
}