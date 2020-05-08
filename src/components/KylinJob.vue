<template>
  <div>
    <Connect></Connect>
    <el-divider></el-divider>
    <el-table :data="jobList" border style="width: 100%">
      <el-table-column prop="uuid" label="UUID" width="220"></el-table-column>
      <el-table-column prop="name" label="NAME" width="220"></el-table-column>
      <el-table-column prop="jobStatus" label="STATUS" width="180"></el-table-column>
      <el-table-column prop="progress" label="PROGRESS"></el-table-column>
      <el-table-column prop="resume" label="RESUME"></el-table-column>
      <el-table-column prop="actualTimes" label="RESUMETIME"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import Connect from '@/components/commons/connect'
export default {
  components: { Connect },
  created: function () {
    this.getJobLists()
  },
  data () {
    return {
      jobRow: {},
      jobList: []
    }
  },
  methods: {
    getJobLists () {
      console.log(1)
      let _this = this
      let clientId = this.$store.state.global.clientId
      if (clientId) {
        this.$http
          .get('/kylinjobs?clientId=' + clientId)
          .then(function (response) {
            let data = response.data.data
            _this.clear()
            for (let i = 0, len = data.length; i < len; i++) {
              _this.$set(_this.jobList, i, data[i])
            }
          })
          .catch(function (error) {
            _this.$message.error(error)
          })
      }
    }
  },
  clear () {
    for (let i = 0, len = this.jobList.length; i < len; i++) {
      this.jobList.pop()
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
