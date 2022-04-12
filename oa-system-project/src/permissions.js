/**
 * @author YangLing
 * @date 2022/4/11 3:10 PM
 */
import router from "./router"
import store from "./store"
import UserModel from "./api/user";
import utils from "./utils/utils";

async function loadRouter(){
  const {menuList} =await UserModel.getPermissionList()
  const routes = utils.generateRoute(menuList)
  routes.forEach((item,index)=>{
    router.addRoute("layout",{
      path : item.path,
      name : item.name.toLowerCase(),
      meta : item.meta,
      component :  () => import(`./views/${item.component.toLowerCase()}`)
    })
  })
}


router.beforeEach(async (to,from,next)=>{
  const token = store.state.userInfo.token
  if(!token){
    if(to.path === "/login"){
      next()
    }else{
      next("/login")
    }
  }else{
    if(to.path === "/login"){
      next(from.path)
    }else{
      await next()
      await loadRouter()
    }
  }

  if(to.meta.title){
    document.title = to.meta.title
  }else{
    document.title = "火星后台管理系统"
  }
})
