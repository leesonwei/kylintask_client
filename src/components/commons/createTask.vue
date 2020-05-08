<template>
  <el-dialog
    title="Create a new task"
    :center="true"
    :destroy-on-close=true
    @open="getCubes"
    :visible.sync="$store.state.createTaskStore.show"
  >
    <el-form :rules="rules" ref="createTaskForm" :model="taskDto" label-width="100px">
      <el-form-item label="Name">
        <el-input v-model="taskDto.taskName" disabled></el-input>
      </el-form-item>
      <el-form-item label="Project">
        <el-input v-model="project" disabled></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Cube" prop="cube">
            <el-col :span="24" style="text-align:left">
              <el-select
                v-model="taskDto.cube"
                placeholder="please select cube"
                style="width:100%"
                @change="changeCube(taskDto.cube)"
              >
                <el-option
                  v-for="item in cubes"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Action" style="text-align:left" prop="action">
            <el-select
              v-model="taskDto.action"
              placeholder="please select action"
              style="width:100%"
              @change="changeAction(taskDto.action)"
            >
              <el-option
                  v-for="item in actions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item label="Segment" style="text-align:left" prop="segment">
        <el-select filterable  v-model="taskDto.segment" placeholder="please select segment" style="width:100%" @change="changeSegment">
          <el-option
            v-for="item in segments"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      </el-row>

      <el-form-item label="Time-limit">
        <el-col :span="4" style="text-align:left">
          <el-switch @change="changeLimit(taskDto.limit)" v-model="taskDto.limit"></el-switch>
        </el-col>
        <el-col :span="20" style="text-align:left">
          <el-date-picker
            v-show="taskDto.limit"
            v-model="timeRange"
            type="datetimerange"
            range-separator="-"
            start-placeholder="start-at"
            end-placeholder="end-at"
            style="width:100%"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="Resume">
        <el-col :span="4" style="text-align:left">
          <el-switch @change="changeResume(taskDto.resume)" v-model="taskDto.resume"></el-switch>
        </el-col>
        <el-col :span="20" style="text-align:left">
          <el-input prop="resumeTimes"
            v-show="taskDto.resume"
            v-model.number="taskDto.resumeTimes"
            placeholder="resume times"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="Cron" prop="cron">
        <el-input v-model="taskDto.cron" placeholder="Cron express"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input type="textarea" v-model="taskDto.description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="$store.state.createTaskStore.show = false">Cancle</el-button>
      <el-button size="small" type="primary" @click="submitCreateTask">OK</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  props: {
    project: ''
  },
  computed: {

  },
  watch: {

  },
  data () {
    return {
      taskDto: {
        clientId: '',
        projectName: '',
        taskName: '',
        action: '',
        cube: '',
        segment: '',
        limit: true,
        resume: true,
        resumeTimes: '',
        cron: '0/10 * * * * ?',
        startAt: '',
        endAt: '',
        description: ''
      },
      cubes: [],
      segments: [],
      actions: [],
      timeRange: [],
      rules: {
        action: [
          { required: true, message: 'action is required', trigger: 'blur' }
        ],
        cube: [
          { required: true, message: 'cube is required', trigger: 'blur' }
        ],
        segment: [
          { required: true, message: 'segment is required', trigger: 'blur' }
        ],
        cron: [
          { required: true, message: 'cron is required', trigger: 'blur' }
        ],
        resumeTimes: [
          { min: 0, max: 5, message: 'length is 0 - 5', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changeCube (cubeName) {
      this.taskDto.action = ''
      this.taskDto.segment = ''
      let cube = this.cubes.find(e => e.name === cubeName)
      this.putActions(cube)
      this.putSegments(cube)
      this.changeSegment()
    },
    putSegments (cube) {
      this.clear(this.segments)
      if (cube && cube.segments.length > 0) {
        if (this.isFullBuild(cube)) {
          this.$set(this.segments, 0, cube.segments[0])
        } else {
          for (let i = 0, len = cube.segments.length; i < len; i++) {
            this.$set(this.segments, i, cube.segments[i])
          }
        }
      }
    },
    putActions (cube) {
      this.clear(this.actions)
      if (this.isFullBuild(cube)) {
        this.actions.push({label: 'BUILD', value: 'BUILD'})
      } else {
        this.actions.push({label: 'BUILD', value: 'BUILD'})
        this.actions.push({label: 'REFRESH', value: 'REFRESH'})
      }
    },
    changeAction (action) {
      if (this.taskDto.cube) {
        let cube = this.cubes.find(e => e.name === this.taskDto.cube)
        this.putSegments(cube)
      }
      this.changeSegment()
    },
    changeSegment () {
      this.taskDto.taskName = this.taskDto.action + '__' + this.taskDto.cube + '__' + this.taskDto.segment
    },
    changeResume (isResume) {
      if (!isResume) {
        this.taskDto.resumeTimes = ''
      }
    },
    changeLimit (isLimit) {
      if (!isLimit) {
        this.clear(this.timeRange)
      }
    },
    isFullBuild (cube) {
      if (cube && cube.segments.length > 0) {
        let segment = cube.segments[0]
        if (segment.name.search('FULL_BUILD') !== -1) {
          return true
        }
      }
      return false
    },
    getCubes () {
      let _this = this
      let clientId = _this.$store.state.global.clientId
      let projectName = this.project
      this.taskDto.cube = ''
      if (clientId) {
        this.$http
          .get('/kylin/cubes?clientId=' + clientId + '&projectName=' + projectName)
          .then(function (response) {
            let data = response.data.data
            _this.clear(_this.cubes)
            _this.clear(_this.segments)
            for (let i = 0, len = data.length; i < len; i++) {
              _this.$set(_this.cubes, i, data[i])
            }
          })
          .catch(function (error) {
            _this.$message.error(error)
          })
      }
    },
    clear (arr) {
      for (let i = 0, len = arr.length; i < len; i++) {
        arr.pop()
      }
    },
    submitCreateTask () {
      let _this = this
      this.$refs['createTaskForm'].validate((valid, object) => {
        if (valid) {
          if (_this.taskDto.isLimit && _this.timeRange.length <= 0) {
            _this.$message({message: 'timerange is required if islimit', type: 'warning'})
            return false
          } else {
            _this.taskDto.startAt = _this.timeRange[0]
            _this.taskDto.endAt = _this.timeRange[1]
          }
          if (_this.taskDto.isResume && !_this.taskDto.resumeTimes) {
            _this.$message({message: 'resumeTimes is required if isResume', type: 'warning'})
            return false
          }
          this.taskDto.clientId = this.$store.state.global.clientId
          this.taskDto.projectName = this.project
          this.insertTask()
        } else {
          console.log(object)
          return false
        }
      })
    },
    insertTask () {
      let _this = this
      this.$http
        .post('/tasks/add', this.taskDto)
        .then(function (response) {
          _this.$message({message: response.data.message, type: 'success'})
        })
        .catch(function (error) {
          _this.$message.error(error)
        })
      this.$store.state.createTaskStore.show = false
    }
  }
}
</script>

<style>
</style>
