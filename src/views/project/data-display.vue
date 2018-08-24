<template>
  <div  style="width:80%;margin: 10px auto">
    <el-button type="primary" round
               @click="newProject()">
      <i class="el-icon-circle-plus-outline"></i>
      新建项目
    </el-button>
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      style="width:200px;float:right;">
    </el-input>
  </div>
</template>

<script>
  import infoCard from '../../components/card/info-card.vue'

  export default {
      name: "dataview",
    components:{infoCard},
  }
</script>

<style >
  .el-input--prefix .el-input__inner{
    border-radius: 20px;
  }
</style>
