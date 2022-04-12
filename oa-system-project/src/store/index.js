import Vue from 'vue';
import Vuex from 'vuex';
import storage from "../utils/storage"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo : storage.getItem("userInfo") || "",
    menuList : storage.getItem("menuList") || [],
    actionList : storage.getItem("actionList") || [],
  },
  mutations: {
    saveUserInfo(state,userInfo){
      state.userInfo = userInfo
      storage.setItem("userInfo",userInfo)
    },
    saveMenuList(state,menuList){
      state.menuList = menuList
      storage.setItem("menuList",menuList)
    },
    saveActionList(state,actionList){
      state.actionList = actionList
      storage.setItem("actionList",actionList)
    }
  },
  actions: {

  },
  modules: {
  },
});
