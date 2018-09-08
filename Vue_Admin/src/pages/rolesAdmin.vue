
<template>
<div id="app">
  <h4>角色管理</h4>
  <div class="row margin0px" style="padding-bottom: 0px 10px;">
    <button id="addRoles" type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal"> <i class="iconfont icon-add"></i> 添加系统角色</button>
    <button id="editRoles" type="button" class="btn btn-warning" data-toggle="modal" data-target="#updateModal"> <i class="iconfont icon-bianji1"></i> 编辑系统角色</button>
    <!-- <button type="button" class="btn btn-warning">移除系统角色</button> -->
    <!-- <button type="button" class="btn btn-info" data-toggle="modal" data-target="#setSysRoleMenu" ">设置系统角色菜单</button> -->
    <button id="setRolesRequest" type="button" class="btn btn-success" data-toggle="modal" data-target="#setSysRoleRequest"><i class="iconfont icon-shezhi"></i> 设置系统角色请求权限</button>
    </div>
    <div class="modal fade" id="setSysRoleRequest" tabindex="-1" role="dialog" aria-labelledby="setSysRoleRequest" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="setSysRoleRequest">设置系统角色请求权限</h4>
          </div>
          <div class="modal-body">
            <div class="form-group has-feedback">
              <label for="recipient-name" class="control-label">角色ID</label>
              <input type="text" class="form-control" disabled="disabled" placeholder="请勾选角色ID" v-model="rolesId" />
            </div>
            <table class="table table-striped">
              <thead>
                <tr class="info">
                  <th>Id</th>
                  <th>名称</th>
                  <th>是否为公共请求</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody v-for="list in data.data">
                <tr>
                  <td>{{list.id}}</td>
                  <td>{{list.name}}</td>
                  <td>{{list.publicRequest ? '是' : '否'}}</td>
                  <td><input type="checkbox" :value="list.id" v-model="selectedId"  @change="handleCheckChange"></td>
                </tr>
              </tbody>
            </table>
            <pagination @pagechange="loadCurrentPage2" :limit='limit' :currentpage="page" :total='data.total' :pages="data.pages"></pagination>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="setSysRolesRequest()">提交</button>
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
            <h4 class="modal-title" id="myModalLabel">添加系统角色</h4>
          </div>
          <div class="modal-body">
            <div class="form-group has-feedback">
              <input type="text" class="form-control" placeholder="角色名称" v-model="roleName" />
              <span class="iconfont icon-zhanghao form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
              <textarea class="form-control" placeholder="描述" v-model="roleDesc"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="addSysRoles">提交</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <div class="modal fade" id="getRolesRequest" tabindex="-1" role="dialog" aria-labelledby="getRolesRequest" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="getRolesRequest">查看系统角色请求权限</h4>
          </div>
          <div class="modal-body">
            <template v-if="rolesRequestList.length > 0">
              <ul v-for="items in rolesRequestList">
              <li>{{items.id}}.{{items.name}}</li>
             </ul>
            </template>
            <span v-else>暂无数据</span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">编辑系统角色</h4>
          </div>
          <div class="modal-body">
            <div class="form-group has-feedback">
              <input type="text" class="form-control" disabled="disabled" :value="rolesId" placeholder="角色ID" />
              <span class=" iconfont icon-ID form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
              <input type="text" class="form-control" placeholder="角色名称" v-model="updateName" />
              <span class="iconfont icon-zhanghao form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
              <textarea class="form-control" placeholder="描述" v-model="updateDesc"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="updateSysRole">提交</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <div class="modal fade" id="setSysRoleMenu" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  <h4 class="modal-title" id="myModalLabel">设置系统角色菜单</h4>
                </div>
                <div class="modal-body">
                  <div class="form-group has-feedback">
                    <div class="row margin0px">
                      <strong>当前角色拥有的菜单:</strong><br>
                          <ul  class="menu marginTop15" v-for="list in rolesMenuList">
                           <li v-if="list.havePermission == true" >{{list.name}}</i>
                          <ul v-for="item in list.childrens">
                            <li v-if="item.havePermission == true" >{{item.name}}</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <hr>
                    <div class="row margin0px">
                      <strong>添加新菜单</strong>
                      <span class="fr" >全选 <input type="checkbox" v-model="checkAll" @change="CheckAllChange"></span>
                      <ul  v-for="list in rolesMenuList">
                        <li v-if="list.havePermission == false"><input type="checkbox"  :value="list.id" v-model="menusId" @change="CheckChange">{{list.name}}
                        </li>
                             <ul v-for="val in list.childrens">
                            <li v-if="val.havePermission == false"><input type="checkbox" :value="val.id" v-model="menusId" @change="CheckChange">{{val.name}}</li>
                          </ul>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                  <button type="button" class="btn btn-primary" @click="setSysRoleMenu()">提交</button>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
          </div>
      <div class="table-responsive">
        <table id="rolesTable" class="table table table-striped table-bordered marginTop15">
      <thead>
        <tr class="danger">
          <!-- <th><input type="checkbox" /></th> -->
          <th>id</th>
          <th>角色名称</th>
          <th>角色描述</th>
          <th>查看角色的请求权限</th>
          <th>设置系统角色菜单</th>
          <th>操作</th>
          <th>删除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in rolesList">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.desc}}</td>
          <td><button  class=" btn btn-sm btn-info getRolesAdmin" data-toggle="modal" data-target="#getRolesRequest" :value="item.id" @click="getRolesRequest(item.id)"><i class="iconfont icon-chakan"></i> 查看角色请求权限</button></td>
          <td><button  type="button" class="btn btn-info btn-sm setSysMenus" data-toggle="modal" data-target="#setSysRoleMenu" @click="getSysRoleMenus(item.id)" style="background:#448aff;border-color:#448aff;"> <i class="iconfont icon-shezhi"></i> 设置系统角色菜单</button></td>
          <td><input class="checkbox" type="checkbox" :value="item.id" @change="handleCheckbox(item.id,rolesId)" :checked="item.id==rolesId">
          </td>
          <td><button type="button" class="btn btn-xs btn-danger deleteButton" @click="deleteSysRole(item.id, index)" ><i class="iconfont icon-shanchu"></i> 删除</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
<script>
import {ClearNullArr} from '../lib/validata.js'
import pagination from '../components/pagination.vue'
import * as api from '../assets/js/api.js'
import {delCookie} from '../lib/cookie.js'
export default {
  components: {
    pagination
  },
  data () {
    return {
      rolesList: [],
      roleName: '',
      roleDesc: '',
      rolesId: null,
      updateName: '',
      updateDesc: '',
      menuItems: [],
      menuTree: [],
      menusId: [],
      rolesRequestList: [],
      data: [],
      page: 1,
      limit: 10,
      isajax: false,
      selectedId: [],
      rolesMenuList: [],
      checkAll: false,
      currentMenus: []
    }
  },
  created () {
    const self = this
    // 获取所有的角色
    api.getAllSysRole().then((res) => {
      // console.log(res)
      if (res.data.data && res.data.data.length > 0) {
        self.rolesList = Array.from(res.data.data)
      } else if (res.data.code === '1001') {
        alert(res.data.message)
        // 无权限状态下禁用button
        $('#addRoles').attr('disabled',"true");
        $('#editRoles').attr('disabled',"true");
        $('#setRolesRequest').attr('disabled',"true");
        return
      } else if (res.data.code === '1000') {
        alert('登录已失效!请重新登录!')
        delCookie('session')
        self.$router.push('/login')
        // console.log(res);
        return
      } else {
        // alert('获取失败')
        return false
      }
    }).catch((error) => {
      console.log(error)
    })
    // 获取系统菜单树
    let data = {
      parent: 0
    }
    api.getAllSysMenuTree(data).then((res) => {
      if (res.data.code === '0' && res.data.data.length > 0) {
        // console.log(res.data.data)
        self.menuTree = res.data.data
      } else if (res.data.code === '1001') {
        alert(res.data.message)
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
      console.log(err)
    })
    setTimeout (() => {
      this.searchAllRequest()
    }, 200)

  },
  methods: {
    handleCheckbox(id, currentid) {
      if (currentid === id) {
        this.rolesId = null
      } else {
        this.rolesId = id
      }
    },
   // checkbox全选函数
    handleCheckAllChange () {
      const self = this
        let items = []
        items = self.data.data.map(item => {
          return item.id
        })
        self.selectedId = self.checkAll ? items : []
        // console.log('self.checkAll', self.checkAll);
    },
    handleCheckChange () {
      const self = this
      if (self.checkAll === true) {
        self.checkAll = self.selectedId.length === self.data.data.length
      }
      // console.log('self.checkAll>>>>>>>', self.checkAll);
    },
    CheckAllChange () {
      const self = this
        let items = []
        items = self.rolesMenuList.map(item => {
          return item.id
        })
        let vals = []
        for (var i = 0; i < self.rolesMenuList.length; i++) {
          if (self.rolesMenuList[i].childrens.length > 0) {
            for (var j = 0; j < self.rolesMenuList[i].childrens.length; j++) {
                vals.push(self.rolesMenuList[i].childrens[j])
            }
          }
        }
        vals = vals.map(item => {
          return item.id
        })
        let Arr = items.concat(vals)
        self.menusId = self.checkAll ? Arr : []
    },
    CheckChange () {
      const self = this
      if (self.checkAll === true) {
        self.checkAll = self.menusId.length === self.rolesMenuList.length
      }
    },
    // 获取系统角色的菜单列表
    getSysRoleMenus (id) {
      const self = this
      let data = {
        roleId: id
      }
      self.rolesMenuList = []
      self.currentMenus = []
      api.getSysRoleMenus(data).then((res) => {
        if (res.data.code === '0' && res.data.data.length > 0) {
          self.rolesMenuList = res.data.data
          let Arr = []
          // 获取系统角色当前拥有的菜单权限id, 保存到数组
          for (let i = 0; i < self.rolesMenuList.length; i++) {
            if (self.rolesMenuList[i].havePermission === true) {
              Arr.push(self.rolesMenuList[i])
            }
          }
          for (let j = 0; j < Arr.length; j++) {
            if (Arr[j].childrens.length > 0) {
              for (let k = 0; k < Arr[j].childrens.length; k++) {
                self.currentMenus.push(Arr[j].childrens[k].id)
              }
            }
            self.currentMenus.push(Arr[j].id);
          }
          // console.log('self.currentMenus', self.currentMenus);
        } else if (res.data.data.length === 0) {
          return
        } else if (res.data.code === '1001') {
          $('.setSysMenus').attr('disabled',"true");
          alert(res.data.message)
          return
        } else {
          alert('获取失败')
          return
        }
      }).catch((err) => {
        console.log(err)
      })
      // }
    },
    // 获取系统请求列表
    toloadData () {
      const app = this
      if (!app.isajax) {
        app.isajax = true
        let data = {
          page: app.page,
          rows: app.limit
        }
        api.getAllSysRequest(data).then((res) => {
          if (res.data.code === '0' && res.data.data.length > 0) {
            app.data = res.data
          } else if (res.data.code === '1001') {
            alert(res.data.message)
            return
          } else {
            alert('获取失败')
            return
          }
          app.isajax = false
        }).catch((err) => {
          console.log(err)
          app.isajax = false
          return
        })
      } else {
        alert('请稍后...')
      }
    },
    loadCurrentPage2(page) {
      const app = this
      if (page > app.data.pages || page === app.page) {
        return
      } else {
        app.page = page
        app.toloadData(page)
      }
    },
    searchAllRequest () {
      const self = this
      let data = {
        rows: self.limit,
        page: self.page
      }
      api.getAllSysRequest(data).then((res) => {
        if (res.data.code === '0' && res.data.data.length > 0) {
          self.data = res.data
          // console.log('self.data>>>>>>>>>>',  self.data)
        } else if (res.data.code === '1001') {
          alert(res.data.message)
          return
        } else {
          alert('获取失败')
          return
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    setSysRolesRequest() {
      const self = this
      if (!self.rolesId || self.selectedId.length === 0) {
        alert('请勾选选项!')
      } else {
        // console.log('self.selectedId>>>>', self.selectedId)
        self.selectedId = self.selectedId.toString()
        let data = {
          roleId: self.rolesId,
          requests: self.selectedId
        }
        api.setSysRoleRequest(data).then((res) => {
          if (res.data.code === '0') {
            alert('添加成功!')
          } else if (res.data.code === '20007') {
            alert('系统请求不存在')
          } else if (res.data.code === '1001') {
            alert(res.data.message)
          } else {
            alert('添加失败')
          }
            self.selectedId = []
            self.rolesId = null
            return
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    getRolesRequest(roleId) {
      const self = this
      let data = {
        roleId: roleId
      }
      api.getRolesRequest(data).then((res) => {
        self.rolesRequestList = []
        if (res.data.code === '0' && res.data.data.length > 0) {
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i] == null) {
              // 删除数组null元素
              ClearNullArr(res.data.data)
              // console.log('res.data.data', res.data.data)
              alert('暂无数据')
              return
            }
          }
          self.rolesRequestList = res.data.data
          // console.log('self.rolesRequestList', self.rolesRequestList)
        } else if (res.data.code === '1001') {
          alert(res.data.message)
          // 无权限状态下禁用button
           $('.getRolesAdmin').attr('disabled',"true");
          return
        } else {
          // alert('获取失败')
          return
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 添加系统角色
    addSysRoles() {
      const self = this
      let data = {
        name: self.roleName,
        desc: self.roleDesc
      }
      if (!self.roleName && !self.roleDesc) {
        alert('请填写完整!')
        return
      }
      api.addSysRole(data).then((res) => {
        // console.log(res)
        if (res.data.code === '0') {
          alert('添加成功!')
        } else if (res.data.code === '1001') {
          alert(res.data.message)
        } else {
          alert('添加失败')
        }
          self.roleName = ''
          self.roleDesc = ''
          return
      }).catch((err) => {
        console.log(err)
      })
    },

    // 删除系统角色
    deleteSysRole(id, index) {
        const self = this
        let request = confirm('确认要删除吗?')
        if (request) {
          let data = {
            id: id
          }
          api.deleteSysRole(data).then((res) => {
            if (res.data.code === '20005') {
              alert(res.data.message)
              return false
            } else if (res.data.code === '0') {
              alert('删除成功!')
              return
            } else if (res.data.code === '1001') {
              $('.deleteButton').attr('disabled',"true");
              alert(res.data.message)
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

    // 修改系统角色
    updateSysRole () {
      const self = this
      let data = {
        id: self.rolesId,
        name: self.updateName,
        desc: self.updateDesc
      }
      if (!self.rolesId) {
        alert('请勾选要修改的对象!')
        return
      }
      if (!self.updateName || !self.updateDesc) {
        alert('请填写完整!')
        return
      }
      api.updateSysRole(data).then((res) => {
        // console.log(res)
        if (res.data.code === '0') {
          alert('修改成功!')
        } else if (res.data.code === '1001') {
          alert(res.data.message)
        } else {
          alert('修改失败')

        }
          self.rolesId = null
          self.updateName = ''
          self.updateDesc = ''
          return
      }).catch((err) => {
        console.log(err)
      })
    },
    setSysRoleMenu() {
      const self = this
      if (self.menusId.length === 0 || self.rolesId == null) {
        alert('请勾选操作选项!')
        return
      }
      // 合并勾选的菜单数组和当前拥有的菜单数组
      let menusArr = self.menusId.concat(self.currentMenus)
      menusArr = menusArr.toString()
      // console.log('menusArr', menusArr)
      let data = {
        menus: menusArr,
        roleId: self.rolesId
      }
      api.setSysRoleMenu(data).then((res) => {
        if (res.data.code === '0') {
          alert('设置成功!')
        } else if (res.data.code === '1001') {
          alert(res.data.message)
        } else {
          alert('设置失败')
        }
          self.rolesId = null
          self.menusId = []
          self.currentMenus = []
          return
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
.panel-heading {
  padding: 5px 10px;
}

.panel-body {
  padding: 8px;
}

.modal-backdrop {
  filter: alpha(opacity=0) !important;
  opacity: 0 !important;
}
</style>
