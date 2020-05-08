<template>
  <div>
    <Connect></Connect>
    <el-divider></el-divider>
    <el-table :data="taskList" border style="width: 100%">
      <el-table-column prop="group" label="GROUP" width="220"></el-table-column>
      <el-table-column prop="taskName" label="NAME" width="320"></el-table-column>
      <el-table-column prop="startAt" label="STARTAT" width="180"></el-table-column>
      <el-table-column prop="endAt" label="ENDAT" width="180"></el-table-column>
      <el-table-column prop="description" label="DESCRIPTION"></el-table-column>
      <el-table-column
      fixed="right"
      label="Options"
      width="220">
      <template slot-scope="scope">
        <!-- <el-button @click="edit(scope.row)" type="text" size="small">Edit</el-button> -->
        <el-button @click="pause(scope.row)" type="text" size="small">Pause</el-button>
        <el-button @click="resume(scope.row)" type="text" size="small">Resume</el-button>
        <el-button @click="deleteItem(scope.row)" type="text" size="small">Delete</el-button>
      </template>
    </el-table-column>
    </el-table>
    <EditTask></EditTask>
  </div>
</template>

<script>
import Connect from '@/components/commons/connect'
import EditTask from '@/components/commons/editTask'
export default {
  components: { Connect, EditTask },
  computed: {
  },
  created: function () {
    this.getTasks()
  },
  data () {
    return {
      taskRow: {
      },
      taskList: []
    }
  },
  methods: {
    getTasks () {
      let _this = this
      let clientId = _this.$store.state.global.clientId
      if (clientId) {
        this.$http
          .get('/tasks?clientId=' + clientId)
          .then(function (response) {
            let data = response.data.data
            _this.clear()
            for (let i = 0, len = data.length; i < len; i++) {
              _this.$set(_this.taskList, i, data[i])
            }
          })
          .catch(function (error) {
            _this.$message.error(error)
          })
      }
    },
    clear () {
      for (let i = 0, len = this.taskList.length; i < len; i++) {
        this.taskList.pop()
      }
    },
    edit (row) {
      // this.taskRow = row
      // this.$store.state.editTaskStore.show = true
    },
    pause (row) {
      this.taskRow = row
      this.$confirm('will pause this task, continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancle',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'pause success!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'cancle pause'
        })
      })
    },
    resume (row) {
      this.taskRow = row
      this.$confirm('are you sure resume this task, continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancle',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'resume success!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'cancle resume'
        })
      })
    },
    deleteItem (row) {
      this.taskRow = row
      let _this = this
      this.$confirm('are you sure delete this task, continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancle',
        type: 'error'
      }).then(() => {
        console.log(_this.taskRow)
        this.$message({
          type: 'success',
          message: 'delete success!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'cancle delete'
        })
      })
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
