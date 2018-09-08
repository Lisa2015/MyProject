<template>
  <div class="border-top text-right">
    <div class="col d-flex justify-content-center"  >
        <nav>
            <ul class="pagination" v-if="pages<=limit">
                <li class="page-item" v-if="page!=1">
                    <span class="page-link" @click="loadCurrentPage(1)">首页</span>
                </li>
                <li class="page-item" v-for="index in pages" :class="{active:page==index}">
                        <a @click="loadCurrentPage(index)" class="page-link" href="javascript:;">{{index}}</a>
                </li>
                <li class="page-item" v-if="page!=pages">
                    <a class="page-link" href="javascript:;" @click="loadCurrentPage(pages)">末页</a>
                </li>
                <li class="page-item disabled">
                    <span class="page-link">共{{pages}}页/共{{total}}条数据</span>
                </li>
            </ul>
            <ul class="pagination" v-else-if="pages>limit">
                <li class="page-item" v-if="page!=1">
                    <span class="page-link" @click="loadCurrentPage(1)">首页</span>
                </li>
                <li class="page-item" v-for="index in pages" v-if="index>page-4&&index<page+4"  :class="{active:page==index}">
                    <a @click="loadCurrentPage(index)" class="page-link" href="javascript:;">{{index}}</a>
                </li>
                <li class="page-item" v-if="page!=pages">
                    <a class="page-link" href="javascript:;" @click="loadCurrentPage(pages)">末页</a>
                </li>
                <li class="page-item disabled">
                    <span class="page-link">共{{pages}}页/共{{total}}条数据</span>
                </li>
            </ul>
        </nav>
    </div>
</div>
</template>

<script type="es6">
export default {
  name: 'pagination',
  data() {
    return {
       page:this.currentpage
    }
  },
  props: {
    limit: {
      type: Number,
      default: null
    },
    total: {
      type: Number,
      default: null
    },
    pages: {
      type: Number,
      default: null
    },
    currentpage: {
      type: Number,
      default: null
    }
  },
  methods:{
    loadCurrentPage:function(page){
      this.page = page;
      this.$emit('pagechange', page);
    }
  }
}
</script>
