<template>
  <div style="width:85%;margin: 10px auto;">
    <el-row style="height: 60px;">
      <el-button id="refresh"
        title="列表刷新"
        type="primary"
        icon="el-icon-refresh"
        circle
        @click="refresh()">
      </el-button>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        style="width:200px;float:left;">
      </el-input>
    </el-row>
    <el-row>
      <allTable ref="allprojectTable">
      </allTable>
    </el-row>
  </div>
</template>

<script>
  import modelprojectTable from '../../components/table/modelprojectTable'

  export default {
    name: 'allproject',
    components: {"allTable": modelprojectTable},
    data() {
      return {

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
       * 获取用户个人所有项目
       * userid  用户id
       */
      getAllProjects: function () {
        //TODO 数据查询及处理
        this.$refs.allprojectTable.getProjectData();
      },
      //have problem
      refresh:function () {
        this.$refs.allprojectTable.task=[];
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
 #refresh{
   float: right;
 }
</style>
