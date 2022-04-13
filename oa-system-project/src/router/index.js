import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login';
import utils from "../utils/utils"
import UserModel from "../api/user"
Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta : {
      title : "登录"
    }
  },
  {
    path: '/',
    name: 'layout',
    redirect : "/welcome",
    component: () => import('../components/Layout'),
    meta : {
      title : "首页"
    },
    children : [
      {
        path : "welcome",
        name : "welcome",
        component: () => import('../views/welcome'),
        meta : {
          title : "欢迎体验Vue2全栈课程"
        }
      },
      // {
      //   path : "/system/user",
      //   name : "user",
      //   component: () => import('../views/user'),
      // },
      // {
      //   path : "/system/menu",
      //   name : "menu",
      //   component: () => import('../views/menu'),
      // },
      // {
      //   path : "/system/role",
      //   name : "role",
      //   component: () => import('../views/role'),
      // },
      // {
      //   path : "/system/dept",
      //   name : "dept",
      //   component: () => import('../views/dept'),
      // },
      // {
      //   path : "/audit/leave",
      //   name : "leave",
      //   component: () => import('../views/leave'),
      // },
      // {
      //   path : "/audit/approve",
      //   name : "approve",
      //   component: () => import('../views/approve'),
      // },
      // {
      //   path : "/system/test",
      //   name : "test",
      //   component : () => import('../views/test'),
      // }
    ]
  }
];

const router = new VueRouter({
  routes,
});


export default router;
