<template>
  <el-dialog :title="dialogColumns.title" :visible.sync="dialogColumns.dialogFormVisible">
    <el-form :rules="dialogColumns.rules" :model="value" v-bind="dialogColumns">
      <template v-for="(item,index) in dialogColumns.columns">
        <el-form-item v-if="item.type === 'text'" v-bind="item">
          <el-input v-model="value[item.prop]" v-bind="item"></el-input>
        </el-form-item>
        <el-form-item v-else-if="item.type === 'email' " v-bind="item">
          <el-input v-model="value[item.prop]" v-bind="item">
            <template slot="append">@usian.com</template>
          </el-input>
        </el-form-item>
        <el-form-item v-bind="item" v-else-if="item.type === 'select'">
          <el-select v-model="value[item.prop]" v-bind="item">
            <el-option v-for="(item,index) in item.options" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-bind="item" v-else-if="item.type === 'cascader'">
          <el-cascader v-model="value[item.prop]" :options="item.options" :props="{ checkStrictly: true , value : '_id', label : 'deptName'}" clearable></el-cascader>
        </el-form-item>
      </template>


    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleReset">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "DiaLog",
  props : {
    value : {
      type : Object,
      default : {}
    },
    dialogColumns : {
      type : Object,
      default : {}
    },
    resetDialogForm : Function
  },
  methods : {
    handleSubmit(){
      if(this.value.userId){
        this.$emit("handleSubmit","edit")
      }else{
        this.$emit("handleSubmit","add")
      }
    },
    handleReset(){
      this.resetDialogForm()
    }
  }
}
</script>

<style scoped>

</style>
