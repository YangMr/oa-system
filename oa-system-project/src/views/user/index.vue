<template>
  <div class="user">
    <QueryForm v-model="form" :formColumns="formColumns" @handleSearch="searchForm" @handleReset="resetForm"></QueryForm>

    <el-card class="box-card">
      <BaseTable @handleSelectionChange="handleSelectionChange" @handleEdit="handleEdit" @handleDelete="handleDelete" @handleCurrentChange="handleCurrentChange" :columns="columns" :tableData="tableData" :pager="pager">
        <div slot="action" class="clearfix">
          <el-button type="primary" size="mini" @click="openDialog">新增</el-button>
          <el-button type="danger" size="mini" @click="handleDelete">批量删除</el-button>
        </div>
      </BaseTable>
    </el-card>

    <DiaLog :resetDialogForm="resetDialogForm" @handleSubmit="handleSubmit" v-model="diaLogForm" :dialogColumns="dialogColumns"></DiaLog>
  </div>
</template>

<script>
import UserModel from "../../api/user"
import RoleModel from "../../api/role"
import DeptModel from "../../api/dept"
import BaseTable from "../../components/common/BaseTable"
import QueryForm from "../../components/common/QueryForm"
import DiaLog from "../../components/common/DiaLog"
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
      checkIds : [],
      dialogColumns : {
        title : "用户新增",
        dialogFormVisible : false,
        labelWidth : "100px",
        size : "mini",
        rules : {
          userName : [{required : true, message : "请输入用户名称", trigger : "blur"}],
          userEmail : [{required : true, message : "请输入用户邮箱", trigger : "blur"}],
          deptId : [{required : true, message : "请选择部门", trigger : "change"}],
        },
        columns: [
          {
            label : "用户名",
            type : "text",
            prop : "userName",
            placeholder : "请输入用户名称"
          },
          {
            label : "邮箱",
            type : "email",
            prop : "userEmail",
            placeholder : "请输入用户邮箱",
          },
          {
            label : "手机号",
            type : "text",
            prop : "mobile",
            placeholder : "请输入手机号"
          },
          {
            label : "岗位",
            type : "text",
            prop : "job",
            placeholder : "请输入岗位"
          },
          {
            label : "状态",
            type : "select",
            prop : "state",
            placeholder : "请选择状态",
            options : [
              {value : 1, label : "在职"},
              {value : 2, label : "离职"},
              {value : 3, label : "试用期"}
            ]
          },
          {
            label : "系统角色",
            type : "select",
            prop : "roleList",
            placeholder : "请选择系统角色",
            options : []
          },
          {
            label : "部门",
            type : "cascader",
            prop : "deptId",
            placeholder : "请选择部门",
            options : []
          }
        ]
      },
      diaLogForm : {},
      dialogStatus : false
    }
  },
  created(){
    this.initList()
  },
  watch : {
    dialogStatus : {
      handler(newValue,oldValue){
        if(newValue){
          this.initRolesAllList()
          this.initDeptList()
        }
      }
    }
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
      this.dialogColumns.title = "用户编辑"
      this.diaLogForm = {
        userName : row.userName,
        userEmail : row.userEmail,
        mobile : row.mobile,
        job : row.job,
        state : row.state,
        roleList : row.roleList[0],
        deptId : row.deptId,
        userId : row.userId
      }
      this.openDialog()
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

    },
    async initRolesAllList(){
      const response = await RoleModel.rolesAllList()
      this.dialogColumns.columns.forEach(item=>{
        if(item.prop === 'roleList'){
          item.options = response.map(item=>{
            return {
              value : item._id,
              label : item.roleName
            }
          })
        }
      })
    },
    async initDeptList(){
      const response = await DeptModel.deptList()
      this.dialogColumns.columns.forEach(item=>{
        if(item.prop === 'deptId'){
          console.log("===>",item)
          item.options = response
        }
      })
      console.log("==>",this.dialogColumns.columns)
    },
    openDialog(){
      this.dialogColumns.dialogFormVisible = true
      this.dialogStatus = true
    },
    async handleSubmit(value){
      if(value === 'add'){
        this.diaLogForm.action = 'add'
        const response = await UserModel.actionUser(this.diaLogForm)
        this.dialogColumns.dialogFormVisible = false
        this.initList()
      }else if(value === 'edit'){
        this.diaLogForm.action = 'edit'
        const response = await UserModel.actionUser(this.diaLogForm)
        this.dialogColumns.dialogFormVisible = false
        this.initList()
      }
      this.resetDialogForm()
    },
    resetDialogForm(){
      this.dialogColumns.dialogFormVisible = false
      this.diaLogForm = {
        userName : "",
        userEmail : "",
        mobile : "",
        job :"",
        state :"",
        roleList : "",
        deptId : "",
        userId : ""
      }
    }
  },
  components : {
    BaseTable,
    QueryForm,
    DiaLog
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
