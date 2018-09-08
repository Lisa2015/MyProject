<template>
<div class="container-fluid">
  <div class="row margin0px">
    <h4>菜单管理</h4>
    <button id="addMenusButton" class="btn btn-info" data-toggle="modal" data-target="#myModal"><i class="iconfont icon-add"></i> 添加系统菜单</button>
    <button id="changeMenuButton" class="btn btn-warning" data-toggle="modal" data-target="#changeMenuModal"><i class="iconfont icon-xiugai" ></i> 修改系统菜单</button>
    <div class="modal fade" id="changeMenuModal" tabindex="-1" role="dialog" aria-labelledby="changeMenuModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="changeMenuModalLabel">修改系统菜单</h4>
          </div>
          <div class="modal-body">
            <div class="form-group has-feedback">
              <label for="recipient-name" class="control-label">菜单ID</label>
              <input type="text" disabled="disabled" class="form-control" v-model="menuId" />
            </div>
            <div class="form-group has-warning has-feedback">
              <label  class="control-label" v-show="!menuName">菜单名称</label>
              <input type="text" class="form-control" v-model="menuName" />
            </div>
            <div class="form-group has-feedback">
              <label for="recipient-name" class="control-label">菜单父级</label>
              <select class="form-control" v-for="items in menuTreeList" v-model="parentMenu">
              <option value = "0" >最高级菜单</option>
              <template v-for="val in items">
                <option :value="val.id">{{val.name}}</option>
              </template>
              </select>
              <!-- <input type="number"  class="form-control" placeholder="(必填)" v-model="parentMenu" /> -->
            </div>
            <div class="form-group has-feedback">
              <label for="recipient-name" class="control-label">菜单类型</label>
              <select class="form-control" v-model="menuType">
                <option value="1" >菜单</option>
                <option value="2">按钮</option>
              </select>
              <!-- <input type="number" class="form-control" placeholder="(必填)" v-model="menuType" /> -->
            </div>
            <!-- <div class="form-group has-feedback">
                <label for="recipient-name" class="control-label">描述</label>
              <input type="text" class="form-control" placeholder="描述" v-model="menuDesc" />
            </div> -->
            <div class="form-group has-feedback">
              <label for="recipient-name" class="control-label">请选择分组</label>
              <select class="form-control" v-model="selectedGroup">
                <option v-for="num in menuGroup" :value="num">{{num}}</option>
              </select>
              <!-- <input type="number" class="form-control" placeholder="(必填)" v-model="menuGroup" /> -->
            </div>
            <div class="form-group has-warning has-feedback">
              <label class="control-label"  v-show="!menuSort">请输入序号</label>
              <input type="number" class="form-control" placeholder="(必填)" v-model="menuSort" />
            </div>
            <div class="form-group has-feedback">
              <label for="recipient-name" class="control-label">组件名称</label>
              <input type="text" class="form-control" v-model="componet" />
            </div>
            <div class="form-group has-feedback">
              <label for="recipient-name" class="control-label">路径</label>
              <input type="text" class="form-control"  v-model="path" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="changeSysMenu">提交</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">添加系统菜单</h4>
          </div>
          <div class="modal-body">
            <div class="form-group has-warning has-feedback">
              <!-- <label for="recipient-name" class="control-label">菜单名称</label><br> -->
              <label v-show="!menuName">请输入菜单名称</label>
              <input type="text" class="form-control" onfocus ="onfocus" v-model="menuName" />
            </div>
            <div class="form-group has-feedback">
              <label for="recipient-name" class="control-label">父级菜单</label>
              <select class="form-control" v-for="items in menuTreeList" v-model="parentMenu">
              <option value = "0">最高级菜单</option>
              <template v-for="val in items">
                <option :value="val.id">{{val.name}}</option>
              </template>
              </select>
            </div>
            <div class="form-group has-feedback">
              <label for="recipient-name" class="control-label">菜单类型</label>
              <select class="form-control" v-model="menuType">
                <option value="1">菜单</option>
                <option value="2">按钮</option>
              </select>
            </div>
            <!-- <div class="form-group has-feedback">
                <label for="recipient-name" class="control-label">描述</label>
              <input type="text" class="form-control" placeholder="描述" v-model="menuDesc" />
            </div> -->
            <div class="form-group has-feedback">
              <label for="recipient-name" class="control-label">请选择分组</label>
              <select class="form-control" v-model="selectedGroup">
                <option v-for="num in menuGroup" :value="num"  >{{num}}</option>
              </select>
              <!-- <input type="number" class="form-control" placeholder="(必填)" v-model="menuGroup" /> -->
            </div>
            <div class="form-group has-warning has-feedback">
              <!-- <label for="recipient-name" class="control-label">序号(仅限数字)</label> -->
              <label  v-show="!menuSort">请输入序号</label>
              <input type="number" class="form-control"  v-model="menuSort" />
            </div>
            <div class="form-group has-feedback">
              <label  class="control-label" >请选择组件</label>
              <select class="form-control" v-model="componet">
                <option value="blank">blank</option>
                <option value="blank1">blank1</option>
              </select>
            </div>
            <div class="form-group has-feedback">
              <label class="control-label" >请选择路径</label>
               <select class="form-control" v-model="path">
                <option :value="'/'+ componet">{{'/'+ componet}}</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="addSysMenu">提交</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
  </div>
  <div class="table-responsive box-body no-padding marginTop15">
    <table id="menuTable" class="table table-striped table-bordered text-center"  v-for="list in menuTreeList">
      <thead>
        <tr class="info">
          <th>ID</th>
          <th>菜单名</th>
          <th>父级菜单</th>
          <th>菜单类型</th>
          <th>路径</th>
          <th>组件</th>
          <th>操作</th>
          <th>删除</th>
        </tr>
      </thead>
      <tbody v-for="item in list">
        <tr >
          <td>{{item.id}}</td>
          <td><strong>{{item.name}}</strong></td>
          <td>{{item.parent==0 ? '根目录': item.parent}}</td>
          <td>{{item.type == 1 ? '一级菜单':'按钮'}}</td>
        <td>{{item.path}}</td>
        <td>{{item.component}}</td>
        <td><input type="checkbox" :value="item.id" @change="handleCheckbox(item.id,menuId)" :checked="item.id==menuId"></td>
        <td> <button class="btn btn-xs btn-danger" @click="deleteSysMenu(item.id)"> <i class="iconfont icon-shanchu"> </i> 删除</button></td>
        </tr>
        <tr v-for="value in item.childrens">
          <td>{{value.id}}</td>
          <td>{{value.name}}</td>
          <td>{{value.parent}}</td>
          <td>{{value.type  == 1 ? '二级菜单':'按钮'}}</td>
          <td>{{value.path}}</td>
          <td>{{value.component}}</td>
          <td> <input type="checkbox" :value="value.id" @change="handleCheckbox(value.id,menuId)" :checked="value.id==menuId"></td>
          <td> <button class="btn btn-xs btn-danger" @click="deleteSysMenu(value.id)"> <i class="iconfont icon-shanchu"> </i> 删除</button></td>
        </tr>
      </tbody>
    </table>
    <!-- <pagination></pagination> -->
  </div>
</div>
</template>
<script type="es6">
import '../assets/style/comm.css'
import * as api from '../assets/js/api.js'
import pagination from '../components/pagination.vue'
import {delCookie} from '../lib/cookie.js'
export default {
  components: {
    pagination
  },
  computed:{
  },
  data () {
    return {
      menuName: '',
      parentMenu: 0,
      menuType: 1,
      // menuDesc: '',
      menuGroup: [0,1,2,3,4,5,6,7,8,9],
      menuSort: null,
      menuTreeList: [],
      menuId: [],
      componet: 'blank',
      path: '',
      selectedGroup: null
    }
  },
  mounted () {

  },
  created () {

    // 获取系统菜单树
    const self = this
    let data = {
      parent: 0
    }
    const promise = api.getAllSysMenuTree(data);
    promise.then(function(res){
      if (res.data.code === '0' && res.data.data.length > 0) {
        // console.log(res.data.data)
        self.menuTreeList.push(res.data.data)
      } else if (res.data.code === '1001') {
        // 无权限状态下禁用button
        $('#addMenusButton').attr('disabled',"true");
        $('#changeMenuButton').attr('disabled',"true");
        alert(res.data.message);
        return
      } else if(res.data.code === '1000') {
        alert('登录已失效!请重新登录!')
        delCookie('session')
        self.$router.push('/login')
        // console.log(res);
        return
      } else {
        return false
      }
    },function(err){
        console.log(err)
    }).catch((err) => {
        console.log(err)
    });
  },
  methods: {
    handleCheckbox: function (id, currentid) {
      const self = this
      if (currentid === id) {
        self.menuId = null
      } else {
        self.menuId = id
      }
    },
    addSysMenu () {
      const self = this
      if (!self.menuName || !self.componet || !self.path) {
        alert('请填写完整!')
        return
      }
      
      let data = {
        name: self.menuName,
        parent: self.parentMenu,
        type: self.menuType,
        // desc: self.menuDesc,
        group: self.selectedGroup,
        sort: self.menuSort,
        component: self.componet,
        path: self.path
      }
      // if (self.menuType === 2) {
      //
      // }
      api.addSysMenus(data).then((res) => {
        if (res.data.code === '0') {
            alert('添加成功!')
        } else if (res.data.code === '1001') {
          alert(res.data.message)
          return
        } else if (res.data.code === '10000') {
          alert(res.data.message)
        } else {
          alert('添加失败!')
          return
        }
        self.menuName = ''
        self.parentMenu = null
        self.menuType = null
        // self.menuDesc = ''
        self.selectedGroup = null
        self.menuSort = null
        self.componet = ''
        self.path = ''
        return
      }).catch((err) => {
        console.log(err)
      })
    },
    deleteSysMenu (id) {
      const self = this
        let request = confirm('确认要删除吗?')
        if (request) {
          let data = {
            menuId: id
          }
          api.deleteSysMenus(data).then((res) => {
            console.log(res.data)
            if (res.data.code === '0') {
              alert('删除成功!')
            } else if (res.data.code === '1001') {
              $('.btn-danger').attr('disabled',"true");
              alert(res.data.message)
              return
            } else {
              alert('删除失败')
              return
            }
            return
          }).catch((err) => {
            console.log(err)
          })
        } else {
          return
        }
    },
    changeSysMenu () {
      const self = this
      if (self.menuId.length === 0) {
        alert('请勾选选项!')
        return
      }
      if (!self.menuName || !self.menuType) {
        alert('请填写完整!')
        return
      }
      let changeMenuId = self.menuId.toString()
      let data = {
        id: changeMenuId,
        name: self.menuName,
        parent: self.parentMenu,
        type: self.menuType,
        // desc: self.menuDesc,
        group: self.selectedGroup,
        sort: self.menuSort,
        component: self.componet,
        path: self.path
      }
      // console.log('data', data)
      api.changeSysMenus(data).then((res) => {
        if (res.data.code === '0') {
          alert('修改成功!')
          return
        } else if (res.data.code === '1001') {
          alert(res.data.message)
          return
        } else {
          alert('修改失败')
          return
        }
        self.menuId = []
        self.menuName = ''
        self.parentMenu = null
        self.menuType = null
        // self.menuDesc = ''
        self.selectedGroup = null
        self.menuSort = null
        self.componet = ''
        self.path = ''
        return
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="css">
</style>
