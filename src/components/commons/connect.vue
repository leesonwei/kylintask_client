<template>
<el-header>
    <el-row>
      <el-col :span="12">
        <el-form ref="connectForm"
        :rules = rules
        :model="$store.state.connect.kylin" label-width="90px"
        :disabled="connectDisableFn">
          <el-row>
            <el-col :span="7">
              <el-form-item
              label="Protocol" prop = "protocol"
              >
                <el-select size="small" v-model="$store.state.connect.kylin.protocol" :default-first-option="true">
                  <el-option
                    v-for="item in protocols"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item size="small" label="Host" prop = "host"
              >
                <el-input v-model="$store.state.connect.kylin.host"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item size="small" label="Port" prop = "port">
                <el-input v-model.number="$store.state.connect.kylin.port"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item size="small" label="Username" prop = "username">
                <el-input v-model="$store.state.connect.kylin.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item size="small" label="Password" prop = "password">
                <el-input v-model="$store.state.connect.kylin.password" show-password></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-button
          size="small"
          type="primary"
          @click="submitConnectForm"
          v-show="!$store.state.connect.connected"
        >{{ $store.state.connect.connectDisable?'Connecting...':'Connect' }}</el-button>
        <el-button
          size="small"
          type="primary"
          @click="disconnect"
          v-show="$store.state.connect.connected"
        >{{ 'Disconnect' }}</el-button>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  data () {
    return {
      protocols: [
        {
          value: 'http',
          label: 'http'
        },
        {
          value: 'https',
          label: 'https'
        }
      ],
      rules: {
        protocol: [
          { required: true, message: 'protocol is required', trigger: 'blur' }
        ],
        host: [
          { required: true, message: 'host is required', trigger: 'blur' },
          { min: 6, max: 16, message: 'The length ranges from 6 to 16 characters', trigger: 'blur' }
        ],
        port: [
          { required: true, message: 'port is required', trigger: 'blur' }
        ],
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
    connectDisableFn () {
      return this.$store.state.connect.connected ? true : this.$store.state.connect.connectDisable
    }
  },
  methods: {
    submitConnectForm () {
      this.$refs['connectForm'].validate((valid, object) => {
        if (valid) {
          this.connect()
        } else {
          console.log(object)
          return false
        }
      })
    },
    disconnect () {
      var _this = this
      this.$store.state.connect.connectDisable = true
      this.$http
        .get('/kylin/disconnect?clientId=' + _this.$store.state.global.clientId)
        .then(function (response) {
          _this.$message({message: response.data.message, type: 'success'})
          _this.$store.state.connect.connectDisable = false
          _this.$store.state.connect.connected = false
          _this.$store.state.global.clientId = ''
          setTimeout(_this.clearData(), 1000)
        })
        .catch(function (error) {
          _this.$message.error(error)
          _this.$store.state.connect.connectDisable = false
        })
    },
    connect () {
      var _this = this
      this.$store.state.connect.connectDisable = true
      this.$http
        .post('/kylin/connect', _this.$store.state.connect.kylin)
        .then(function (response) {
          _this.$message({message: response.data.message, type: 'success'})
          _this.$store.state.connect.connectDisable = false
          _this.$store.state.connect.connected = true
          _this.$store.state.global.clientId = response.data.data
          setTimeout(_this.getData(), 1000)
        })
        .catch(function (error) {
          _this.$message.error(error)
          _this.$store.state.connect.connectDisable = false
        })
    },
    getData () {
      let path = this.$route.path
      if (path.search('project') !== -1) {
        this.$parent.getProjects()
      }
      if (path.search('task') !== -1) {
        this.$parent.getTasks()
      }
      if (path.search('job') !== -1) {
        this.$parent.getJobLists()
      }
    },
    clearData () {
      this.$parent.clear()
    }
  }
}
</script>

<style>
.el-col {
  margin-bottom: 10px;
  height: 35px;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.width-full .el-select {
  width: 100%;
}
</style>
