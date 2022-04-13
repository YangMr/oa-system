<template>
  <div class="wrapper">
    <div class="content">
      <div class="sub-title">欢迎体验</div>
      <div class="title">火星通用后台管理系统</div>
      <div class="desc">
        - Vue2.0+ElementUI+Node+Mongo打造通用后台管理系统
      </div>
    </div>
    <div class="img"></div>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style lang="scss" scoped>
.wrapper{
  background-color: #fff;
  height : 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    position: relative;
    bottom: 40px;
    .sub-title {
      font-size: 30px;
      line-height: 42px;
      color: #333;
    }
    .title {
      font-size: 40px;
      line-height: 62px;
      color: #409eff;
    }
    .desc {
      text-align: right;
      font-size: 14px;
      color: #999;
    }
  }

  .img {
    margin-left: 105px;
    background-image: url("../../assets/images/welcome.png");
    width: 371px;
    height: 438px;
  }
}
</style>
