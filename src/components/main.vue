<template>
<el-container>
  <el-header><Header></Header></el-header>
  <el-main>
    <router-view></router-view>
  </el-main>
  <el-footer><Footer></Footer></el-footer>
</el-container>
</template>

<script>
import Header from '@/components/commons/header'
import Footer from '@/components/commons/footer'
export default {
  data () {
    return {
    }
  },
  components: { Header, Footer },
  methods: {
  }
}
</script>

<style>

</style>
