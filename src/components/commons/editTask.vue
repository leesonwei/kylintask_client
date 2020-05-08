<template>
  <el-dialog
    title="Edit task"
    :center="true"
    :visible.sync="$store.state.editTaskStore.show"
  >
    <el-form ref="form" :model="taskDto" label-width="100px">
      <el-form-item label="Project">
        <el-input v-model="taskDto.group"></el-input>
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="taskDto.taskName"></el-input>
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
            style="width:100%"
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
      <el-button size="small" @click="$store.state.editTaskStore.show = false">Cancle</el-button>
      <el-button size="small" type="primary" @click="editTask">OK</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    project: ''
  },
  computed: {},
  watch: {},
  data () {
    return {
      taskDto: {
        group: '',
        project: '',
        taskName: '',
        action: '',
        cube: '',
        segment: '',
        isLimit: true,
        timeRange: '',
        isResume: true,
        resumeTimes: '',
        cron: '',
        description: ''
      }
    }
  },
  methods: {
    editTask () {
      this.$store.state.editTaskStore.show = false
      console.log(this.taskDto)
    }
  }
}
</script>

<style>
</style>
