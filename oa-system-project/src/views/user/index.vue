<template>
  <div class="user">
    <QueryForm v-model="form" :formColumns="formColumns" @handleSearch="searchForm" @handleReset="resetForm"></QueryForm>

    <el-card class="box-card">
      <BaseTable @handleSelectionChange="handleSelectionChange" @handleEdit="handleEdit" @handleDelete="handleDelete" @handleCurrentChange="handleCurrentChange" :columns="columns" :tableData="tableData" :pager="pager">
        <div slot="action" class="clearfix">
          <el-button type="primary" size="mini">新增</el-button>
          <el-button type="danger" size="mini" @click="handleDelete">批量删除</el-button>
        </div>
      </BaseTable>
    </el-card>
  </div>
</template>

<script>
import UserModel from "../../api/user"
import BaseTable from "../../components/common/BaseTable"
import QueryForm from "../../components/common/QueryForm"
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
      ],
      form : {
        userId : "",
        userName : "",
        state : 0,
      },
      formColumns : {
        ref : "form",
        inline : true,
        size : "mini",
        columns : [
          {
            label : "用户ID",
            placeholder : "请输入用户id",
            type : "text",
            prop : "userId"
          },
          {
            label : "用户名称",
            placeholder : "请输入用户名称",
            type : "text",
            prop : "userName"
          },
          {
            label : "状态",
            type : "select",
            prop : "state"
          }
        ]
      },
      checkIds : []
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
        ...this.form
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
    async handleDelete(row){
      this.$confirm('确认删除此用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.checkIds.push(row.userId)
        const response = await UserModel.deleteUser({userIds : this.checkIds})
        this.initList()
        this.checkIds = []
        this.$message({type: 'success', message: '删除成功!'});
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    handleSelectionChange(row){
      this.checkIds = row.map((item,index)=>item.userId)
    },
    searchForm(){
      this.pager.pageNum = 1
      this.initList()
    },
    resetForm(){
      this.pager.pageNum = 1
      this.initList()
      // this.$refs[this.formColumns.ref].resetFields();
    }
  },
  components : {
    BaseTable,
    QueryForm
  }
}
</script>

<style lang="scss" scoped>
.el-card{
  margin-top:20px;
  ::v-deep .el-card__body{
    padding : 10px !important;
  }
}
</style>
