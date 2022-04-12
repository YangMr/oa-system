/**
 * @author YangLing
 * @date 2022/4/12 2:53 PM
 */

function generateRoute(menuList){
  let routes = []
  function deepList(list){
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
  return routes
}

export default {
  generateRoute
}
