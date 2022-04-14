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

export default {
  rolesAllList
}
