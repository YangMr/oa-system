<template>
  <div class="menu">
    <QueryForm v-model="form" :formColumns="formColumns" @handleSearch="searchForm" @handleReset="resetForm"></QueryForm>

    <el-card class="box-card">
      <BaseTable @handleEdit="handleEdit" @handleDelete="handleDelete" @handleCurrentChange="handleCurrentChange" :columns="columns" :pagination="pagination" :pager="{}" :tree="tree" :tableData="tableData">
        <div slot="action" class="clearfix">
          <el-button type="primary" size="mini" @click="openDialog">新增</el-button>
        </div>
      </BaseTable>
    </el-card>

    <DiaLog :resetDialogForm="resetDialogForm" @handleSubmit="handleSubmit" v-model="diaLogForm" :dialogColumns="dialogColumns"></DiaLog>
  </div>
</template>

<script>
import MenuModel from "../../api/menu"
import QueryForm from "../../components/common/QueryForm"
import BaseTable from "../../components/common/BaseTable"
import DiaLog from "../../components/common/DiaLog"
export default {
  name: "index",
  data(){
    return {
      form : {
        menuName : "",
        menuState : ""
      },
      formColumns : {
        ref : "form",
        inline : true,
        size : "mini",
        columns : [
          {
            label : "菜单名称",
            placeholder : "请输入菜单名称",
            type : "text",
            prop : "menuName"
          },
          {
            label : "菜单状态",
            type : "select",
            prop : "menuState",
            options : [
              {
                value : 1,
                label : "正常"
              },
              {
                value : 0,
                label : "停用"
              }
            ]
          }
        ]
      },
      columns : [
        {
          label : "菜单名称",
          prop : "menuName"
        },
        {
          label : "图标",
          prop : "icon"
        },
        {
          label : "菜单类型",
          prop : "menuType",
          formatter(row, column, value, index){
            return {"1" : "菜单", "2" : "按钮"}[value]
          }
        },
        {
          label : "权限标识",
          prop : "menuCode"
        },
        {
          label : "路由地址",
          prop : "path"
        },
        {
          label : "组件路径",
          prop : "component"
        },
        {
          label : "菜单状态",
          prop : "menuState",
          formatter(row, column, value, index){
            return {"1" : "正常", "0" : "停用"}[value]
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
          width : "220",
          list : [
            {
              text : "新增",
              size : "mini",
              type : "primary",
              action : "add"
            },
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
      tableData : [],
      pagination : false,
      tree : {
        "row_id" : "_id",
        "tree_props" : {children : 'children'}
      },
      diaLogForm : {},
      dialogColumns : {
        title : "菜单新增",
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
            label : "父级菜单",
            type : "cascader",
            prop : "parentId",
            placeholder : "请选择父级菜单",
            options : [],
            params : {value : "_id", label : "menuName"}
          },
          {
            label : "菜单类型",
            type : "radio",
            prop : "menuType",
            options : [
              {value : 1, label : "菜单"},
              {value : 2, label : "按钮"}
            ]
          },
          {
            label : "菜单名称",
            type : "text",
            prop : "menuName",
            placeholder : "请输入菜单名称"
          },
          {
            label : "菜单图标",
            type : "text",
            prop : "icon",
            placeholder : "请输入菜单图标",
          },
          {
            label : "路由地址",
            type : "text",
            prop : "path",
            placeholder : "请输入路由地址"
          },
          {
            label : "组件路径",
            type : "text",
            prop : "component",
            placeholder : "请输入组件路径"
          },
          {
            label : "菜单状态",
            type : "radio",
            prop : "menuType",
            options : [
              {value : 1, label : "正常"},
              {value : 0, label : "停用"}
            ]
          },
        ]
      }
    }
  },
  created() {
    this.initList()

  },
  methods : {
    async initList(){
      const response = await MenuModel.menuList(this.form)
      this.tableData = response
      this.initOptions()
    },
    searchForm(){
      this.initList()
    },
    resetForm(){
      this.initList()
    },
    handleEdit(){},
    async handleDelete(row){
      const data = {action : "delete", _id : row._id}
      const response = await MenuModel.actionMenu(data)
      this.$message.success("删除成功")
      this.initList()
    },
    handleCurrentChange(){},
    openDialog(){
      this.dialogColumns.dialogFormVisible = true
    },
    resetDialogForm(){},
    handleSubmit(){},
    initOptions(){
      this.dialogColumns.columns.forEach(item=>{
        if(item.prop === 'parentId'){
          item.options = this.tableData
        }
      })
    }
  },
  components : {
    QueryForm,
    BaseTable,
    DiaLog
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 20px;
}
</style>
