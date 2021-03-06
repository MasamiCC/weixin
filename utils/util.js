const app = getApp()

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//合并json
const mergeJson = function (jsonbject1, jsonbject2) {
  var resultJsonObject = {};
  for (let attr in jsonbject1) {
    resultJsonObject[attr] = jsonbject1[attr];
  }
  for (let attr in jsonbject2) {
    resultJsonObject[attr] = jsonbject2[attr];
  }
  return resultJsonObject;
};

//设置userInfo
const setUserInfo = function(that){
  if (app.globalData.userInfo) {
    that.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  } else if (that.data.canIUse) {
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回  
    // 所以此处加入 callback 以防止这种情况 
    app.userInfoReadyCallback = res => {
      that.setData({
        userInfo: res.userInfo,
        hasUserInfo: true
      })
    }
  } else {
    // 在没有 open-type=getUserInfo 版本的兼容处理  
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  }  
}

module.exports = {
  formatTime: formatTime,
  mergeJson: mergeJson,
  setUserInfo: setUserInfo
}
