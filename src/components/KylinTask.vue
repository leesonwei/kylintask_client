<template>
  <div>
    <el-form style="margin-buttom:20px;" ref="form" :model="form" label-width="120px">
      <el-row>
        <el-col :span="4">
          <el-form-item label="potocol">
            <el-select size="small" v-model="form.potocol">
              <el-option
                v-for="item in potocols"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item size="small" label="KYLIN Server">
            <el-input v-model="form.host"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item size="small" label="KYLIN Port">
            <el-input v-model="form.port"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item size="small" label="KYLIN User">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item size="small" label="KYLIN Pass">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="text-align:right; padding-left:20px">
          <el-button size="small" type="primary" @click="connect">connect</el-button>
        </el-col>
        <div>{{number}}</div>
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
    <CreateTask :createTaskVisiable="visiable"></CreateTask>
  </div>
</template>

<script>
import CreateTask from '@/components/commons/createTask'
export default {
  components: { CreateTask },
  computed: {
    number () {
      return this.$store.state.count
    }
  },
  data () {
    return {
      visiable: false,
      form: {
        potocol: '',
        host: '',
        port: '',
        username: '',
        password: ''
      },
      potocols: [
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
        uuid: '2016-05-02',
        name: '王小虎',
        version: '3.0.0.1',
        description: '上海市普陀区金沙江路'
      }]
    }
  },
  methods: {
    connect () {
      var _this = this
      this.$http
        .post('/kylinweb/connect', this.form)
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
      this.visiable = true
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
