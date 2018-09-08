/*
 * @Author: ShayLiu
 * @Date: 2018-08-06 11:02:48
 * @LastEditors: ShayLiu
 * @LastEditTime: 2018-08-24 16:02:55
 * @Description: ''
 */

import axios from 'axios'
axios.defaults.baseURL = ''  // 后端服务器地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const request = (config) => {
  return axios(config)
}

// axios拦截异常状态
axios.interceptors.request.use(config => {
  return config
}, err => {
  alert('请求超时!')
  return Promise.resolve(err)
})
axios.interceptors.response.use(data => {
  if (data.status && data.status === 200 && data.data.status === 'error') {
    alert(data.data.message)
    return
  }
  return data
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    alert('网络错误!')
  } else if (err.response.status === 403) {
    alert('未授权,请联系管理员!')
  } else {
    alert('未知错误!')
  }
  return Promise.resolve(err)
})

// *** 用户登录 ***
export const userLoginApi = (data) => {
  return request({
    method: 'post',
    url: '/sys/login',
    params: data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}
// *** 退出登录 ***
export const logout = () => {
  return request({
    method: 'post',
    url: '/sys/logout'
  })
}

// *** 用户注册 ***
export const register = (data) => {
  return request({
    method: 'post',
    url: '/sysUser/register',
    params: data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}
// *** 获取所有的角色 ***
export const getAllSysRole = () => {
  return request({
    method: 'get',
    url: '/sysRole/getAllSysRole'
  })
}

// *** 获取所有系统用户 ***
export const findAllSysUser = (data) => {
  return request({
    method: 'get',
    params: data,
    url: '/sysUser/findAllSysUser'
  })
}

// *** 获取用户的角色 ***
export const getSysRoleByUserId = (data) => {
  return request({
    method: 'get',
    params: data,
    url: '/sysRole/getSysRoleByUserId'
  })
}

// *** 改变用户状态 ***
export const changeSysUserState = (data) => {
  return request({
    method: 'post',
    params: data,
    url: '/sysUser/changeSysUserState',
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// *** 修改用户信息 ***
export const changeSysUserInfo = (data) => {
  return request({
    method: 'post',
    params: data,
    url: '/sysUser/changeSysUserInfo',
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// *** 增加系统用户角色 ***
export const setSysUserRole = (data) => {
  return request({
    method: 'post',
    params: data,
    url: '/sysRole/setSysUserRole',
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// *** 移除系统用户角色 ***
export const removeSysUserRole = (data) => {
  return request({
    method: 'post',
    params: data,
    url: '/sysRole/removeSysUserRole',
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// *** 获取系统菜单树 ***
export const getAllSysMenuTree = (data) => {
  return request({
    method: 'get',
    params: data,
    url: '/menu/getSysMenuTree'
  })
}

// *** 添加系统菜单 ***
export const addSysMenus = (data) => {
  return request({
    method: 'post',
    params: data,
    url: '/menu/addSysMenu',
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// ***删除系统菜单 ***
export const deleteSysMenus = (data) => {
  return request({
    method: 'post',
    params: data,
    url: '/menu/deleteSysMenu'
  })
}

// *** 修改系统菜单 ***
export const changeSysMenus = (data) => {
  return request({
    method: 'post',
    params: data,
    url: '/menu/updateSysMenu',
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// *** 获取系统角色菜单列表 ***
export const getSysRoleMenus = (data) => {
  return request({
    method: 'get',
    url: '/menu/getSysRoleMenuTree',
    params: data
  })
}

// *** 获取系统所有请求 ***
export const getAllSysRequest = (data) => {
  return request({
    method: 'get',
    url: '/req/findAllSysRequest',
    params: data
  })
}

// *** 设置角色请求 ***
export const setSysRoleRequest = (data) => {
  return request({
    method: 'post',
    url: '/req/setSysRoleRequest',
    params: data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// *** 获取角色请求 ***
export const getRolesRequest = (data) => {
  return request({
    method: 'get',
    url: '/req/getSysRoleRequest',
    params: data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// *** 添加系统角色 ***
export const addSysRole = (data) => {
  return request({
    method: 'post',
    url: '/sysRole/addSysRole',
    params: data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// *** 删除系统角色 ***
export const deleteSysRole = (data) => {
  return request({
    method: 'post',
    url: '/sysRole/deleteSysRole',
    params: data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// *** 修改系统角色 ***
export const updateSysRole = (data) => {
  return request({
    method: 'post',
    url: '/sysRole/updateSysRole',
    params: data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// *** 设置系统角色菜单 ***
export const setSysRoleMenu = (data) => {
  return request({
    method: 'post',
    url: '/menu/setSysRoleMenu',
    params: data
  })
}

// *** 添加系统请求 ***
export const addSysRequest = (data) => {
  return request({
    method: 'post',
    url: '/req/addSysRequest',
    params: data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// *** 删除系统请求 ***
export const deleteSysRequest = (data) => {
  return request({
    method: 'post',
    url: '/req/deleteSysRequest',
    params: data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// *** 修改系统请求 ***
export const updateSysRequest = (data) => {
  return request({
    method: 'post',
    url: '/req/updateSysRequest',
    params: data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}
// *** 获取用户菜单列表 ***
export const getSysUserMenus = (data) => {
  return request({
    method: 'get',
    url: '/menu/getSysUserMenuTree',
    params: data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}
// ***用户名检查 ***
export const checkUserName = (data) => {
  return request({
    method: 'get',
    url: '/sysUser/checkUserName'
  })
}
