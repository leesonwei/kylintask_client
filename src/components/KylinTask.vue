<template>
<div>
<el-form style="margin-buttom:20px;" ref="form" :model="form" label-width="120px">
  <el-row>
  <el-col :span="12"><el-form-item label="KYLIN Server">
    <el-input v-model="form.url"></el-input>
  </el-form-item></el-col>
  <el-col :span="6"><el-form-item label="KYLIN Port">
    <el-input v-model="form.port"></el-input></el-form-item></el-col>
  <el-col :span="6">&nbsp;</el-col>
</el-row>
  <el-row>
  <el-col :span="9"><el-form-item label="KYLIN User">
    <el-input v-model="form.username"></el-input>
  </el-form-item></el-col>
  <el-col :span="9"><el-form-item label="KYLIN Pass">
    <el-input v-model="form.password"></el-input>
  </el-form-item></el-col>
  <el-col :span="6" style="text-align:left; padding-left:20px">
    <el-button type="primary" @click="onSubmit">connect</el-button>
</el-col>
</el-row>
</el-form>
<el-divider></el-divider>
<el-tabs type="border-card">
  <el-tab-pane label="Projects"><el-table
    :data="projectList"
    border
    style="width: 100%">
    <el-table-column
      prop="project"
      label="Project">
    </el-table-column>
    <el-table-column
      prop="cube"
      label="Cube">
    </el-table-column>
    <el-table-column
      prop="owner"
      label="Owner">
    </el-table-column>
    <el-table-column
      prop="streaming"
      label="Streaming">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">Create task</el-button>
      </template>
    </el-table-column>
  </el-table></el-tab-pane>

  <el-tab-pane label="Tasks"><el-table
    :data="taskList"
    border
    style="width: 100%">
    <el-table-column
      prop="project"
      label="Project">
    </el-table-column>
    <el-table-column
      prop="cube"
      label="Cube">
    </el-table-column>
    <el-table-column
      prop="owner"
      label="Owner">
    </el-table-column>
    <el-table-column
      prop="streaming"
      label="Streaming">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">创建</el-button>
      </template>
    </el-table-column>
  </el-table></el-tab-pane>

  <el-tab-pane label="Monitor"><el-table
    :data="jobList"
    border
    style="width: 100%">
    <el-table-column
      prop="project"
      label="Project">
    </el-table-column>
    <el-table-column
      prop="cube"
      label="Cube">
    </el-table-column>
    <el-table-column
      prop="owner"
      label="Owner">
    </el-table-column>
    <el-table-column
      prop="streaming"
      label="Streaming">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="options"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">Create task</el-button>
      </template>
    </el-table-column>
  </el-table></el-tab-pane>
</el-tabs>

<el-dialog
  title="create cron task"
  :visible.sync="dialogVisible"
  width="70%"
  :before-close="handleClose">
  <span>
  <el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="task name">
    <el-input v-model="form.name" disabled="true" placeholder="task name auto generate"></el-input>
  </el-form-item>

    <el-row style="height:60px;">
      <el-col :span="8">
        <el-form-item class="width-full" label="cube">
        <el-select v-model="value" placeholder="请选择cube">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
        </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item class="width-full" label="segments">
        <el-select v-model="value" placeholder="请选择segments">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item class="width-full" label="type">
        <el-select v-model="value" placeholder="请选择type">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
        </el-form-item>
      </el-col>
    </el-row>

  <el-form-item label="有效时间">
    <el-col  class="text-left" :span="2"><el-switch v-model="form.delivery"></el-switch></el-col>
    <el-col :span="22">
      <el-date-picker
      style="width:100%"
      v-model="value1"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="cron express">
    <el-input v-model="form.cron_express" placeholder="请选择cron"></el-input>
  </el-form-item>
  <el-form-item label="resume">
    <el-col :span="2" class="text-left"><el-switch v-model="form.delivery"></el-switch></el-col>
    <el-col :span="22" class="text-left">
    <el-input v-model="form.resume_times" placeholder="resume times"></el-input>
  </el-col>
  </el-form-item>
  <el-form-item label="desc">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
</el-form>
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      dialogVisible: false,
      row: {},
      form: {
        url: '',
        username: '',
        password: ''
      },
      projectList: [{
        project: '2016-05-02',
        cube: '王小虎',
        owner: '王小虎',
        streaming: '王小虎'
      }, {
        project: '2016-05-04',
        cube: '王小虎',
        owner: '王小虎',
        streaming: '王小虎'
      }, {
        project: '2016-05-01',
        cube: '王小虎',
        owner: '王小虎',
        streaming: '王小虎'
      }, {
        project: '2016-05-03',
        cube: '王小虎',
        owner: '王小虎',
        streaming: '王小虎'
      }],
      taskList: [{
        project: '2016-05-02',
        cube: '王小虎',
        owner: '王小虎',
        streaming: '王小虎'
      }, {
        project: '2016-05-04',
        cube: '王小虎',
        owner: '王小虎',
        streaming: '王小虎'
      }, {
        project: '2016-05-01',
        cube: '王小虎',
        owner: '王小虎',
        streaming: '王小虎'
      }, {
        project: '2016-05-03',
        cube: '王小虎',
        owner: '王小虎',
        streaming: '王小虎'
      }],
      jobList: [{
        project: '2016-05-02',
        cube: '王小虎',
        owner: '王小虎',
        streaming: '王小虎'
      }, {
        project: '2016-05-04',
        cube: '王小虎',
        owner: '王小虎',
        streaming: '王小虎'
      }, {
        project: '2016-05-01',
        cube: '王小虎',
        owner: '王小虎',
        streaming: '王小虎'
      }, {
        project: '2016-05-03',
        cube: '王小虎',
        owner: '王小虎',
        streaming: '王小虎'
      }]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
      this.dialogVisible = false
    },
    handleClick (row) {
      this.row = row
      this.dialogVisible = true
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
