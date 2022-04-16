/**
 * @author YangLing
 * @date 2022/4/9 11:42 AM
 */
import request from "../utils/request"

/**
 * 获取所有系统角色列表
 * @returns {AxiosPromise}
 */
const rolesAllList = ()=>{
  return request({url : "/roles/allList",method : "GET"})
}

const roleList = (data)=>{
  return request({url : "/roles/list", method : "GET" , data})
}

const actionRole = (data)=>{
  return request({url : "/roles/operate", method : "POST", data})
}

const settingRole = (data)=>{
  return request({url : "/roles/update/permission", method : "POST", data})
}

export default {
  rolesAllList,
  roleList,
  actionRole,
  settingRole
}
