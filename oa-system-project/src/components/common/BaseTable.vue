<template>
  <div class="base-table">
    <div class="action">
      <slot name="action"></slot>
    </div>

    <el-table
      ref="multipleTable"
      :row-key="tree.row_id"
      :tree-props = "tree.tree_props"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      @selection-change="handleSelectionChange"
    >

      <!--<el-table-column v-for="(item,index) in columns" :key="index"  :label="item.label" :prop="item.prop"></el-table-column>-->
      <template v-for="(item,index) in columns">
        <el-table-column v-if="item.type && item.type=== 'selection'" v-bind="item"></el-table-column>
        <el-table-column v-else-if="!item.type" v-bind="item"></el-table-column>
        <el-table-column v-else-if="item.type === 'action'" v-bind="item">
          <template slot-scope="scope">
            <el-button v-for="(item,index) in item.list" :key="index" v-bind="item" @click="handleAction(scope.row,item.action)">{{item.text}}</el-button>
<!--            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </template>
    </el-table>

    <el-pagination v-if="pagination" @current-change="handleCurrentChange" :page-size="pager.pageSize" :current-page="pager.pageNum" background layout="prev, pager, next" :total="pager.total"></el-pagination>

  </div>
</template>

<script>
export default {
  name: "BaseTable",
  props : {
    tree : {
      type : Object,
      default : ()=>{
        return {}
      }
    },
    columns : {
      type : Array,
      default : ()=>{
        return []
      }
    },
    tableData : {
      type : Array,
      default : ()=>{
        return []
      }
    },
    pager : {
      type : Object,
      default :  ()=>{
        return {}
      }
    },
    pagination : Boolean
  },
  methods : {
    handleCurrentChange(val){
      this.$emit("handleCurrentChange",val)
    },
    handleAction(row,action){
      if(action === "edit"){
        this.$emit("handleEdit",row)
      }else if(action === "role"){
        this.$emit("handleRoLe",row)
      }else if(action === 'delete'){
        this.$emit("handleDelete",row)
      }else if(action === 'add'){
        this.$emit("handleAdd",row)
      }else if(action === 'setting'){
        this.$emit("handleSetting",row)
      }
    },
    handleSelectionChange(row){
      this.$emit("handleSelectionChange",row)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table{
  ::v-deep .el-checkbox:nth-child(1){
    position: relative !important;
    left : 4px !important;
  }
}
.el-pagination{
  text-align: right;
  padding-top:10px;
}
.action{
  background-color: #fff;
  /*padding-bottom : 20px;*/
  /*padding-top : 10px;*/
  padding : 10px 0 20px 20px;
  border-bottom:1px solid #ddd;
}
</style>
