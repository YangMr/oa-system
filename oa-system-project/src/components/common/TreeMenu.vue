<template>
  <ul>
    <template v-for="(item,index) in menuList">
      <el-submenu v-if="item.children && item.children.length > 0  && item.children[0].menuType === 1" :index="item.path"  :key="item._id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.menuName}}</span>
        </template>
        <TreeMenu :menuList="item.children"></TreeMenu>
      </el-submenu>
      <el-menu-item :index="item.path"  v-else-if="item.menuType === 1">
        {{item.menuName}}
      </el-menu-item>
    </template>
  </ul>
</template>

<script>
export default {
  name: "TreeMenu",
  props : {
    menuList : {
      type : Array,
      default : []
    }
  }
}
</script>

<style scoped>

</style>
