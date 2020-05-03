<template>
<el-dialog title="收货地址" :visible.sync="createTaskVisiable">
  <el-form :model="taskDto">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="taskDto.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="taskDto.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="createTaskVisiable = false">取 消</el-button>
    <el-button type="primary" @click="insertTask">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
export default {
  props: ['createTaskVisiable'],
  data () {
    return {
      formLabelWidth: '80',
      taskDto: {
        name: '',
        region: ''
      },
      segments: {},
      actions: {}
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    insertTask () {
      this.createTaskVisiable = false
    }
  }
}
</script>

<style>

</style>
