<template>
  <div>
    <el-table ref="mytable"
      :data="task"
      style="margin:0 auto;">
      <!--max-height="400px">-->
      <el-table-column
        prop="remarks"
        label="项目名称"
        width="fit-content">
      </el-table-column>
      <el-table-column
        label="进度"
        width="250">
        <template slot-scope="scope">
          <el-progress ref="myprogress"
            :percentage="scope.row.progress|toNumber"
            :status="scope.row.status">
          </el-progress>
        </template>
      </el-table-column>
      <el-table-column
        prop="submitTime"
        label="提交日期"
        width="200">
      </el-table-column>
      <el-table-column
        prop="finishTime"
        label="完成日期"
        width="200">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-view"
            @click="editRow(scope.$index, scope.row)"
            type="text">
          </el-button>
          <el-button
            icon="el-icon-download"
            @click="download(scope.$index, scope.row)"
            type="text">
          </el-button>
          <el-button
            icon="el-icon-delete"
            @click.native.prevent="deleteRow(scope.$index, scope.row)"
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
    import Vue from 'vue';
    Vue.filter("toNumber",function(value){
      return parseInt(value)
    })
    export default {
      name: "proTable",
      components: {
        "map-dialog": MapDialog,
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
          task:[]
        }
      },
      // props:{
      //     tasks:Array,
      // },
      methods:{
        deleteRow(index, rows) {
          rows.splice(index, 1);
          //TODO 在数据中删除
        },
        download() {
          //下载数据
          },
        getProjectData(){
          let obj = this;
          this.$axios.get(
            // url:'http://192.168.240.25/dldsj/parallel/jobs/user',
            'http://192.168.1.5:8080/dldsj/parallel/jobs/user')
            // url: '../../../static/json/allProjectD.json',
            // params:{ userid: "userid"},
          .then(res => {
            // obj.task = res.data.body;
            if (res.code == "200"){
              let resArray = res.body;
              for (let index in resArray) {
                let singleData = resArray[index];
                if (singleData.record.state != "FINISHED") {
                  let row = singleData.record;
                  row.progress = singleData.monitor.progress;
                  obj.task.push(row);
                } else {
                  let row = singleData.record;
                  row.progress = 100;
                  row.status = "success";
                  obj.task.push(row)
                }
              }
            }
          })

            // else {
            //     var superviseTimer = setInterval(function () {
            //       obj.$axios({
            //         method: "GET",
            //         // url: 'http://192.168.240.25:3000/dldsj/parallel/monitor/' + obj.jobName,
            //         url: 'http://192.168.1.5:3000/dldsj/parallel/monitor/' + obj.jobName,
            //         headers: {//设置跨域头
            //           'Content-Type': 'application/x-www-form-urlencoded'
            //         }
            //       }).then(function (response) {
            //         // alert(''.concat(response.data.code));
            //         if (response.data.code !== 200) {
            //           clearInterval(superviseTimer);
            //         } else {
            //           obj.$refs.progress.percentage = response.data.body.progress;
            //           if (response.data.body.state === "FINISHED") {
            //             clearInterval(superviseTimer);
            //             if (response.data.body.finalStatus === "SUCCEEDED") {
            //               obj.$refs.download.disabled = false;
            //               console.log(33333)
            //               obj.$refs.progress.status = "success";
            //               console.log(obj.status)
            //             }
            //           } else if (response.data.body.state === "KILLED") {
            //             clearInterval(superviseTimer);
            //             obj.$refs.progress.status = "exception";
            //           }
            //         }
            //       }).catch(function (error) {
            //         // alert(error);
            //       })
            //     }, 5000);
            //   }
            // }
          .catch(function (error) {
            obj.$message.error('获取项目数据失败!');
          });
        }
      },
      mounted(){
        this.getProjectData()
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

