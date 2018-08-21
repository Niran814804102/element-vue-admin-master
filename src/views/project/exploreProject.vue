<template>
  <div style="width:95%;margin: 10px auto;">
    <el-row style="height: 60px;">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        style="width:200px;float:right;margin-right: 10px">
      </el-input>
      <!--<el-button-->
        <!--icon="el-icon-menu"-->
        <!--type="text"-->
        <!--style="float:right;padding:12px 0px;color:gray;margin-left:10px"-->
        <!--round-->
        <!--@click="showCardView()">-->
        <!--平铺-->
      <!--</el-button>-->
      <!--<el-button-->
        <!--icon="el-icon-tickets"-->
        <!--type="text"-->
        <!--style="float:right;padding:12px 0px;color:gray"-->
        <!--round-->
        <!--@click="showListView()">-->
        <!--列表-->
      <!--</el-button>-->
    </el-row>
    <el-row>
      <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 v-for="card in cards" :key="card.id" style="padding:0 0 24px 0">
            <allProject :card="card" ></allProject>
          </v-flex>
        </v-layout>
      </v-container>
    </el-row>

  </div>
</template>

<script>
  import projectCard from '../../components/card/projectCard.vue'

  export default {
    name: 'allproject',
    components: {"allProject": projectCard},
    data() {
      return {
        cards: null,
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
        // this.$refs.allprojectTable.getProjectData();
        let that = this;
        that.$axios.get('../../../static/json/allprojectData.json', {
          userid: sessionStorage.getItem("userid")
        }).then(function(res){console.log(res);that.cards=res;
        }).catch(function(err){console.log(err);})
      },
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
