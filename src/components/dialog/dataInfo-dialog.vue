<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="400px"
      top="4%"
    >
      <data-info-table :tableData="tableData"></data-info-table>
    </el-dialog>
  </div>
</template>

<script>
  import dataInfoTable from '../table/dataInfo-table.vue'

  export default {
    name: "dataInfoDialog",
    data() {
      return {
        title: "No Title",
        visible: false,
        tableData: null
      }
    },
    components: {
      "data-info-table": dataInfoTable
    },
    created(){
      let that = this;
      that.$Bus.$on("dataInfoDialogParams",(params)=> {
        that.visible = params.visible;
        that.title = params.tableData.data.metaName;
        that.tableData = params.tableData;
      });
    }
  }
</script>

<style >
 .el-dialog__title{
   padding-left: 10px;
 }
</style>
