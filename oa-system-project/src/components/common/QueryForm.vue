<template>
  <div class="query-from">
    <el-form v-bind="formColumns" :model="value">
      <template v-for="(item,index) in formColumns.columns">
        <el-form-item v-if="item.type === 'text'" v-bind="item" >
          <el-input v-model="value[item.prop]" v-bind="item"></el-input>
        </el-form-item>
        <el-form-item v-else-if="item.type === 'select'" v-bind="item">
          <el-select v-model="value[item.prop]">
            <el-option v-for="(item,index) in item.options" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="searchForm">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "QueryForm",
  props : {
    value : {
      type : Object,
      default : {}
    },
    formColumns : {
      type : Object,
      default : {}
    }
  },
  data(){
    return {

    }
  },
  methods : {
    searchForm(){
      this.$emit("handleSearch")
    },
    resetForm(){
      this.$refs[this.formColumns.ref].resetFields()
      this.$emit("handleReset")
    }
  }
}
</script>

<style scoped>

</style>
