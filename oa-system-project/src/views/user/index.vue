<template>
  <div class="user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" size="mini">新增</el-button>
        <el-button type="danger" size="mini">批量删除</el-button>
      </div>

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        size="mini"
        >
        <el-table-column type="selection" width="55"></el-table-column>
        <!--<el-table-column v-for="(item,index) in columns" :key="index"  :label="item.label" :prop="item.prop"></el-table-column>-->
        <el-table-column v-for="(item,index) in columns" :key="index" v-bind="item"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @current-change="handleCurrentChange" :page-size="pageSize" :current-page="pageNum" background layout="prev, pager, next" :total="total"></el-pagination>
    </el-card>
  </div>
</template>

<script>
import UserModel from "../../api/user"
export default {
  name: "index",
  data(){
    return {
      tableData : [],
      pageNum : 1,
      pageSize : 5,
      state : 0,
      total : 0,
      columns : [
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
        pageNum : this.pageNum,
        pageSize : this.pageSize,
        state : this.state
      }
      const {list,page} = await UserModel.userList(obj)
      this.tableData = list
      this.total = page.total
    },
    handleCurrentChange(val){
      this.pageNum = val
      this.initList()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card{
  ::v-deep .el-card__body{
    padding : 10px !important;
  }
}

.el-pagination{
  text-align: right;
  padding-top:10px;
}
</style>
