<template>
  <el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1"><img class="kylin_logo" src="../../assets/kylin_logo.png"></el-menu-item>
  <el-menu-item index="2"><router-link to="/kylin/task">任务中心</router-link></el-menu-item>
  <el-menu-item index="3"><router-link to="/kylin/log">日志中心</router-link></el-menu-item>
  <el-menu-item style="float:right" index="4">退出</el-menu-item>
</el-menu>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '2'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
.kylin_logo{
  width: 50px;
  height: 40px;
}
</style>
