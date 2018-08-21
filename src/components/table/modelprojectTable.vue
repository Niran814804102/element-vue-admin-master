<template>
  <div>
    <el-table ref="mytable"
              :data="task"
              :default-sort="{prop: 'submitTime', order: 'descending'}"
              style="margin:0 auto;">
      <!--max-height="400px">-->
      <el-table-column
        prop="remarks"
        label="项目名称"
        width="fit-content"
        align="center">
      </el-table-column>
      <el-table-column
        label="进度"
        width="250"
        align="center">
        <template slot-scope="scope">
          <el-progress
            :percentage="scope.row.progress|toNumber"
            :status="scope.row.status">
          </el-progress>
        </template>
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="submitTime"
        label="提交日期"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="finishTime"
        label="完成日期"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
        align="center">
        <template slot-scope="scope">
          <el-button
            title="结果预览"
            :disabled="scope.row.view"
            @click="previewData(scope.$index, scope.row)"
            type="text">
            <i class="fa fa-table"></i>
          </el-button>
          <el-button
            title="结果上图"
            v-show="scope.row.btnVisible"
            :disabled="scope.row.map"
            @click="openDataResourceOnMap(scope.$index, scope.row)"
            type="text">
            <i class="fa fa-globe"></i>
          </el-button>
          <el-button
            title="结果下载"
            :disabled="scope.row.download"
            icon="el-icon-download"
            @click="download(scope.$index, scope.row)"
            type="text">
          </el-button>
          <el-button
            id="deletepro"
            :disabled="scope.row.delete"
            icon="el-icon-delete"
            @click.native.prevent="deleteRow(scope.$index, scope.row)"
            type="text">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  export default {
    name: "modelprojectTable",
    components: {},
    data() {
      return {
        task: [],
        // btnVisible:false
      }
    },
    filters: {
      toNumber: function (value) {
        return parseInt(value)
      }
    },
    methods: {
      deleteRow(index, rows) {
        let obj = this;
        //TODO 在数据中删除
        //调用删除数据的方法，再获取数据
        this.$confirm('是否删除该条模型运行记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          obj.$axios.remove('http://192.168.1.5:8080/dldsj/parallel/jobs/' + rows.applicationId + '/delete')
            .then(function (response) {
              if (response.code === 200) {
                obj.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                obj.$emit('childrefresh');
              }
            }).catch(function (error) {
            obj.$message.error("删除失败！");
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      download(index, rows) {
        //下载数据
        window.open('http://192.168.1.5:8080/dldsj/parallel/result/download/' + rows.applicationId, 'blank');
      },
      getProjectData() {
        let obj = this;
        this.$axios.get(
          // url:'http://192.168.240.25/dldsj/parallel/jobs/user',
          'http://192.168.1.5:8080/dldsj/parallel/jobs/user')
        // params:{ userid: "userid"},
          .then(res => {
            if (res.code === 200) {
              let resArray = res.body;
              for (let singleData of resArray) {
                let row = singleData.record;
                row.submitTime=obj.$date.formatTime(parseInt(row.submitTime));
                row.map=true;
                if(row.outputType!=="file"){
                  row.btnVisible=true;
                }else{row.btnVisible=false}
                let exist = false;
                for (let item of obj.task) {
                  if (item.applicationId === row.applicationId) {
                    exist = true;
                    break;
                  }
                }
                if (!exist) {
                  row.progress = 0;
                  row.download = true;
                  row.view = true;
                  row.delete = true;
                  obj.task.push(row);
                  if (singleData.record.state === "UNDEFINED") {
                    let superviseTimer = setInterval(function () {
                      obj.$axios.get('http://192.168.1.5:8080/dldsj/parallel/monitor/' + singleData.record.applicationId)
                        .then(function (response) {
                          if (response.code !== 200) {
                            clearInterval(superviseTimer);
                          } else {
                            if (response.body.finalStatus === "UNDEFINED") {
                              if(response.body.progress!==""){
                                row.progress = response.body.progress;
                              }
                              row.state = "RUNNING";
                              row.finishTime="";
                            } else if (response.body.finalStatus === "FAILED"
                              || response.body.finalStatus === "KILLED") {
                              clearInterval(superviseTimer);
                              row.status = "exception";
                              row.progress = response.body.progress;
                              //没有成功的话，没有完成时间
                              row.finishTime = "--";
                              row.state = response.body.finalStatus;
                              row.delete = false;
                            } else {
                              clearInterval(superviseTimer);
                              row.progress = response.body.progress;
                              row.status = "success";
                              row.state = "SUCCEEDED";
                              //成功的话，对完成时间进行赋值
                              row.finishTime = obj.$date.formatTime(parseInt(response.body.finishedTime));
                              row.download = false;
                              row.view = false;
                              row.delete = false;
                              row.map = false;
                            }
                          }
                        })
                    }, 5000);
                  } else if (singleData.record.state === "FAILED" || singleData.record.state === "KILLED") {
                    row.progress = 0;
                    row.status = "exception";
                    row.delete = false;
                    row.map=true;
                    row.finishTime=obj.$date.formatTime(parseInt(row.finishTime))
                  } else {
                    row.progress = 100;
                    row.status = "success";
                    row.download = false;
                    row.view = false;
                    row.delete = false;
                    row.map=false;
                    row.finishTime=obj.$date.formatTime(parseInt(row.finishTime))
                  }
                }
              }
            }
          }).catch(function (error) {
          obj.$message.error('获取项目数据失败!');
        });
      },
      //加载所点击的数据到地图上
      openDataResourceOnMap(index, row) {
        this.$Bus.$emit("mapDialogParams", {
          title: row.remarks,
          visible: true,
          queryUrl: "http://192.168.1.5:8080/dldsj/parallel/result/preview/"+ row.applicationId + "/geojson",
          queryParams: {
            offset: 0,
            size: 100//TODO:需要设置分页,注意offset要乘以size
          }
        });
      },
      previewData(index, row) {
        this.$Bus.$emit("dataDialogParams", {
          title: row.remarks,
          visible: true,
          queryUrl: "http://192.168.1.5:8080/dldsj/parallel/result/preview/"+ row.applicationId,
          queryParams: {
            offset: 0,
            size: 100//TODO:需要设置分页,注意offset要乘以size
          }
        });
      }
    },

    mounted() {
    },
  }
</script>

<style>
  .el-input--prefix .el-input__inner {
    border-radius: 20px;
  }

  .el-table td, .el-table th {
    background-color: #f8f8f9;
  }

  .el-table__empty-block {
    background-color: #f8f8f9;
  }

  .el-el-table-column {
    text-align: center;
  }
  #deletepro:hover{
    color:#fe6970;
  }
</style>

