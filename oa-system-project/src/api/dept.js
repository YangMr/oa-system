/**
 * @author YangLing
 * @date 2022/4/9 11:42 AM
 */

import request from "../utils/request"

/**
 * 获取部门列表接口
 * @returns {AxiosPromise}
 */
const deptList = ()=>{
  return request({url : "/dept/list", method : "GET"})
}

export default {
  deptList
}
