<template>
  <div class="nav-side">
    <div class="nav-side-title">
      <div class="logo">
        <img src="../../assets/logo.png" width="32" alt="logo">
      </div>
      <div class="text">Manager</div>
    </div>

    <el-menu
      :default-active="$route.path"
      background-color="#001529"
      text-color="#fff"
      router
      active-text-color="#ffd04b">

        <tree-menu :menuList="menuList"></tree-menu>

    </el-menu>
  </div>
</template>

<script>
import TreeMenu from "../common/TreeMenu"
import UserModel from "../../api/user"
export default{
  name: "NavSide",
  data(){
    return {

    }
  },
  computed : {
    menuList(){
      return this.$store.state.menuList || []
    }
  },
  components : {
    TreeMenu
  },
  created(){
    this.getMenuList()
  },
  methods : {
    async getMenuList(){
      const {menuList,actionList} = await UserModel.getPermissionList()
      this.$store.commit("saveMenuList",menuList)
      this.$store.commit("saveActionList",actionList)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-side {

  .nav-side-title{
    height : 50px;
    display: flex;
    align-items: center;

    .logo{
      margin : 0 16px;
    }

    .text{
      color : #fff;
      font-size : 18px;
    }
  }

  .el-menu{
    border-right : none;
  }
}
</style>
