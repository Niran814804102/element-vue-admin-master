<template>
  <div>
    <el-table
      :data="tableDataFormat"
      style="width: 100%"
      :row-style="{ height:'0' }"
      :cell-style="{ padding:'5px' }"
      max-height="500"
      stripe
      border
      highlight-current-row
      :header-cell-style="{ background: '#f0f9eb' }">
      <el-table-column v-if="colnames != null" label="ID" prop="id" type="index"></el-table-column>
      <template v-for="(colname, index) in colnames">
        <el-table-column :label="colname" :prop="colname" :index="index" align="center" header-align="center" width="auto" sortable></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "dataTable",
    data() {
      return {
      }
    },
    props:{
      tableData: Array
    },
    computed:{
      colnames(){//获取列名
        if(this.tableData == null || this.tableData.length == 0)
          return null;
        return Object.keys(this.tableData[0]);
      },
      tableDataFormat(){//数据处理——时间格式化
        if(this.tableData == null || this.tableData.length == 0)
          return null;
        let colnames = Object.keys(this.tableData[0]);
        for (let col = 0; col < colnames.length; col++){
          if (colnames[col].indexOf('time') != -1){
            for (let row = 0; row < this.tableData.length; row++){
              this.tableData[row][colnames[col]] = this.$date.dateFormat(parseInt(this.tableData[row][colnames[col]]))
            }
          }
        }
        return this.tableData;
      }
    },
    methods: {
      tableRowClassName({row, rowIndex}) {//表格颜色设置，当前为轮询双色
        if (rowIndex % 2 == 0) {
          return 'warning-row';
        } else {
          return 'success-row';
        }
      }
    },
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
   .el-table .warning-row {
     background: oldlace;
   }
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
</style>
