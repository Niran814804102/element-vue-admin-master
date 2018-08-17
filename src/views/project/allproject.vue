<template>
  <div style="width:80%;margin: 10px auto;">
    <el-row style="height: 60px;">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        style="width:200px;float:left;">
      </el-input>
      <el-button
        icon="el-icon-menu"
        type="text"
        style="float:right;padding:12px 0px;color:gray;margin-left:10px"
        round
        @click="showCardView()">
        平铺
      </el-button>
      <el-button
        icon="el-icon-tickets"
        type="text"
        style="float:right;padding:12px 0px;color:gray"
        round
        @click="showListView()">
        列表
      </el-button>
    </el-row>
    <el-row>
      <allTable ref="allprojectTable">
        <!--:data="tasks">-->
      </allTable>
    </el-row>

  </div>
</template>

<script>
  // import proTable from "../../components/table/proTable";
  import allprojectTable from '../../components/table/allprojectTable'

  export default {
    name: 'allproject',
    components: {"allTable": allprojectTable},
    data() {
      return {
        // tasks: []   //table数据
      }
    },
    methods: {
      /**
       * 新建项目
       */
      newProject() {
        //TODO 新建项目
      },
      /**
       *列表信息平铺展示
       */
      showCardView() {
        //TODO 平铺显示
      },
      /**
       * 平铺信息列表展示
       */
      showListView() {
        //TODO 平铺显示
      },
      /**
       * 获取用户个人所有项目
       * userid  用户id
       */
      getAllProjects: function () {
        //TODO 数据查询及处理
        // let obj = this;
        // this.$axios({
        //   method: "GET",
        //   // url:'http://192.168.240.25/dldsj/parallel/jobs/user',
        //   url: '../../../static/json/allProject.json',
        //   // params:{ userid: "userid"},
        //   // headers: {//设置跨域头
        //   //   'Content-Type': 'application/json'
        //   // }
        // }).then(res => {
        //   obj.tasks = res.data.body;
        //   for (let prodata of obj.tasks) {
        //     if (prodata.record.state === "FINISHED") {
        //
        //     }
        //   }
        // })
        //   .catch(function () {
        //     // console.log(error)
        //   })
        this.$refs.allprojectTable.getProjectData();
      }
    },
    mounted() {
      this.getAllProjects()
    }
  }
</script>
<style>
  .el-input--prefix .el-input__inner {
    border-radius: 20px;
  }
</style>
