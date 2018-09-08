<template>
  <router-link tag="li"  class="noTreeMenu" v-if="router && router.name" :to="router" exact>
    <a href="#">
      <i class=""></i> <span>{{ name }}</span>
    </a>
  </router-link>
  <li :class="getType" v-else>
    <!-- {{ isHeader ? name : '' }} -->
    <a href="#">
      <i></i> <span>{{ name }} </span>
      <span class="pull-right-container">
        <!-- <small v-if="badge && badge.data" class="label pull-right" :class="[badge.type==='String'?'bg-green':'label-primary']">{{ badge.data }}</small> -->
        <i class="fa fa-angle-left pull-right"></i>
      </span>
    </a>
      <ul  data-widget="tree" class="treeview-menu" v-if="items.length > 0">
        <router-link exact tag="li" v-for="(list,index) in items" :data="list" :key="index" :to ='{name: list.component}'  v-if="list">
          <a>
            <i class="iconfont icon-point-copy-copy"></i> {{ list.name }}
          </a>
        </router-link>
        <li v-else class="menuli">
          <a>
            <i class=""></i> {{ list.name }}
          </a>
        </li>
      </ul>
  </li>
</template>

<script>
export default {
  name: 'SlideItem',
  data () {
    return {
    }
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    name: {
      type: String
    },
    // badge: {
    //   type: Object,
    //   default () {
    //     return {}
    //   }
    // },
    iconList: {
      type: Array,
      default () {
        return []
      }
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    router: {
      type: Object,
      default () {
        return {
          name: ''
        }
      }
    },
    component: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    }
  },
  created () {
    // console.log('icon>>>>', iconList)
  },
  computed: {
    getType () {
      // if (this.isHeader) {
      //   return 'header'
      // }
      return this.type === 'item' ? '' : 'treeview'
    }
  }
}
</script>
<style>
  .skin-blue .sidebar-menu>li.active>a {
    border-left-color:#212121;
  }
  .sidebar-menu li>a {
    color: #abb3c3;
  }

  .sidebar-menu .va-slide-item a:hover,
  .sidebar-menu .va-slide-item li:hover {
    background: #424144;
  }

  /*侧边栏选项渐变效果 */

  .sidebar-menu .noTreeMenu:active,
  .sidebar-menu .treeview a:active,
  .sidebar-menu .treeview .menuli:active
   {
    /* Safari*/
    background: -webkit-linear-gradient(left, #20756e, #353c4b);
    /* Opera*/
    background: -o-linear-gradient(right, #20756e, #353c4b);
    /* Firefox*/
    background: -moz-linear-gradient(right, #20756e, #353c4b);
    background: linear-gradient(to right, #20756e, #353c4b);
  }

  .sidebar-menu li>a:hover {
    color: #fff;
  }

</style>
