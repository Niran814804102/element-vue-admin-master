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
      <pro-table
      :data="allData">
      </pro-table>
    </el-row>

  </div>
</template>

<script>
  import proTable from "../../components/table/proTable";
  export default {
    name:'allproject',
    components: {proTable},
    mounted(){
      this.getAllProjects()
    },
    methods: {
      /**
       * 新建项目
       */
      newProject(){
        //TODO 新建项目
      },
      /**
       *列表信息平铺展示
       */
      showCardView(){
        //TODO 平铺显示
      },
      /**
       * 平铺信息列表展示
       */
      showListView(){
        //TODO 平铺显示
      },
      /**
       * 获取用户个人所有项目
       * userid  用户id
       */
      getAllProjects: function(){
        //TODO 数据查询及处理
        this.$axios.get('static/json/allProject.json',{
          params:{ userid: "userid"}
        }).then(res=>{this.allData = res.data;})
          .catch(function(){
            console.log(error);})
      }
    },
    data() {
      return {
        allData: null   //table数据
      }
    }
  }
</script>
<style>
  .el-input--prefix .el-input__inner{
    border-radius: 20px;
  }
</style>
