<template>
  <el-row :gutter="24">
    <el-col :span="9">&nbsp;</el-col>
    <el-col :span="6">
      <img src="../assets/kylin_logo.png" />
      <el-form status-icon :model="user" :rules="rules" ref="userForm" :disabled="loginingFn">
        <el-form-item prop="username">
          <el-input
            placeholder="please input your name"
            v-model="user.username"
            clearable
          >
            <i slot="suffix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="please input your password"
            v-model="user.password"
            type="password"
            show-password
            clearable
          >
            <i slot="suffix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            style="width:100%"
            type="primary"
            @click="submitUserForm"
            icon="el-icon-switch-button"
            >{{ logining ? 'Login...' : 'Login' }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="9">&nbsp;</el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: 'lizong.wei',
        password: 'Leeson.1985'
      },
      logining: false,
      rules: {
        username: [
          { required: true, message: 'please input your name', trigger: 'blur' },
          { min: 3, max: 24, message: 'The length ranges from 3 to 24 characters', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'please input your password', trigger: 'blur' },
          { min: 6, max: 16, message: 'The length ranges from 6 to 16 characters', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    loginingFn () {
      return this.logining
    }
  },
  methods: {
    submitUserForm () {
      this.$refs['userForm'].validate((valid, object) => {
        if (valid) {
          this.login()
        } else {
          console.log(object)
          return false
        }
      })
    },
    login () {
      let _this = this
      _this.logining = true
      this.$http
        .post('/user/login', _this.user)
        .then(function (response) {
          _this.logining = false
          _this.$store.state.global.token = response.headers['authorization']
          _this.$router.push('/kylin/project')
        })
        .catch(function (error) {
          _this.$message.error(error)
          _this.logining = false
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login .margin {
  margin: 3px 0px;
}
.bg-purple {
  background: transparent;
}
img {
  width: 120px;
  height: 100px;
  margin-top: 100px;
  margin-bottom: 20px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
