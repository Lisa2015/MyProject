<template>
  <header class="main-header">
    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-static-top" role="navigation"  style="background:#fff;">
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <!-- 顶部导航栏右边 -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <div class="row topNavRight margin0px">
            <!-- <li class="dropdown notifications-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-bell" style="font-size: 18px;color: #8a8a8a;"></i>
                <span class="label label-warning">{{unreadNotificationsCount}}</span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">你有{{unreadNotificationsCount}}条未读消息</li>
                <li>
                </li>
                <li class="footer">
                  <a href="#">查看全部</a>
                </li>
              </ul>
            </li> -->
            <span class="speardLine">|</span>
              <li  @click="logout"> 退出登录</li>
          </div>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
  import '../assets/style/comm.css'
  import {delCookie} from '../lib/cookie.js'
  import * as api from '../assets/js/api.js'
// import {mapGetters} from 'vuex'

export default {
    name: 'VANaviBar',
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
      logout () {
        const self = this
        let request = confirm('确认要退出吗?')
        if (request) {
          api.logout().then((res) => {
            if (res.data.code === '0') {
              // console.log(res.data)
              delCookie('session')
              self.$router.push('/login')
            } else {
              console.log('退出失败!')
              return
            }
          }).then((err) => {
            console.log(err)
          })
        } else {
          return
        }
      }
    }
  }

</script>
<style scoped>
  .main-header .dropdown-header {
    font-size: 14px;
  }

  .skin-blue .main-header .navbar {
    background: #fff;
  }
  .main-sidebar {
    background: #212121;
    z-index: 999;
  }
  .selectSchool  > dropdown-menu>li>a :hover {
    background:#00ff !important;
  }


  .navbar-custom-menu {
    padding-right: 35px;
  }

  @media screen and (max-width: 767px) {
    .navbar-nav .open .dropdown-menu {
      position: absolute;
      left: -87px;
      background: #fff;
      border: 1px solid #ededed;
    }
  }
  @media screen and (max-width: 767px) {
    .skin-blue .main-header .navbar .dropdown-menu li a {
     color: #342929;
    }
  }
  .topNavRight .label-warning {
    position: absolute;
    top: -55%;
    left: 55%;
    background: red !important;
  }

</style>
