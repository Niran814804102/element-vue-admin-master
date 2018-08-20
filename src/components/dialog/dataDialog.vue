<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="80%"
      top="4%"
    >
      <data-table :tableData="tableData"></data-table>
    </el-dialog>
  </div>
</template>

<script>
  import dataTable from '../table/dataTable.vue'

  export default {
    name: "dataDialog",
    data() {
      return {
        title: "No Title",
        visible: false,
        queryUrl: "",
        queryParams: null,
        tableData: null
      }
    },
    components: {
      "data-table": dataTable
    },
    watch:{
      visible(){
        let that = this;
        that.$axios.get(that.queryUrl, that.queryParams
        ).then(function(res){
          that.tableData =  res.body;
        }).catch(function(err){
          console.log(err);});
      }
    },
    created(){
      let that = this;
      that.$Bus.$on("dataDialogParams",(params)=> {
        that.visible = params.visible;
        that.title = params.title;
        that.queryUrl = params.queryUrl;
        that.queryParams = params.queryParams;
      });
    }
  }
</script>

<style scoped>

</style>
