/**
 * @author YangLing
 * @date 2022/4/11 2:27 PM
 */
module.exports = {
  publicPath : "./",
  devServer : {
    port : 9998,
    host : "localhost",
    https : false,
    open : true,
    proxy : {
      [process.env.VUE_APP_BASE_API] : {
        target : process.env.VUE_APP_SERVICE_URL,
        changeOrigin : true,
        pathRewrite : {
          ["^" + process.env.VUE_APP_BASE_API] : ""
        }
      }
    }
  },
  lintOnSave : false,
  productionSourceMap : false
}
