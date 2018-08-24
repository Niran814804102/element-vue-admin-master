<template>
  <div>
    <el-table
      :data="dataInfo"
      style="width: 100%"
      :row-style="{ height:'0' }"
      max-height="750"
      stripe
      border
      highlight-current-row
      :header-cell-style="{ background: '#f0f9eb' }">
      <el-table-column
        prop="proName"
        label="属性名称"
        align="center" header-align="center">
      </el-table-column>
      <el-table-column
        prop="proValue"
        label="属性值"
        align="center" header-align="center">
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
        let dataInfoTmp = []
        if(this.tableData){
          this.pushDataFromObject(this.tableData, dataInfoTmp);
          return dataInfoTmp;
        }
        return null;
      }
    },
    methods: {
      tableRowClassName({row, rowIndex}) {//表格颜色设置，当前为轮询双色
        if (rowIndex % 2 == 0) {
          return 'warning-row';
        } else {
          return 'success-row';
        }
      },
      pushDataFromObject(obj, data){
        for (let key in obj) {
          if (typeof obj[key] == "object")
            this.pushDataFromObject(obj[key], data);//迭代遍历object里的object属性
          else{
            let value = ( !obj[key] || obj[key] == "" ) ? "暂无数据": obj[key];
            if (key == "geometry")
              value = "Point";

            if (key.toLowerCase().indexOf("time") != -1) {
              value = this.$date.dateFormat(parseInt(value));
            }
            data.push({
              proName: key,
              proValue: value
            })
          }
        }
      }
    }
  }
</script>

<style >

</style>
