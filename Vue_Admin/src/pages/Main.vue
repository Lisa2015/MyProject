
<template>
<div class="panel">
  <VANaviBar></VANaviBar>
  <VASlider></VASlider>
  <div class="content-wrapper" style="min-height:710px">
    <!-- <section class="content-header">
        <h1>
          Dashboard
          <small>Control panel</small>
        </h1>
      </section> -->
    <section class="content">
      <transition name="page" mode="out-in">
        <router-view></router-view>
      </transition>
    </section>
  </div>
</div>
</template>

<script>
import '../assets/style/comm.css'
import VANaviBar from '../components/NaviBar'
import VASlider from '../components/Slider'

// import store from '../vuex/store.js'

export default {
  name: 'app',
  data () {
    return {

    }
  },
  created () {
  },
  components: {
    VANaviBar,
    VASlider
  }
}
</script>
<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
