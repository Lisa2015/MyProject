<template lang="html">
  <div class="container-fluid">
    <div class="row margin0px">
      <h4>系统用户列表</h4>
    </div>
  <div class="row margin0px">
      <button id="addUsers" type="button" class="btn btn-primary"  data-toggle="modal" data-target="#myModal"><i class="iconfont icon-tianjiayonghu"></i> 添加系统用户</button>
      <button id="setRoles" style="background:#448aff;border-color:#448aff;" class="btn btn-sm btn-info" data-toggle="modal" data-target="#getUsersRole" @click="getSysRoleByUserId(changeInfoId)"><span class="iconfont icon-shezhi">设置用户角色</span></button>
      <button id="editUsers" type="button" class="btn btn-warning"  data-toggle="modal" data-target="#changeUserinfo" data-whatever="@getbootstrap" name="button" ><i class="iconfont icon-bianji"></i> 编辑用户信息</button>
   <div class="modal fade" id="changeUserinfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
   <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="exampleModalLabel">编辑系统用户信息</h4>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group has-feedback">
            <input type="text" class="form-control"  placeholder="ID" disabled="disabled" :value="changeInfoId">
            <span class=" iconfont icon-ID form-control-feedback" ></span>
          </div>
          <div class="form-group has-feedback">
            <input type="text" class="form-control" autofocus="autofocus"   placeholder="用户名"  v-model="changeInfoName">
            <span class="iconfont icon-zhanghao form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <textarea class="form-control" placeholder="描述" v-model="changeInfoDesc"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary" @click="changeSysUserInfo">完成</button>
      </div>
    </div>
  </div>
</div>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">添加系统用户</h4>
            </div>
            <div class="modal-body">
              <div style="display:none;" id="success" class="form-group has-info">
               <label class="control-label" for="inputSuccess1">手机号码</label>
               <input type="tel" required autofocus="autofocus" :showInput="showInput" class="form-control" v-model.trim="phoneNumber" aria-describedby="helpBlock2">
             </div>
              <div id="error" class="form-group has-error">
             <label class="control-label" for="inputError1">请输入手机号</label>
             <input type="tel" required  :showInput="showInput" class="form-control"  v-model.trim="phoneNumber">
             </div>
              <div class="form-group has-feedback">
                <div style="display:none;" id="success1" class="form-group has-success">
                <label class="control-label" for="inputSuccess2">用户名</label>
                <input type="text" required autofocus="autofocus"  :showInput="showInput2" class="form-control" v-model.trim="userName" aria-describedby="helpBlock2">
             </div>
              <div id="error1" class="form-group has-error">
             <label class="control-label" for="inputError2">请输入用户名</label>
             <input type="text" required :showInput="showInput2" class="form-control"  v-model.trim="userName">
             </div>
              </div>
              <div class="form-group  has-feedback">
                <div style="display:none;" id="success2" class="form-group has-success">
                <label class="control-label" for="inputSuccess3">密码</label>
                <input type="password" required maxlength="10" autofocus="autofocus" :showInput="showInput3" class="form-control" v-model.trim="password" aria-describedby="helpBlock2">
               </div>
              <div id="error2" class="form-group has-error">
               <label class="control-label" for="inputError3">请输入密码</label>
             <input type="password" required  maxlength="10"   :showInput="showInput3" class="form-control"  v-model.trim="password">
             </div>
                <!-- <label class="control-label" v-show="!password">请输入密码</label>
                <input type="password"  class="form-control" v-model.trim ="password" /> -->
              </div>
              <!-- <div class="form-group has-warning has-feedback">
                <label class="control-label" v-show="!confirmPassword">请确认密码</label>
                <input type="password" @change="checkPassword"  class="form-control" v-model.trim="confirmPassword" />
              </div> -->
              <div class="panel panel-default">
                  <div class="panel-heading">
                 <h3 class="panel-title">设置系统角色类型</h3>
                    </div>
                  <div class="panel-body" >
                    <template v-if="rolesList && rolesList.length > 0">
                      <label class="checkbox-inline" v-for="roles in rolesList">
                     <input type="checkbox" id="inlineCheckbox3" v-model="rolesArray" :value="roles.id">{{roles.name}}
                    </label>
                    </template>
                    <span v-else>暂无数据</span>
                  </div>
               </div>
               <div class="row margin0px">
                   <textarea class="form-control" placeholder="描述" v-model="description"></textarea>
               </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" @click="toRegister">提交</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
   </div>
   <!-- 设置角色模态框开始 -->
   <div class="modal fade" id="getUsersRole" tabindex="-1" role="dialog" aria-labelledby="getUsersRoleLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
            &times;
          </button>
          <h4 class="modal-title" id="getUsersRoleLabel">
            系统用户角色
          </h4>
        </div>
        <div class="modal-body clearfix">
          <strong>当前角色:</strong><br>
               <div class="row margin0px">
                  <template v-if = "permissionList.length > 0">
                    <ul  v-for="list in permissionList">
                    <li style="list-style:none;"><input type="checkbox" :value="list.id" @change="handleCheckbox2(list.id,currentRoleId)" :checked="list.id==currentRoleId">{{list.name}}</li>
                    </ul>
                  </template>
                  <span  class="marginTop15" style="display:block;" v-else>暂无数据</span>
             </div>
             <button class="btn btn-sm btn-danger fr" type="button" name="button" style="margin-right:15px;" @click="removeSysUserRole()">移除角色</button>
          <hr style="margin-top:50px;">
          <div class="row margin0px">
            <strong>添加角色:</strong><br>
            <label class="checkbox-inline" v-for="roles in rolesList" style="margin:5px;padding:5px;">
              <input type="checkbox" :value="roles.id"  @change="handleCheckbox(roles.id,rolesArray)" :checked="roles.id==rolesArray">{{roles.name}}
            </label>
             <button class="btn btn-sm btn-success fr" type="button" name="button" @click="setSysUserRole()">添加用户角色</button>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
   </div>
    <!-- 设置角色模态框结束 -->
</div>
    <div class="table-responsive marginTop15">
      <table class="table table-striped">
        <thead>
          <tr class="success">
            <th>id</th>
            <th>账号</th>
            <th>用户名</th>
            <th>上次登录时间</th>
            <th>注册时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="items in data.data">
            <td>{{items.id}}</td>
            <td>{{items.userName}}</td>
            <td>{{items.nickName}}</td>
            <td>{{items.lastLoginTime === null ? '' : items.lastLoginTime  | formatDate}}</td>
            <td>{{items.registerTime | formatDate }}</td>
            <td>{{items.state == 1 ? '已禁用':'正常'}}
              <button  v-show="items.state === 0"  class="btn btn-sm btn-warning disableBtn" @click='changeSysUserState(1, items.id, items.state)' ><i class ="iconfont icon-jinyong">禁用</i></button>
              <button  v-show="items.state === 1"  class="btn btn-sm btn-info ableBtn" @click='changeSysUserState(0, items.id, items.state)'><i class="iconfont icon-qiyong">启用</i></button>
            </td>
            <td><input type="checkbox" :value="items.id"  @change="handleCheckbox3(items.id,changeInfoId)" :checked="items.id==changeInfoId"></td>
          </tr>
        </tbody>
      </table>
      <pagination @pagechange="loadCurrentPage2" :limit='limit' :currentpage="page" :total = 'data.total' :pages = "data.pages"></pagination>
    </div>
  </div>
</template>

<script type="es6">
import "../assets/style/comm.css";
import pagination from "../components/pagination.vue";
import {
  ClearNullArr,
  encryptedPassword,
  isPhone,
  isNullOrEmpty
} from "../lib/validata";
import { formatDate } from "../lib/formDate.js";
import * as api from "../assets/js/api.js";
import { delCookie } from "../lib/cookie.js";
export default {
  components: {
    pagination
  },
  data() {
    return {
      userName: "",
      password: "",
      data: [],
      phoneNumber: "",
      rolesList: [],
      rolesArray: [],
      description: "",
      userIds: [],
      permissionList: [],
      changeInfoId: null,
      changeInfoName: "",
      changeInfoDesc: "",
      currentRoleId: null,
      searchUserId: null,
      // confirmPassword: "",
      page: 1,
      limit: 8
    };
  },
  computed: {
    // 加密密码
    mdpassword() {
      return encryptedPassword(this.password);
    },
    showInput() {
      if (this.phoneNumber.length > 10) {
        $('#success').show()
        $('#error').hide()
      } else {
         $('#error').show()
        $('#success').hide()
      }
    },
    showInput2 () {
      if (this.userName.length > 1) {
        $('#success1').show()
        $('#error1').hide()
      } else {
        $('#success1').hide()
        $('#error1').show()
      }
    },
    showInput3 () {
      if (this.password.length > 2 && this.password.length < 20) {
        $('#success2').show()
        $('#error2').hide()
      } else {
        $('#success2').hide()
        $('#error2').show()
      }
    },
  },
  filters: {
    formatDate(time) {
      if (time === "") {
        return "暂无登录日期";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh : mm");
    }
  },
  created() {
    // 获取所有的角色
    api.getAllSysRole().then(res => {
        const self = this;
        if (res.data.data && res.data.data.length > 0) {
          self.rolesList = Array.from(res.data.data);
          // console.log('self.rolesList', self.rolesList)
        } else if (res.data.code === "1000") {
          alert("登录已失效!请重新登录!");
          delCookie("session");
          self.$router.push("/login");
          return;
        } else if (res.data.code === "1001") {
          alert(res.data.message);
          return;
        }
      }).catch(error => {
        console.log(error);
      });
    setTimeout (() => {
      this.findAllUser();
    }, 200)

  },
  methods: {
    // checkPassword() {
    //   const self = this;
    //   if (self.password !== self.confirmPassword) {
    //     alert("两次输入的密码不一致!");
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
    handleCheckbox(id, currentid) {
      const self = this;
      if (currentid === id) {
        self.rolesArray = null;
      } else {
        self.rolesArray = id;
      }
    },
    handleCheckbox2(id, currentid) {
      const self = this;
      if (currentid === id) {
        self.currentRoleId = null;
      } else {
        self.currentRoleId = id;
      }
    },
    handleCheckbox3(id, currentid) {
      const self = this;
      if (currentid === id) {
        self.changeInfoId = null;
      } else {
        self.changeInfoId = id;
      }
    },
    toloadData() {
      const app = this;
      if (!app.isajax) {
        app.isajax = true;
        let data = {
          page: app.page,
          rows: app.limit
        };
        api.findAllSysUser(data).then(function(res) {
            if (res.data.code === "0" && res.data.data.length > 0) {
              app.data = res.data;
            }
            app.isajax = false;
          })
          .catch(err => {
            app.isajax = false;
          });
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
    toRegister() {
      const self = this;
      if (isNullOrEmpty(self.userName) || isNullOrEmpty(self.password)) {
        alert("请填写用户名和密码!");
        return;
      }
      if (isPhone(self.phoneNumber) === false) {
        alert("手机号码格式有误!");
        return;
      }
      let rolesArr = self.rolesArray.toString();
      // 校验账号是否被注册
      // api.checkUserName(self.phoneNumber).then(res => {
      //     if (res.data.data === false) {
            let data = {
              userName: self.phoneNumber,
              nickName: self.userName,
              password: self.mdpassword,
              roles: rolesArr,
              desc: self.description
            };

            api.register(data).then(res => {
                // console.log(res)
                if (res.data.code === "20011") {
                  alert("用户名已存在~");
                  return;
                } else if (res.data.code === "0") {
                  alert("添加成功!");
                } else if (res.data.code === "1001") {
                  alert(res.data.message);
                  return;
                } else {
                  alert("添加失败");
                }
                  self.phoneNumber = "";
                  self.userName = "";
                  self.password = "";
                  self.rolesArray = [];
                  self.description = "";
                  return;
              }).catch(err => {
                console.log(err);
              });
        //   } else {
        //     alert("该账号已经注册!");
        //     return;
        //   }
        // })
        // .catch(err => {
        //   console.log(err);
        // });
    },
    changeSysUserState(params, userId, status) {
      const self = this;
      if (params === 1 && status === 0) {
        let data = {
          userId: userId,
          state: params
        };
        api.changeSysUserState(data).then(res => {
            if (res.data.code === "0") {
              alert("禁用成功!");
              return;
            } else if (res.data.code === "1001") {
              alert(res.data.message);
              // 无权限状态下禁用button
              $(".disableBtn").attr("disabled", "true");
              return;
            } else {
              alert("禁用失败");
              return;
            }
          }).catch(err => {
            console.log(err);
          });
      } else if (params === 1 && status === 1) {
        alert("该用户已经处于禁用状态!");
        return;
      } else if (params === 0 && status === 1) {
        let data = {
          userId: userId,
          state: params
        };
        api.changeSysUserState(data).then(res => {
            if (res.data.code === "0") {
              alert("启用成功!");
              self.changeState = "0";
              return;
            } else if (res.data.code === "1001") {
              alert(res.data.message);
              // 无权限状态下禁用button
              $(".ableBtn").attr("disabled", "true");
              return;
            } else {
              alert("启用失败");
              return;
            }
          }).catch(err => {
            console.log(err);
          });
      } else {
        alert("该用户处于启用状态!");
        return;
      }
    },
    findAllUser() {
      const self = this;
      let data = {
        page: self.page,
        rows: self.limit
      };
      api.findAllSysUser(data).then(res => {
          if (res.data.code === "0" && res.data.data.length > 0) {
            self.data = res.data;
          } else if (res.data.code === "1001") {
            alert(res.data.message);
            // 无权限状态下禁用button
            $("#addUsers").attr("disabled", "true");
            $("#setRoles").attr("disabled", "true");
            $("#editUsers").attr("disabled", "true");
          } else if (res.data.code === "1000") {
            alert("登录已失效!请重新登录!");
            delCookie("session");
            self.$router.push("/login");
            // console.log(res);
          } else {
            return false;
          }
          return;
        }).catch(err => {
          console.log(err);
        });
    },

    // 获取用户的角色
    getSysRoleByUserId(SysUserId) {
      const self = this;
      if (!self.changeInfoId) {
        alert("请勾选用户选项!");
        return;
      }
      SysUserId = SysUserId.toString();
      //  console.log(SysUserId);
      let data = {
        userId: SysUserId
      };

      api.getSysRoleByUserId(data).then(res => {
          self.permissionList = [];
          if (res.data.code === "0" && res.data.data.length > 0) {
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i] == null) {
                ClearNullArr(res.data.data);
                // console.log('res.data.data', res.data.data)
              }
            }
            self.permissionList = res.data.data;
            SysUserId = null;
            // console.log('permissionList', self.permissionList)
          } else if (res.data.code === "1001") {
            alert(res.data.message);
            return;
          } else {
            alert(" 暂无数据!");
            return;
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    changeSysUserState(params, userId, status) {
      const self = this;
      if (params === 1 && status === 0) {
        let data = {
          userId: userId,
          state: params
        };
        api.changeSysUserState(data).then(res => {
            if (res.data.code === "0") {
              alert("禁用成功!");
            } else if (res.data.code === "1001") {
              alert(res.data.message);
            } else {
              alert("禁用失败");
            }
            return;
          }).catch(err => {
            console.log(err);
          });
      } else if (params === 1 && status === 1) {
        alert("该用户已经处于禁用状态!");
        return;
      } else if (params === 0 && status === 1) {
        let data = {
          userId: userId,
          state: params
        };
        api.changeSysUserState(data).then(res => {
            if (res.data.code === "0") {
              alert("启用成功!");
              return;
            } else if (res.data.code === "1001") {
              alert(res.data.message);
              return;
            } else {
              alert("启用失败");
              return;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("该用户处于启用状态!");
        return;
      }
    },
    changeSysUserInfo() {
      const self = this;
      if (!self.changeInfoId) {
        alert("请勾选要修改的对象!");
        return;
      }
      if (self.changeInfoName == "") {
        alert("请把信息填写完整!");
        return;
      }
      let changeId = self.changeInfoId.toString();
      let data = {
        userId: changeId,
        nickName: self.changeInfoName,
        desc: self.changeInfoDesc
      };
      api.changeSysUserInfo(data).then(res => {
          if (res.data.code === "0") {
            alert("修改成功!");
            self.changeInfoId = null;
            self.changeInfoName = "";
            self.changeInfoDesc = "";
            return;
          } else if (res.data.code === "1001") {
            alert(res.data.message);
            return;
          } else {
            alert("修改失败");
            self.changeInfoId = null;
            self.changeInfoName = "";
            self.changeInfoDesc = "";
            return;
          }
        }).catch(err => {
          console.log(err);
        });
    },

    // 增加系统用户角色
    setSysUserRole() {
      const self = this;
      if (self.rolesArray.length === 0 || !self.changeInfoId) {
        alert("请勾选用户选项!");
        return;
      }
      let setId = self.changeInfoId.toString();
      let setRoleId = self.rolesArray.toString();
      let data = {
        sysUserId: setId,
        sysRoleId: setRoleId
      };
      api.setSysUserRole(data).then(res => {
        if (res.data.code === "0") {
            // console.log(res.data.data)
            alert("添加成功!");
            self.changeInfoId = null;
            self.rolesArray = [];
            return;
          } else if (res.data.code === "1001") {
            alert(res.data.message);
            return;
          } else {
            alert("添加失败");
            return;
          }
        }).catch(err => {
          console.log(err);
        });
    },
    // 移除系统用户角色
    removeSysUserRole() {
      const self = this;
      if (!self.currentRoleId || !self.changeInfoId) {
        alert("请勾选用户选项!");
        return;
      }
      let removeId = self.changeInfoId.toString();
      let removeRoleId = self.currentRoleId.toString();
      let data = {
        sysUserId: removeId,
        sysRoleId: removeRoleId
      };
      api.removeSysUserRole(data).then(res => {
        if (res.data.code === "0") {
          alert("移除成功!");
          self.currentRoleId = null;
          self.changeInfoId = null;
          return;
        } else if (res.data.code === "20006") {
          alert("系统用户角色不存在");
          return;
        } else if (res.data.code === "1001") {
          alert(res.data.message);
          return;
        } else {
          alert("移除失败");
          return;
        }
      });
    }
  }
};
</script>

<style scoped>
.checkbox input[type="checkbox"],
.checkbox-inline input[type="checkbox"],
.radio input[type="radio"],
.radio-inline input[type="radio"] {
  position: static !important;
  margin-left: 0px;
}

.checkbox-inline,
.radio-inline {
  padding: 0px;
  margin-left: 5px;
}
</style>
