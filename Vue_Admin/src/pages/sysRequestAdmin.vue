<template lang="html">
 <div class="container-fluid">
   <div class="row margin0px">
     <h4>系统请求管理</h4>
     <button id="addSysRequest" type="button" class="btn btn-info"  data-toggle="modal" data-target="#myModal"><i class="iconfont icon-add"></i> 添加系统请求</button>
     <button id="changeRequest" type="button" class="btn btn-success" data-toggle="modal" data-target="#updateModal"><i class="iconfont icon-xiugai"></i> 修改系统请求</button>
     <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
       <div class="modal-dialog">
         <div class="modal-content">
           <div class="modal-header">
             <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
             <h4 class="modal-title" id="updateModalLabel">修改系统请求</h4>
           </div>
           <div class="modal-body">
             <div class="form-group has-feedback">
               <label for="recipient-name" class="control-label">ID</label>
               <input type="text" class="form-control" readonly v-model="selectId"/>
             </div>
             <div class="form-group has-warning has-feedback">
               <label for="recipient-name" class="control-label" v-show="!requestName">请输入请求名称</label>
               <input type="text" class="form-control"  v-model="requestName"/>
             </div>
             <div class="form-group has-warning has-feedback">
               <label for="recipient-name" class="control-label" v-show="!requestSort">请输入序号</label>
               <input type="number" class="form-control"  v-model="requestSort"/>
             </div>
             <div class="form-group has-feedback">
               <label for="recipient-name" class="control-label">请求地址</label>
               <input type="text" class="form-control"  v-model="requestUrl"/>
             </div>
             <div class="form-group has-feedback">
               <label for="recipient-name" class="control-label">方法类型</label>
               <select class="form-control" v-model="method">
                 <option value="post">POST</option>
                 <option value="get">GET</option>
               </select>
             </div>
             <div class="form-group has-feedback">
               <label for="recipient-name" class="control-label" v-model="methodName">方法名称</label>
              <input type="text" class="form-control"  />
             </div>
             <div class="form-group has-feedback">
               <label for="recipient-name" class="control-label">是否为公共请求</label>
               <span>是<input type="radio" v-model="selectValue" value="true"/></span>
               <span>否<input type="radio" v-model="selectValue" value="false"/></span>
             </div>
             <div class="form-group has-feedback">
               <label for="recipient-name" class="control-label">分组</label>
               <select class="form-control" v-model="selectGroup">
                 <option v-for="num in requestGroup" :value="num">{{num}}</option>
               </select>
                <!-- <input type="number" class="form-control" placeholder="(必填)"  v-model="requestGroup"/> -->
             </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
             <button type="button" class="btn btn-primary" @click="updateSysRequest">提交</button>
           </div>
         </div>
         <!-- /.modal-content -->
       </div>
       <!-- /.modal -->
     </div>
   </div>
     <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
       <div class="modal-dialog">
         <div class="modal-content">
           <div class="modal-header">
             <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
             <h4 class="modal-title" id="myModalLabel">添加系统请求</h4>
           </div>
           <div class="modal-body">
             <div class="form-group has-warning has-feedback">
               <label v-show="!requestName">请输入请求名称</label>
               <input type="text" class="form-control" v-model="requestName"/>
             </div>
             <div class="form-group has-warning has-feedback">
               <label v-show="!requestSort">请输入序号</label>
               <input type="number" class="form-control" v-model="requestSort"/>
             </div>
             <div class="form-group has-warning has-feedback">
                <label v-show="!requestUrl">请输入请求地址</label>
               <input type="text" class="form-control"  v-model="requestUrl"/>
             </div>
             <div class="form-group has-feedback">
               <label for="recipient-name" class="control-label">方法类型</label>
               <select class="form-control" v-model="method">
                 <option value="post">POST</option>
                 <option value="get">GET</option>
               </select>
             </div>
             <div class="form-group has-feedback">
               <label for="recipient-name" class="control-label">方法名称</label>
              <input type="text" class="form-control"  v-model="methodName"/>
             </div>
             <div class="form-group has-feedback">
               <label for="recipient-name" class="control-label">是否为公共请求</label>
               <label>是<input type="radio" v-model="selectValue" value="true"/></label>
               <label>否<input type="radio" v-model="selectValue" value="false"/></label>
             </div>
             <div class="form-group has-feedback">
               <label for="recipient-name" class="control-label">分组</label>
               <select class="form-control" v-model="selectGroup">
                 <option v-for="num in requestGroup" :value="num">{{num}}</option>
               </select>
                <!-- <input type="number" class="form-control" placeholder="(必填)"  v-model="requestGroup"/> -->
             </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
             <button type="button" class="btn btn-primary" @click="addSysRequest">提交</button>
           </div>
         </div>
         <!-- /.modal-content -->
       </div>
       <!-- /.modal -->
     </div>
   </div>
 </div>
   <div class="table-responsive marginTop15">
      <table class="table table-striped table-bordered text-center">
        <thead>
          <tr class="success">
            <th>Id</th>
            <th>排序</th>
            <th>名称</th>
            <th>URL</th>
            <th>请求类型</th>
            <th>是否为公共请求</th>
            <th>操作</th>
            <th>删除</th>
          </tr>
        </thead>
        <tbody v-for="list in data.data">
         <tr>
            <td>{{list.id}}</td>
            <td>{{list.sort}}</td>
            <td>{{list.name}}</td>
            <td>{{list.url}}</td>
            <td>{{list.method}}</td>
            <td>{{list.publicRequest ? '是' : '否'}}</td>
            <td><input type="checkbox" @change="handleCheckbox(list.id,selectId)" :checked="list.id==selectId" :value="list.id"></td>
            <td><button type="button" class="btn btn-xs btn-warning deleteBtn" @click="deleteSysRequest(list.id)"><i class="iconfont icon-shanchu"></i> 删除</button></td>
        </tr>
        </tbody>
      </table>
      </div>
          <pagination @pagechange="loadCurrentPage2" :limit='limit' :currentpage="page" :total = 'data.total' :pages = "data.pages"></pagination>
    </div>
 </div>
</template>

<script type="es6">
import pagination from '../components/pagination.vue'
import '../assets/style/comm.css'
import * as api from '../assets/js/api.js'
import {delCookie} from '../lib/cookie.js'
export default {
  components: {
    pagination,
  },
  data() {
    return {
      data: [],
      selectValue: false,
      requestName: '',
      requestSort: null,
      requestUrl: '',
      method: 'post',
      methodName: '',
      requestGroup: [0,1,2,3,4,5,6,7,8,9],
      selectId: null,
      limit: 10,
      page: 1,
      isajax: false,
      selectGroup: null
    }
  },

  created() {
    setTimeout(() => {
      this.searchAllRequest()
    }, 200)
  },
  methods: {
    toloadData() {
      const app = this;
      if (!app.isajax) {
        app.isajax = true;
        let data = {
          page: app.page,
          rows: app.limit
        }
        api.getAllSysRequest(data).then((res) => {
          if (res.data.code === '0' && res.data.data.length > 0) {
            app.data = res.data;
          } else if (res.data.code === '1001') {
            alert(res.data.message)
            return
          } else {
            alert('获取失败')
            return
          }
          app.isajax = false;
          return
        }).catch((err) => {
          app.isajax = false;
          return
        })
      } else {
        alert("请稍后...");
      }
    },
    loadCurrentPage2(page) {
      const app = this;
      if (page > app.data.pages || page == app.page) {
        return;
      } else {
        app.page = page;
        app.toloadData(page);
      }
    },
    // 查找所有的请求
    searchAllRequest() {
      const self = this;
      let data = {
        rows: self.limit,
        page: self.page
      }
      api.getAllSysRequest(data).then((res) => {
        if (res.data.code === '0' && res.data.data.length > 0) {
          self.data = res.data;
        } else if (res.data.code === '1001') {
          alert(res.data.message);
          // 无权限状态下禁用button
         $('#addSysRequest').attr('disabled',"true");
         $('#changeRequest').attr('disabled',"true");
          return
        } else if (res.data.code === '1000') {
          alert('登录已失效!请重新登录!')
          delCookie('session')
          self.$router.push('/login')
          // console.log(res);
          return
        } else {
          alert('获取失败')
          return
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    handleCheckbox: function(id, currentid) {
      if (currentid === id) {
        this.selectId = null
      } else {
        this.selectId = id
      }
    },
    // 添加系统请求
    addSysRequest() {
      const self = this
      if (!self.requestName || !self.selectValue || !self.requestSort || !self.requestUrl || !self.method) {
        alert('请填写完整!')
        return
      }
      let data = {
        name: self.requestName,
        sort: self.requestSort,
        url: self.requestUrl,
        method: self.method,
        methodName: self.methodName,
        publicRequest: self.selectValue,
        group: self.selectGroup
      }
      // console.log('data>>>', data)
      api.addSysRequest(data).then((res) => {
        if (res.data.code === '0') {
          alert('添加成功!')
        } else if (res.data.code === '1001') {
          alert(res.data.message);
        } else {
          alert('添加失败')
        }
          self.requestName = ''
          self.requestSort = null
          self.requestUrl = ''
          self.method = ''
          self.methodName = ''
          self.selectGroup = null
          return
      }).catch((err) => {
        console.log(err)
      })
    },
    // 删除系统请求
    deleteSysRequest(id) {
      const self = this
      let request = confirm('确认要删除吗')
      if (request) {
        let data = {
          id: id
        }
        api.deleteSysRequest(data).then((res) => {
          if (res.data.code === '0') {
            alert('删除成功!')
            return
          } else if (res.data.code === '20007') {
            alert('系统请求不存在!')
            return
          } else if (res.data.code === '1001') {
            $('.deleteBtn').attr('disabled',"true");
            alert(res.data.message);
            return
          } else {
            alert('删除失败')
            return
          }
        }).catch((err) => {
          console.log(err)
        })
      } else {
        return
      }
    },

    // 修改系统请求
    updateSysRequest() {
      const self = this
      if (self.selectId == null) {
        // console.log(self.selectId)
        alert('请勾选选项!')
        return
      }
      if (!self.requestName || !self.requestUrl || !self.requestSort || !self.selectGroup) {
          alert('请填写完整!')
          return
      }
        let data = {
          id: self.selectId,
          name: self.requestName,
          sort: self.requestSort,
          url: self.requestUrl,
          method: self.method,
          methodName: self.methodName,
          publicRequest: self.selectValue,
          group: self.selectGroup
        }
        // console.log('data>>>', data)
        api.updateSysRequest(data).then((res) => {
          if (res.data.code === '0') {
            alert('修改成功!')
          } else if (res.data.code === '1001') {
            alert(res.data.message);
          } else {
            alert('修改失败')
          }
            self.selectId = null
            self.requestName = ''
            self.requestUrl = ''
            self.method = ''
            self.selectGroup = null
            return
        }).catch((err) => {
          console.log(err);
        })
    }
  }
}
</script>

<style lang="css">
</style>
