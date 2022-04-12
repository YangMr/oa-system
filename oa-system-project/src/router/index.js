import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login';

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
      },
      {
        path : "/system/user",
        name : "user",
        component: () => import('../views/user'),
      },
      {
        path : "/system/menu",
        name : "menu",
        component: () => import('../views/menu'),
      },
      {
        path : "/system/role",
        name : "role",
        component: () => import('../views/role'),
      },
      {
        path : "/system/dept",
        name : "dept",
        component: () => import('../views/dept'),
      },
      {
        path : "/audit/leave",
        name : "leave",
        component: () => import('../views/leave'),
      },
      {
        path : "/audit/approve",
        name : "approve",
        component: () => import('../views/approval'),
      },
      // {
      //   path : "/system/test",
      //   name : "test",
      //   component : () => import('../views/test'),
      // }
    ]
  }
];


// router.getRoutes()

// router.addRoute()

const router = new VueRouter({
  routes,
});
const obj = {
    "menuList": [
      {
        "parentId": [
          null
        ],
        "createTime": "2021-04-04T13:23:49.765Z",
        "updateTime": "2021-04-04T13:23:49.765Z",
        "_id": "6069beb8b306e7f18dd72efc",
        "menuType": 1,
        "menuState": 1,
        "menuName": "系统管理",
        "icon": "el-icon-setting",
        "path": "/system",
        "__v": 0,
        "children": [
          {
            "parentId": [
              "6069beb8b306e7f18dd72efc"
            ],
            "createTime": "2021-04-04T13:23:49.765Z",
            "updateTime": "2021-05-16T13:33:43.236Z",
            "_id": "6069bec6b306e7f18dd72efd",
            "menuType": 1,
            "menuState": 1,
            "menuName": "用户管理",
            "path": "/system/user",
            "__v": 0,
            "component": "User",
            "children": [
              {
                "parentId": [
                  "6069beb8b306e7f18dd72efc",
                  "6069bec6b306e7f18dd72efd"
                ],
                "createTime": "2021-05-16T09:34:46.325Z",
                "updateTime": "2021-05-16T09:34:46.325Z",
                "_id": "60a0e80d92ea01921486ecac",
                "menuType": 2,
                "menuState": 1,
                "menuName": "新增",
                "menuCode": "user-create",
                "__v": 0
              },
              {
                "parentId": [
                  "6069beb8b306e7f18dd72efc",
                  "6069bec6b306e7f18dd72efd"
                ],
                "createTime": "2021-05-16T09:34:46.325Z",
                "updateTime": "2021-05-16T09:34:46.325Z",
                "_id": "60a0e82592ea01921486ecae",
                "menuType": 2,
                "menuState": 1,
                "menuName": "删除",
                "menuCode": "user-delete",
                "__v": 0
              }
            ],
            "action": [
              {
                "parentId": [
                  "6069beb8b306e7f18dd72efc",
                  "6069bec6b306e7f18dd72efd"
                ],
                "createTime": "2021-05-16T09:34:46.325Z",
                "updateTime": "2021-05-16T09:34:46.325Z",
                "_id": "60a0e80d92ea01921486ecac",
                "menuType": 2,
                "menuState": 1,
                "menuName": "新增",
                "menuCode": "user-create",
                "__v": 0
              },
              {
                "parentId": [
                  "6069beb8b306e7f18dd72efc",
                  "6069bec6b306e7f18dd72efd"
                ],
                "createTime": "2021-05-16T09:34:46.325Z",
                "updateTime": "2021-05-16T09:34:46.325Z",
                "_id": "60a0e82592ea01921486ecae",
                "menuType": 2,
                "menuState": 1,
                "menuName": "删除",
                "menuCode": "user-delete",
                "__v": 0
              }
            ]
          }
        ]
      }
    ]
}




router.addRoute("layout",{
  path : "/system/test",
  name : "test",
  component : () => import('../views/test'),
})

console.log(router.getRoutes())

export default router;
