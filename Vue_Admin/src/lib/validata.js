/*
 * @Author: ShayLiu
 * @Date: 2018-07-30 15:03:54
 * @LastEditors: ShayLiu
 * @LastEditTime: 2018-08-20 16:06:24
 * @Description: ''
 */

/**
 * 判断字符串是否为空
 */
export const isNullOrEmpty = (val) => {
  if (val === '' || val === 0 || val === null || typeof (val) === 'undefined') {
    return true
  } else {
    if (typeof (val) === 'object' && (Object.keys(val).length === 0)) {
      return true
    }
    return false
  }
}
// 去除数组空值
export const ClearNullArr = (arr) => {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (!arr[i] || arr[i] === '' || arr[i] === undefined) {
      arr.splice(i, 1)
      len--
      i--
    }
  }
  return arr
}
// 去除对象空值
export const checkObj = (obj) => {
  if (!(typeof obj === 'object')) {
    return
  };
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && (obj[key] == null || obj[key] === undefined || obj[key] === '')) {
      delete obj[key]
    }
  }
  return obj
}
export const oneDay = () => {
  return 1000 * 60 * 60 * 24
}
/**
 * 判断是否为合法手机号码
 */
export const isPhone = (val) => {
  // console.log(val)
  let mobileCheck = /^1[2|3|4|5|6|7|8|9]\d{9}$/
  return mobileCheck.test(val)
}

/**
 * JS-MD5加密用户密码
 */
export const encryptedPassword = (pwd) => {
  let md5 = require('js-md5')
  let pwdkey = md5(pwd)
  return pwdkey
}
