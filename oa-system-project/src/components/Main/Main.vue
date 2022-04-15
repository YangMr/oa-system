<template>
  <div class="main">
    <div class="header">
      <div class="header-left">
        <div class="menu-icon">
          <i class="el-icon-s-fold"></i>
        </div>
        <Breadcrumb />
      </div>
      <div class="header-right">
        <div class="tips-icon">
          <el-badge >
            <i class="el-icon-bell"></i>
          </el-badge>
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{$store.state.userInfo.userName || ""}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >{{$store.state.userInfo.userEmail}}</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../common/BreadCrumb"
import storage from "../../utils/storage"
export default {
  name: "Main",
  data(){
    return {

    }
  },
  components : {
    Breadcrumb
  },
  methods : {
    handleCommand(command){
      if(command === "logout"){
        this.handleLogout()
      }
    },
    handleLogout(){
      // 清除vuex token与用户信息
      this.$store.commit("saveUserInfo","")
      // 清除本地的token 与用户信息
      storage.clearItem("userInfo")

      // 跳转到登录页
      this.$router.push("/login")

    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  background-color: #fff;
  border-bottom:1px solid #ddd;
  display: flex;
  height: 50px;
  line-height: 50px;
  justify-content: space-between;
  align-items: center;

  .header-left{
    margin-left: 20px;
    display: flex;
    align-items: center;
    .menu-icon{
      position: relative;
      top : 1px;
    }
    .el-breadcrumb{
      font-size : 12px;
      margin-left: 15px;
    }
  }

  .header-right{
    display: flex;
    align-items: center;
    margin-right : 20px;

    .el-dropdown{
      margin-left : 20px;
    }
  }


}
.view{
  padding : 20px;
  height : calc(100% - 51px);
  box-sizing: border-box;
}
</style>
