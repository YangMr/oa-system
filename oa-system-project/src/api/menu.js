/**
 * @author YangLing
 * @date 2022/4/9 11:42 AM
 */

import request from "../utils/request"

const menuList = (data)=>{
  return request({url : "/menu/list", method : "GET", data})
}

const actionMenu = (data)=>{
  return request({url : "/menu/operate", method : "POST", data})
}

export default {
  menuList,
  actionMenu
}
