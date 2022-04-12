/**
 * @author YangLing
 * @date 2022/4/12 9:06 AM
 */

import Vue from "vue"
import store from "../store"

/**
 * 按钮权限自定义指令方法
 */
Vue.directive("has",{
  inserted : function (el,binding){
    // 获取后台返回按钮权限数据
    const data = store.state.actionList
    // 获取当前按钮所绑定的权限
    const value = binding.value
    // 判断当前按钮所绑定的权限是否在后台返回按钮权限数据中
    const hasPermissions = data.includes(value)
    // 如果不存在的话
    if(!hasPermissions){
      // 让按钮隐藏
      el.style.display = "none"
      setTimeout(()=>{
        // 移除按钮
        el.parentNode.removeChild(el)
      },0)
    }
  }
})
