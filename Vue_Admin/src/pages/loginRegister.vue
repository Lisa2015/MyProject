<template>
<div class="login-box">
  <div class="topTitle text-center">
    <h3 style="color:#437daf">菁童网后台管理系统</h3>
  </div>
    <div class="login-box-body col-xs-12">
      <div class="alert alert-warning noExsit" role="alert" style="display:none">用户名不存在!</div>
      <div class="alert alert-warning loginFail" role="alert" style="display:none">密码错误!</div>
      <div class="alert alert-warning lockedAccount" role="alert" style="display:none">账号已锁定!</div>
      <div class="alert alert-warning loginFrequently" role="alert" style="display:none">登录过于频繁,请稍后再试</div>
        <div class="alert alert-warning isNull" role="alert" style="display:none">账号和密码不能为空!</div>
      <div class="form-group has-feedback">
        <i class="iconfont icon-zhanghao form-control-feedback" style="font-size:18px;"></i>
        <input type="text" required autofocus="autofocus"   class="form-control" placeholder="请输入账号" v-model.trim="userName" />
      </div>
      <div class="form-group has-feedback">
        <i class="iconfont icon-mima01 form-control-feedback" style="font-size:18px;"></i>
        <input type="password" required class="form-control" placeholder="请输入密码" v-model.trim="password" />
        <!-- <span class="icon ion-eye "></span> -->
      </div>
        <div class=" col-xs-10 clearfix">
          <div class="checkbox">
            <input style="top:-3px;margin-left:-16px;" @click="doRememberPassword($event)" type="checkbox" v-model="rememberPwd"><label style="padding-left:0px">记住密码</label>
            <!-- <span class="fr clearfix"><a  href="#">忘记密码?</a></span> -->
          </div>
        </div>
      <div class="row">
        <div class="col-xs-12">
          <button type="button" class="btn btn-primary btn-block btn-flat" @click="toLogin">登录</button>
        </div>
      </div>
    </div>
</div>
</template>
<script type="es6">
import * as checkJs from '../lib/validata'
import * as api from '../assets/js/api.js'
import {setCookie, getCookie, delCookie} from '../lib/cookie.js'
export default {
  computed: {
    // 加密密码
    mdpassword () {
      return checkJs.encryptedPassword(this.password)
    }
  },
  mounted () {
    this.loadAccountInfo()
  },
  data () {
    return {
      userName: '',
      password: '',
      rememberPwd: false
    }
  },
  created () {
  },
  methods: {
    toLogin () {    
      const self = this
      if (checkJs.isNullOrEmpty(self.userName) || checkJs.isNullOrEmpty(self.password)) {
        $('.isNull').show()
        setTimeout(() => {
          $('.isNull').hide()
        }, 1200)
        return
      }
      if (checkJs.isPhone(this.userName) === false) {
        alert('手机号码格式错误!')
        return
      }
      let data = {
        'userName': self.userName,
        'password': self.mdpassword
      }
      let accountInfo = self.userName + '&' + self.password
      api.userLoginApi(data).then((res) => {
        // console.log(res)
        if (res.data.code === '20001') {
          $('.loginFail').show()
          setTimeout(() => {
            $('.loginFail').hide()
          }, 1200)
          return
        } else if (res.data.code === '20002') {
          $('.noExsit').show()
          setTimeout(() => {
            $('.noExsit').hide()
          }, 1200)
          return
        } else if (res.data.code === '20004') {
          $('.lockedAccount').show()
          setTimeout(() => {
            $('.lockedAccount').hide()
          }, 1200)
          return
        } else if (res.data.code === '20003') {
          $('.loginFrequently').show()
          setTimeout(() => {
            $('.loginFrequently').hide()
          }, 1200)
        } else if (res.data.code === '0') {
          if (self.rememberPwd) {
            // accountInfo = JSON.stringify(accountInfo)
            setCookie('accountInfo', accountInfo)
          } else {
            delCookie('accountInfo')
          }
          // let expireDays = -1
          let UserId = JSON.stringify(res.data.data.userId)
          setCookie('session', UserId)
          // console.log(' res.data.data.UserId>>', UserId)
          self.$router.push('/main')
          self.userName = ''
          self.password = ''
          return
        } else {
          alert('登录失败!请检查网络')
          return
        }
      }).catch((error) => {
        console.log(error)
      })
    },

    doRememberPassword (event) {
      let self = this
      let rememberStatus = self.rememberPwd
      self.rememberPassword = !rememberStatus
    },
    loadAccountInfo () {
      let self = this
      let accountInfo = getCookie('accountInfo')
      if (Boolean(accountInfo) === false) {
        return false
      } else {
        let index = accountInfo.indexOf('&')

        self.userName = accountInfo.substring(0, index)
        self.password = accountInfo.substring(index + 1)
        // console.log('self.userName', self.userName)
        // console.log('self.password', self.passWord)
      }
    }
  }
}
</script>
<style lang="css">

</style>
