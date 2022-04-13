<template>
  <div class="user">
    <el-card class="box-card">
      <BaseTable @handleEdit="handleEdit" @handleDelete="handleDelete" @handleCurrentChange="handleCurrentChange" :columns="columns" :tableData="tableData" :pager="pager">
        <div slot="action" class="clearfix">
          <el-button type="primary" size="mini">新增</el-button>
          <el-button type="danger" size="mini">批量删除</el-button>
        </div>
      </BaseTable>
    </el-card>
  </div>
</template>

<script>
import UserModel from "../../api/user"
import BaseTable from "../../components/common/BaseTable"
export default {
  name: "index",
  data(){
    return {
      pager : {
        pageNum : 1,
        pageSize : 5,
        total : 0,
      },
      tableData : [],
      state : 0,
      columns : [
        {
          type : "selection",
          width : "55"
        },
        {
          label : "用户ID",
          prop : "userId",
        },
        {
          label : "用户名",
          prop : "userName"
        },
        {
          label : "用户角色",
          prop : "role",
          formatter(row, column, value, index){
            return {"0" : "管理员", "1" : "普通用户"}[value]
          }
        },
        {
          label : "用户状态",
          prop : "state",
          formatter(row, column, value, index){
            return {"0" : "所有", "1" : "在职", "2" : "离职", "3" : "试用期"}[value]
          }
        },
        {
          label : "注册时间",
          prop : "createTime",
          formatter : (row, column, value, index)=>{
            return this.dayjs(value).format("YYYY-MM-DD HH:mm:ss")
          }
        },
        {
          label : "最后登录时间",
          prop : "lastLoginTime",
          formatter : (row, column, value, index)=>{
            return this.dayjs(value).format("YYYY-MM-DD HH:mm:ss")
          }
        },
        {
          type : "action",
          label : "操作",
          width : "150",
          list : [
            {
              text : "编辑",
              size : "mini",
              type : "default",
              action : "edit"
            },
            {
              text : "删除",
              size : "mini",
              type : "danger",
              action : "delete"
            }
          ]
        }
      ]
    }
  },
  created(){
    this.initList()
  },
  methods : {
    async initList(){
      const obj = {
        pageNum : this.pager.pageNum,
        pageSize : this.pager.pageSize,
        state : this.state
      }
      const {list,page} = await UserModel.userList(obj)
      this.tableData = list
      this.pager.total = page.total
    },
    handleCurrentChange(val){
      this.pager.pageNum = val
      this.initList()
    },
    handleEdit(row){
      console.log("edit=>",row)
    },
    handleDelete(row){
      console.log("delete=>",row)
    }
  },
  components : {
    BaseTable
  }
}
</script>

<style lang="scss" scoped>
.el-card{
  ::v-deep .el-card__body{
    padding : 10px !important;
  }
}
</style>
