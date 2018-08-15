<template>
  <div>
    <el-table
      :data="tasks"
      style="margin:0 auto;"
      max-height="400px">
      <el-table-column
        prop="record.remarks"
        label="项目名称"
        width="fit-content">
      </el-table-column>
      <el-table-column
        label="进度"
        prop="record.progress"
        width="250">
        <template slot-scope="scope">
          <el-progress ref="progress"
            prop="record.progress"
            :percentage="0">
          </el-progress>
        </template>
      </el-table-column>
      <el-table-column
        prop="record.submitTime"
        label="提交日期"
        width="200">
      </el-table-column>
      <el-table-column
        prop="record.finishTime"
        label="完成日期"
        width="200">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-view"
            @click="editRow(scope.$index, data)"
            type="text">
          </el-button>
          <el-button
            icon="el-icon-download"
            @click="editRow(scope.$index, data)"
            type="text">
          </el-button>
          <el-button
            icon="el-icon-delete"
            @click.native.prevent="deleteRow(scope.$index, data)"
            type="text">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <map-dialog ref="mapdialog"
      :dialog-visible="dialogVisible" :dialog-title="dialogTitle" :query-url="queryUrl" :query-params="queryParams">
    </map-dialog>
  </div>
</template>

<script>
    import MapDialog from "../dialog/mapDialog";
    export default {
      name: "proTable",
      components: {
        "map-dialog": MapDialog
      },
      data(){
        return{
          dialogVisible:{
            v:false,
            clickModalClose:false//模态框是否显示
          },
          dialogTitle:"",
          queryUrl:"",
          queryParams:null,

        }
      },
      props:{
          tasks:Array,
      },
      methods:{

        deleteRow(index, rows) {
          rows.splice(index, 1);
          //TODO 在数据中删除
        },
        editRow(index, rows) {
          this.dialogTitle=rows[index].proName

          this.dialogVisible.v = true
          //TODO 根据所选信息组织数据请求url和参数
          this.queryUrl="static/json/projData/ylsj.json"
          this.params={
            "userid":"userid",
            "proname":"proname"
          }
        },
        // getprogress(){
        //   this.$refs.progress.percentage=this.tasks.progress;
        // }

      },
      mounted(){
        // this.getprogress()
      },
    }
</script>

<style>
  .el-input--prefix .el-input__inner{
    border-radius: 20px;
  }
  .el-table td, .el-table th {
    background-color: #f8f8f9;
  }
  .el-table__empty-block {
    background-color: #f8f8f9;
  }
  .el-el-table-column{
    text-align: center;
  }
</style>

