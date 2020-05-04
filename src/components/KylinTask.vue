<template>
  <div>
    <el-form style="margin-buttom:20px;" ref="form" :model="kylin" label-width="120px">
      <el-row>
        <el-col :span="4">
          <el-form-item label="protocol">
            <el-select size="small" v-model="kylin.protocol">
              <el-option
                v-for="item in protocols"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item size="small" label="KYLIN Server">
            <el-input v-model="kylin.host"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item size="small" label="KYLIN Port">
            <el-input v-model="kylin.port"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item size="small" label="KYLIN User">
            <el-input v-model="kylin.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item size="small" label="KYLIN Pass">
            <el-input v-model="kylin.password" show-password></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="text-align:right; padding-left:20px">
          <el-button size="small" type="primary" @click="connect">connect</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-divider></el-divider>
    <el-table :data="projectList" border style="width: 100%">
      <el-table-column prop="uuid" label="UUID" width="220"></el-table-column>
      <el-table-column prop="name" label="NAME" width="220"></el-table-column>
      <el-table-column prop="version" label="VERSION" width="180"></el-table-column>
      <el-table-column prop="description" label="DESCRIPTION"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">Create Task</el-button>
      </template>
    </el-table-column>
    </el-table>
    <CreateTask :createTaskVisiable="createTaskVisiable"></CreateTask>
  </div>
</template>

<script>
import CreateTask from '@/components/commons/createTask'
export default {
  components: { CreateTask },
  computed: {
    createTaskVisiable () {
      return this.$store.state.createTaskVisiable
    }
  },
  data () {
    return {
      visiable: false,
      kylin: {
        protocol: '',
        host: '',
        port: '',
        username: '',
        password: ''
      },
      protocols: [
        {
          value: 'HTTP',
          label: 'HTTP'
        },
        {
          value: 'HTTPS',
          label: 'HTTPS'
        }
      ],
      projectList: [{
        uuid: 'dsafkjhsjk-dsafjkl-097dsaklh',
        name: 'RealTime',
        version: '3.0.0.1',
        description: '實時cube'
      }]
    }
  },
  methods: {
    connect () {
      var _this = this
      console.log(this.kylin)
      this.$http
        .post('/kylinweb/connect', _this.kylin)
        .then(function (response) {
          var result = response.data
          // eslint-disable-next-line eqeqeq
          if (result.status == 0) {
            console.log(result.data)
          } else {
            _this.$message(result.status + ':' + result.msg)
          }
        })
        .catch(function (error) {
          var result = error.data
          _this.$message(result.status + ':' + result.msg)
        })
    },
    showErr () {},
    handleClick (row) {
      console.log(row)
      this.$store.state.createTaskVisiable = true
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
