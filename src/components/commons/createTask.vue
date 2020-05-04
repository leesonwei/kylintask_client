<template>
  <el-dialog title="Create a new task" :visible.sync="showDialog" :before-close="cancle">
    <el-form ref="form" :model="taskDto" label-width="100px">
      <el-form-item label="Name">
        <el-input v-model="taskDto.taskName"></el-input>
      </el-form-item>
      <el-form-item label="Action" style="text-align:left">
        <el-select v-model="taskDto.action" placeholder="please select action"  style="width:70%">
          <el-option label="BUILD" value="BUILD"></el-option>
          <el-option label="REFRESH" value="REFRESH"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Cube">
        <el-col :span="24" style="text-align:left">
          <el-select v-model="taskDto.cube" placeholder="please select action"  style="width:70%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="Segment" style="text-align:left">
        <el-select v-model="taskDto.segment" placeholder="please select segment" style="width:70%">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Time-limit">
        <el-col :span="4" style="text-align:left">
          <el-switch v-model="taskDto.isLimit"></el-switch>
        </el-col>
        <el-col :span="20" style="text-align:left">
          <el-date-picker
            v-show="taskDto.isLimit"
            v-model="taskDto.timeRange"
            type="datetimerange"
            range-separator="-"
            start-placeholder="start-at"
            end-placeholder="end-at"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="Resume">
        <el-col :span="4" style="text-align:left">
          <el-switch v-model="taskDto.isResume"></el-switch>
        </el-col>
        <el-col :span="20" style="text-align:left">
          <el-input
            v-show="taskDto.isResume"
            v-model="taskDto.resumeTimes"
            placeholder="resume times"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="Cron express">
        <el-input v-model="taskDto.cron" placeholder="Cron express"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input type="textarea" v-model="taskDto.description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">Cancle</el-button>
      <el-button type="primary" @click="insertTask">OK</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  computed: {
    createTaskVisiable () {
      return this.$store.state.createTaskVisiable
    }
  },
  watch: {
    createTaskVisiable: function () {
      this.showDialog = this.$store.state.createTaskVisiable
    }
  },
  data () {
    return {
      showDialog: false,
      taskDto: {
        taskName: '',
        action: '',
        cube: '',
        segment: '',
        isLimit: false,
        timeRange: '',
        isResume: false,
        resumeTimes: '',
        cron: '',
        description: ''
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
      this.$store.state.createTaskVisiable = false
      console.log(this.taskDto)
    },
    cancle () {
      this.$store.state.createTaskVisiable = false
    }
  }
}
</script>

<style>
</style>
