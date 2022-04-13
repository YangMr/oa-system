/**
 * @author YangLing
 * @date 2022/4/12 2:53 PM
 */

/**
 * 将menu菜单的数据处理成路由表所需要的数据
 * @param menuList
 * @returns {*[]}
 */
function generateRoute(menuList){
  // 保存的过滤后的路由表数据
  let routes = []

  // 将菜单数据过滤路由表的方法，同时这个也是一个递归方法
  function deepList(list){
    // 菜单数据 [1,2]
    while(list.length){
      let item = list.pop()
      if(item.action){
          routes.push({
            path : item.path,
            meta : {
              title : item.menuName
            },
            name : item.component,
            component : item.component
          })
      }
      if(item.children && !item.action){
        deepList(item.children)
      }
    }
  }
  deepList(menuList)

  // 将过滤后的路由返回给generateRoute这个函数
  return routes
}

export default {
  generateRoute
}
