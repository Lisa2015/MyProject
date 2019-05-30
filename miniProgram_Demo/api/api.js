const Config = require('../utils/config.js')
// 接口列表
export default { 
}
//将json转换为url
function parseParams(data) {
  try {
    var tempArr = []
    for (var i in data) {
      var key = encodeURIComponent(i)
      var value = encodeURIComponent(data[i])
      tempArr.push(key + '=' + value)
    }
    var urlParamsStr = tempArr.join('&')
    return urlParamsStr
  } catch (err) {
    return ''
  }
}

// 请求接口
function request(url, data = {}, params = {}, method, version = Config.API_VERSION) {
  if (params.noUserId === undefined || !params.noUserId) {
    if (params.userId === undefined || params.userId === null) {
      if (wx.getStorageSync('userId')) {
        params.userId = wx.getStorageSync('userId') || ''
      }
    }
  }
  delete params.noUserId
  if (Object.keys(params).length !== 0) {
    url += "?" + parseParams(params)
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: Config.API_URL + version + url,
      method: method,
      // header: {
      //     'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded'
      // },
      header: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      data: data,
      success: function (res) {
        if (res.data.code && res.data.status === 404) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
          resolve({
            resultCode: '009900',
            resultMsg: res.data.resultMsg,
            pageReturn: null
          })
          return
        }
        if (res.data.code !== undefined && res.data.code !== '') {
          resolve({
            resultCode: '009900',
            resultMsg: res.data.msg
          })
          return
        }
        // console.log('res.data>>', res.data)
        resolve(res.data)
      },
      fail: function (err) {
        resolve({
          resultCode: '009900',
          resultMsg: '系统出现错误',
          pageReturn: null
        })
      }
    })
  })
}
