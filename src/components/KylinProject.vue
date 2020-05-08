<template>
  <div>
    <Connect></Connect>
    <el-divider></el-divider>
    <el-table :data='projectList' border style='width: 100%'>
      <el-table-column prop='uuid' label='UUID' width='320'></el-table-column>
      <el-table-column prop='name' label='NAME' width='220'></el-table-column>
      <el-table-column prop='version' label='VERSION' width='180'></el-table-column>
      <el-table-column prop='status' label='STATUS' width='180'></el-table-column>
      <el-table-column prop='description' label='DESCRIPTION'></el-table-column>
      <el-table-column
      fixed='right'
      label='Options'
      width='100'>
      <template slot-scope='scope'>
        <el-button @click='createTask(scope.row)' type='text' size='small'>Create Task</el-button>
      </template>
    </el-table-column>
    </el-table>
    <CreateTask :project='projectRow.name'></CreateTask>
  </div>
</template>

<script>
import CreateTask from '@/components/commons/createTask'
import Connect from '@/components/commons/connect'
export default {
  components: { CreateTask, Connect },
  computed: {
  },
  watch: {

  },
  created: function () {
    this.getProjects()
  },
  data () {
    return {
      projectRow: {
        uuid: '',
        name: '',
        version: '',
        description: ''
      },
      projectList: []
    }
  },
  methods: {
    getProjects () {
      let _this = this
      let clientId = _this.$store.state.global.clientId
      if (clientId) {
        this.$http
          .get('/kylin/projects?clientId=' + clientId)
          .then(function (response) {
            let data = response.data.data
            _this.clear()
            for (let i = 0, len = data.length; i < len; i++) {
              _this.$set(_this.projectList, i, data[i])
            }
          })
          .catch(function (error) {
            _this.$message.error(error)
          })
      }
    },
    clear () {
      for (let i = 0, len = this.projectList.length; i < len; i++) {
        this.projectList.pop()
      }
    },
    createTask (row) {
      this.projectRow = row
      this.$store.state.createTaskStore.show = true
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
