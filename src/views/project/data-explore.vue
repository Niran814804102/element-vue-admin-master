<template>
  <div style="width:80%;margin: 10px auto">
  <el-row style="height: 60px;horiz-align: center">
    <el-button type="primary" round
               @click="newProject()">
      <i class="el-icon-circle-plus-outline"></i>
      新建项目
    </el-button>
    <!--<el-button-->
      <!--icon="el-icon-menu"-->
      <!--type="text"-->
      <!--style="float:right;padding:12px 0px;color:gray"-->
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
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      style="width:200px;float:right;">
    </el-input>

  </el-row>
  <el-row>
    <pro-table
      :data="expData">
    </pro-table>
  </el-row>
</div>
</template>

<script>
    import proTable from "../../components/table/pro-table";
    export default {
      name: "dataexplore",
      components: {proTable},
      mounted(){
        this.getDataExploreProj()
      },
      methods: {
        newProject(){
          //TODO 新建项目
        },
        showCardView(){
          //TODO 平铺显示
        },
        showListView(){
          //TODO 平铺显示
        },
        getDataExploreProj(){
          this.$axios.get('static/json/dataexplore.json',{
            params:{userid: "userid"}
          }).then(res=>{this.expData=res.data})
        }
      },
      data() {
        return {
          expData: null
        }
      }
    }
</script>

<style>
  .el-input--prefix .el-input__inner{
    border-radius: 20px;
  }
</style>

