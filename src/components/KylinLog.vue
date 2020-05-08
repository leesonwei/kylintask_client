<template>
  <div>
    <el-form :inline="true" :model="log" class="demo-form-inline" style="text-align:left; border-buttom: #eee 1px solid;">
      <el-form-item label="Keyword">
        <el-input size="small" v-model="log.keyword" placeholder="Keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit">Search</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="logList" border style="width: 100%">
      <el-table-column prop="id" label="UUID" width="220"></el-table-column>
      <el-table-column prop="name" label="NAME" width="220"></el-table-column>
      <el-table-column prop="date" label="DATE" width="180"></el-table-column>
      <el-table-column prop="message" label="MESSAGE"></el-table-column>
      <el-table-column
      fixed="right"
      label="options"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">View detail</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  computed: {},
  data () {
    return {
      log: {
        keyword: ''
      },
      logList: [
        {
          id: 'dsafkjhsjk-dsafjkl-097dsaklh',
          name: 'RealTime',
          date: '3.0.0.1',
          message: '實時cube'
        }
      ]
    }
  },
  methods: {
    onSubmit () {
      console.log(this.log)
    },
    handleClick (row) {
      console.log(row)
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
