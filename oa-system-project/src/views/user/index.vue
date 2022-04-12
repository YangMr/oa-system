<template>
  <div>

    <el-button size="mini" type="primary" v-has="'user-create'">新增</el-button>
    <el-button size="mini"  type="danger" v-has="'user-patch-delete'">批量删除</el-button>
    <el-button size="mini"  v-has="'user-edit'">编辑</el-button>
    <el-button size="mini"  type="danger" v-has="'user-delete'">删除</el-button>
    <el-button size="mini"  type="primary" v-has="'user-query'">查询</el-button>

  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>
