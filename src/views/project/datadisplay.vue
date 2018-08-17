<template>
  <div style="width:80%;margin: 10px auto">
    <el-row style="height: 60px;horiz-align: center">
      <el-button type="primary" round
                 @click="newProject()">
        <i class="el-icon-circle-plus-outline"></i>
        新建项目
      </el-button>
      <el-button
        icon="el-icon-menu"
        type="text"
        style="float:right;padding:12px 0px;color:gray"
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
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        style="width:200px;float:right;">
      </el-input>

    </el-row>
    <el-row>
     <pro-table
     :data="datadis">
     </pro-table>
    </el-row>
  </div>
</template>

<script>
    import proTable from "../../components/table/proTable";
    export default {
      name: "datadisplay",
      components: {proTable},
      mounted(){
        this.getDataDisplayProj()
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
        getDataDisplayProj(){
          //TODO 数据查询及处理
          this.$axios.get('static/json/datadisplay.json',{
            params:{ userid: "userid"},

          }).then(res=>{this.datadis = res.data;console.log(res.data)})
            .catch(function(){
              console.log(error);})
        }
      },
      data() {
        return {
          datadis: null
        }
      }
    }
</script>

<style>
  .el-input--prefix .el-input__inner{
    border-radius: 20px;
  }
</style>
