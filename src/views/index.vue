<template>
  <span style="z-index: 11">
    <!--左侧目录-->
    <div class="left col"  :class="{ collapse: isCollapse }">
      <div class="header row " style="text-align: center;height: 90px" :style="{width: isCollapse?'64px':'auto'}">
        <a v-if="!isCollapse" href="https://github.com/TonyLuo/element-vue-admin" style="color: white;size: 40px">
          <!--<i class="fa fa-rebel" style="color: #2d2f33"></i>-->
          <v-avatar
            size="65"
            color="grey lighten-4"
            style=""
          >
            <img src="../assets/uulogo.png" alt="avatar">
          </v-avatar>
        </a>
        <span :class="[isCollapse ? 'text-alight-center' : 'floating-right']" @click="toggleClick">
            <i class="fa fa-bars" style="margin-left: -6px"  ></i>
        </span>
      </div>
      <div class="body row scroll-y" style="top:90px">
        <sidebar :isCollapse="isCollapse" theme="dark"></sidebar>
      </div>
    </div>
    <!--右侧布局-->
    <div class="right col body" :style="{left: isCollapse?'64px':'200px'}">
      <ceiling></ceiling>
      <tabs class="layout-tabs"></tabs>
      <breadcrumb class="layout-breadcrumb"></breadcrumb>
      <div class="body row scroll-y" style="padding: 1em">
        <router-view></router-view>
      </div>
    </div>
    <alert-modal></alert-modal>
  </span>
</template>

<style>
  @import "../../static/css/layout.css";
  @import "../../static/css/dark.theme.css";
  /*@import "../../static/css/chalk.theme.css";*/

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .v-avatar{
    top:10px;
    box-shadow: 0 0 20px 3px hsla(0,0%,65%,.36),
    0 0 10px 2px hsla(0,0%,82%,.23);
    border-radius: 50%;
  }

</style>

<script>
  import ceiling from './layout/ceiling.vue'
  import sidebar from './layout/sidebar.vue'
  import breadcrumb from './layout/breadcrumb.vue'
  import tabs from './layout/tabs.vue'
  import alertModal from '../components/alert/alert-modal.vue'

  export default {
    components: {
      sidebar,
      ceiling,
      breadcrumb,
      tabs,
      "alert-modal": alertModal
    },
    data () {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }
      return {
        tableData: Array(20).fill(item),
        isCollapse: false
      }
    },
    methods: {
      init () {
        this.$store.dispatch('initial', {})

      },
      toggleClick () {
        this.isCollapse = !this.isCollapse
      }
    },
    watch: {},
    mounted () {
      this.init()
    }
  }
</script>
<style>
  @import "../../static/css/layout.css";
  @import "../../static/css/dark.theme.css";
  /*@import "../../static/css/chalk.theme.css";*/

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
</style>
