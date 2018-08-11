<template>
  <el-table
    :data="tableData4"
    style="width: 80%;margin:0 auto;"
    max-height="400px">
    <el-table-column
      fixed
      prop="proName"
      label="项目名称"
      width="300">
    </el-table-column>
    <el-table-column
      fixed
      prop="appName"
      label="应用名称"
      width="250">
    </el-table-column>
    <el-table-column
      prop="date"
      label="更新日期"
      width="150">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="editRow(scope.$index, tableData4)"
          type="text"
          size="small">
          编辑
        </el-button>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData4)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      editRow(index, rows){
        //TODO 打开地图编辑页面
      }
    },
    data() {
      return {
        tableData4: [{
          proName: '地图探索',
          appName: '数据探索',
          date: '2018-08-07 11:25'

        }, {
          proName: '3D地图',
          appName: '数据上图3D',
          date: '2018-08-07 10:10'
        }, {
          proName: '样例数据',
          appName: '数据上图',
          date: '2018-08-07 08:25'
        }]
      }
    }
  }
</script>
