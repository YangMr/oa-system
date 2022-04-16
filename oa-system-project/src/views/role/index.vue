<template>
  <div class="role">
    <QueryForm v-model="form" :formColumns="formColumns" @handleSearch="searchForm" @handleReset="resetForm"></QueryForm>

    <el-card class="box-card">
      <BaseTable @handleAdd="handleAdd" @handleEdit="handleEdit" @handleDelete="handleDelete" @handleCurrentChange="handleCurrentChange" :columns="columns" :pagination="pagination" :pager="pager"  :tableData="tableData">
        <div slot="action" class="clearfix">
          <el-button type="primary" size="mini" @click="openDialog">创建</el-button>
        </div>
      </BaseTable>
    </el-card>

    <DiaLog   @handleSubmit="handleSubmit" v-model="diaLogForm" :dialogColumns="dialogColumns"></DiaLog>

  </div>
</template>

<script>
import RoleModel from "../../api/role"
import MenuModel from "../../api/menu"
import QueryForm from "../../components/common/QueryForm"
import BaseTable from "../../components/common/BaseTable"
import DiaLog from "../../components/common/DiaLog"
export default {
  name: "index",
  data(){
    return {
      diaLogForm : {
        menuType : 1,
        menuState : 1,
        parentId : [null]
      },
      dialogColumns : {
        title : "角色新增",
        dialogFormVisible : false,
        labelWidth : "100px",
        size : "mini",
        columns: [
          {
            label : "角色名称",
            type : "text",
            prop : "roleName",
            placeholder : "请输入角色名称"
          },
          {
            label : "备注",
            type : "textarea",
            prop : "remark",
            placeholder : "请输入备注",
          }
        ]
      },
      form : {},
      formColumns : {
        ref : "form",
        inline : true,
        size : "mini",
        columns : [
          {
            label : "角色名称",
            placeholder : "请输入角色名称",
            type : "text",
            prop : "roleName"
          }
        ]
      },
      columns : [
        {
          label : "角色名称",
          prop : "roleName"
        },
        {
          label : "备注",
          prop : "remark"
        },
        {
          label : "权限列表",
          prop : "permissionList",
          formatter : (row, column, value)=>{
            let names = []
            const list = value.halfCheckedKeys || []
            list.map(item=>{
              let name = this.actionMap[item]
              if(item && name) names.push(name)
            })
            return names.join(",")
          }
        },
        {
          label : "更新时间",
          prop : "updateTime",
          formatter : (row, column, value, index)=>{
            return this.dayjs(value).format("YYYY-MM-DD HH:mm:ss")
          }
        },
        {
          label : "创建时间",
          prop : "createTime",
          formatter : (row, column, value, index)=>{
            return this.dayjs(value).format("YYYY-MM-DD HH:mm:ss")
          }
        },
        {
          type : "action",
          label : "操作",
          width : "280",
          list : [
            {
              text : "编辑",
              size : "mini",
              type : "default",
              action : "edit"
            },
            {
              text : "设置权限",
              size : "mini",
              type : "primary",
              action : "setting"
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
      pagination : true,
      pager : {
        pageSize : 5,
        pageNum : 1,
        total : 0
      },
      tableData : [],
      actionMap : {}
    }
  },
  created() {
    this.initList()
    this.initMenuList()
  },
  methods : {
    async initList(){
      const data = {...this.pager, ...this.form}
      const response = await RoleModel.roleList(data)
      this.tableData = response.list
      this.pager.total = response.page.total
    },
    searchForm(){
      this.pager.pageNum = 1
      this.initList()
    },
    resetForm(){
      this.pager.pageNum = 1
      this.initList()
    },
    handleAdd(){},
    handleEdit(){},
    async handleDelete(row){
      const data = {action : "delete", _id : row._id}
      const response = await RoleModel.actionRole(data)
      this.$message.success("删除成功")
      this.initList()
    },
    handleCurrentChange(row){
      this.pager.pageNum = row
      this.initList()
    },
    openDialog(){
      this.dialogColumns.dialogFormVisible = true
    },
    async initMenuList(){
      const response = await MenuModel.menuList()
      this.getActionMap(response)
    },
    getActionMap(list){
      let actionMap = {}
      const deep = (arr)=>{
        while (arr.length){
          let item = arr.pop()
          if(item.children && item.action){
            actionMap[item._id] = item.menuName
          }
          if(item.children && !item.action){
            deep(item.children)
          }
        }
      }
      deep(list)
      this.actionMap = actionMap
    },
    handleSubmit(){}
  },
  components : {
    QueryForm,
    BaseTable,
    DiaLog
  }
}
</script>

<style lang="scss" scoped>
.el-card{
  margin-top : 20px;
}
</style>
