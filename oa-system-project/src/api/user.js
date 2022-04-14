/**
 * @author YangLing
 * @date 2022/4/9 11:42 AM
 */

import request from "../utils/request"

/**
 * 登录接口
 * @param data
 * @returns {AxiosPromise}
 */
const login = (data)=>{
  return request({url : "/users/login", method : "POST", data})
}

/**
 * 用户权限列表接口
 * @returns {AxiosPromise}
 */
const getPermissionList = ()=>{
  return request({url : "/users/getPermissionList",method : "GET",})
}

/**
 * 用户列表接口
 * @param data
 * @returns {AxiosPromise}
 */
const userList = (data)=>{
  return request({url : "/users/list", method : "GET",  data})
}

/**
 * 删除用户与批量删除用户接口
 * @param data  array
 * @returns {AxiosPromise}
 */
const deleteUser = (data)=>{
  return request({url : "/users/delete", method : "POST",  data})
}

/**
 * 新增用户与编辑用户接口
 * @param data
 * @returns {AxiosPromise}
 */
const actionUser = (data)=>{
  return request({url : "/users/operate", method : "POST", data})
}

export default {
  login,
  getPermissionList,
  userList,
  deleteUser,
  actionUser
}
