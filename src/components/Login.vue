<template>
<div style="margin-top:60px">
  <img src="../assets/kylin_logo.png">
  <div class="login">
      <el-row :gutter="24" class="margin">
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="8"><el-input placeholder="请输入用户名" v-model="user.username" clearable >
        <i slot="suffix" class="el-input__icon el-icon-user"></i>
      </el-input> </el-col>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  <el-row :gutter="24" class="margin">
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="8"><el-input placeholder="请输入密码" v-model="user.password" show-password clearable>
        <i slot="suffix" class="el-input__icon el-icon-lock"></i>
      </el-input></el-col>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  <el-row :gutter="24" class="margin">
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="8"><el-button style="width:100%" type="primary" @click="login" icon="el-icon-switch-button">Login</el-button></el-col>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  </div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      console.log(this.user)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  margin: 0 auto;
}
.login .margin{
  margin: 3px 0px;
}
.bg-purple {
    background: transparent;
}
img {
  width: 120px;
  height: 100px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
