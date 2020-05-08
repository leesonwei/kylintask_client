<template>
  <el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="kylin"><img class="kylin_logo" src="../../assets/kylin_logo.png"></el-menu-item>
  <el-menu-item index="project">Projects</el-menu-item>
  <el-menu-item index="task">Tasks</el-menu-item>
  <el-menu-item index="job">Jobs</el-menu-item>
  <el-menu-item index="log">Logs</el-menu-item>
  <el-menu-item style="float:right" index="logout" @click="logout">logout</el-menu-item>
</el-menu>
</template>

<script>
export default {
  created: function () {

  },
  data () {
    return {
      activeIndex: 'project'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === null || key === undefined || key === '') {
        return
      }
      this.$router.push('/kylin/' + key)
    },
    logout () {
      let _this = this
      this.$http
        .post('/user/logout', _this.user)
        .then(function (response) {
          _this.$store.state.global.token = response.headers['Authorization']
          _this.$router.push('/login')
        })
        .catch(function (error) {
          _this.$store.state.global.token = ''
          _this.$router.push('/login')
          _this.$message.error(error)
        })
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
