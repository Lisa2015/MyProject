<template>
  <aside id="slider" class="main-sidebar">
    <section class="sidebar">
      <div class="user-panel " style="padding-bottom:35px;">
            <div class="text-center info">
              <span style="color:rgb(134, 212, 205)"><strong>后台管理系统</strong></span>
            </div>
          </div>
      <ul data-widget="tree" class="sidebar-menu">
        <li class="noTreeMenu router-link-exact-active active"><a href="#/indexExsit"> <span>首页</span></a></li>
        <SlideItem v-for="(item,index) in slideMenuItems"  :key="index" :type="item.type" :name="item.name"
        :items="item.childrens" :router= "{name: item.component}" :iconList = "iconList">
        </SlideItem>
      </ul>
    </section>
  </aside>
</template>

<script type="es6">
  import '../assets/style/comm.css'
  import SlideItem from '../components/SlideItem'
  import {getCookie, delCookie} from '../lib/cookie.js'
  import * as api from '../assets/js/api.js'
  export default {
    name: 'VASlider',
    data() {
      return {
        slideMenuItems: [],
        userId: null,
        iconList: [
          {
            id: '34',
            icon: 'iconfont iconfont icon-yunying'
          },
          {
            id: '36',
            icon: 'iconfont icon-xueyuanguanli'
          },
          {
            id: '38',
            icon: 'iconfont icon-buchongiconsvg15'
          },
          {
            id: '41',
            icon: 'iconfont icon-icon'
          },
          {
            id: '43',
            icon: 'iconfont icon-caidan'
          },
          {
            id: '44',
            icon: 'iconfont icon-cw'
          }
        ]
      }
    },
    props: {
    },

    created () {
        // console.log(this.slideMenuItems);
        const self = this
        self.userId = getCookie('session');
        // console.log('userId>>>>>>>', self.userId)
        if (self.userId) {
          let data = {
            userId: self.userId
          }
          api.getSysUserMenus(data).then((res) => {
             if (res.data.code === '0' && res.data.data.length > 0) {
               self.slideMenuItems = res.data.data
              //  console.log('self.slideMenuItems', self.slideMenuItems)
             } else {
               alert('获取失败!')
               return
             }
           }).catch((err) => {
             console.log(err)
           })
        } else {
          self.$router.push('/login')
        }
    },
    methods: {
    },
    components: {
       SlideItem
    }
  }

</script>

<style scoped>
 /* 侧边栏折叠之后缩小用户头像 */
  @media screen and (max-width: 1440px) {
    .sidebar-mini.sidebar-collapse .main-sidebar .user-panel #imageCircle {
      max-width:30px;
    }
   .sidebar-mini.sidebar-collapse .main-sidebar .user-panel p {
     font-size:12px;
   }
  }
  .sidebar-mini.sidebar-collapse .main-sidebar .user-panel #imageCircle {
    max-width:30px;
  }
  .sidebar-mini.sidebar-collapse .main-sidebar .user-panel p {
    font-size:12px;
  }
  #slider {
    background:#353c4b;
  }
  .user-panel {
    color:#fff;
  }
  .user-panel #imageCircle {
    max-width:80px;
    border: 1px solid #757474;
    border-radius: 50px;
    margin-bottom: 10px;
  }
</style>
