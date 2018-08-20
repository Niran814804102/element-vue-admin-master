<template>
  <div>
    <el-table
      :data="dataInfo"
      style="width: 100%"
      max-height="750"
      stripe
      border
      highlight-current-row
      :header-cell-style="{ background: '#f0f9eb' }">
      <el-table-column
        prop="proName"
        label="属性名称">
      </el-table-column>
      <el-table-column
        prop="proValue"
        label="属性值">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "dataInfoTable",
    data() {
      return {
      }
    },
    props:{
      tableData: null
    },
    computed:{
      dataInfo(){//获取数据信息，并进行数据格式化——时间和空数据
        let dataInfoTmp = [];
        let data = this.tableData.data;
        let visit = this.tableData.visit;
        for (let key in data){
          dataInfoTmp.push({
            proName: key,
            proValue: data[key] == "" ? "暂无数据" : (key.indexOf("Time") != -1 ? this.$date.dateFormat(data[key]): data[key])
          })
        }
        for (let key in visit){
          dataInfoTmp.push({
            proName: key,
            proValue: visit[key] == "" ? "暂无数据" : (key.indexOf("Time") != -1 ? this.$date.dateFormat(visit[key]): visit[key])
          })
        }
        return dataInfoTmp;
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
    }
  }
</script>

<style scoped>

</style>
