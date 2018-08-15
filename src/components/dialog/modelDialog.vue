<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible.v"
      :close-on-click-modal="dialogVisible.clickModalClose">
      <div v-show="visible">
        <v_myForm :form_list="Modelparams" ref="myForm"></v_myForm>

        <span id="watch" slot="footer" class="dialog-footer">
          <el-button type="success" @click="submit">submit</el-button>
          <el-button type="primary" @click="reset">reset</el-button> </span>
      </div>
      <div v-show="progressVisible">
        <h6>任务进度</h6>
        <el-progress ref="progress" :percentage="0"></el-progress>
        <el-button @click="download()" ref="download" :disabled="true">结果下载</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import myForm from '../form/form';
  import vueEven from '../../resource/vueEvent.js';
  import allproject from'../../views/project/allproject'

  export default {
    name: "model-dialog",
    // props: {
    //   artifactId: {type: String},
    // },
    data() {
      return {
        Modelparams: [],
        formData: [],
        dialogVisible: Object,
        visible: true,
        progressVisible: false,
        artifactId: '',
        jobName: '',
      }
    },
    methods: {

      initParallelModel() {
        this.$axios({
          method: "GET",
          // params: {artifactId: this.artifactId},
          url: 'http://192.168.240.25:3000/dldsj/parallel/get/' + this.artifactId,
          // url:'../../../static/json/modelData.json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
            this.Modelparams = JSON.parse(res.data.body.parameters);
          }
        ).catch(function (error) {
          console.log(error);
        });
        this.visible = true;
        this.progressVisible = false;
        if (this.$refs.myForm)
          this.$refs.myForm.clearData();
      },
      reset() {
        if (this.$refs.myForm)
          this.$refs.myForm.clearData();
      },
      submit() {
        // this.linkTo(allproject);
        var obj = this;
        let modelparamData = {};
        modelparamData.user = "ubt";
        let params = this.$refs.myForm.getData();
        modelparamData.params = params;
        modelparamData.customname = params["1"];
        this.$axios({
          method: "POST",
          url: 'http://192.168.240.25:3000/dldsj/parallel/use/' + this.artifactId,
          data: JSON.stringify(modelparamData),
          headers: {//设置跨域头
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          alert(''.concat(response.data.code));
          obj.jobName = response.data.body;
        }).catch(function (error) {
          alert(error);
        });

        this.visible = false;
        this.progressVisible = true;
        var superviseTimer = setInterval(function () {
          obj.$axios({
            method: "GET",
            url: 'http://192.168.240.25:3000/dldsj/parallel/monitor/' + obj.jobName,
            headers: {//设置跨域头
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function (response) {
              // alert(''.concat(response.data.code));
              if (response.data.code !== 200) {
                clearInterval(superviseTimer);
              } else {
                obj.$refs.progress.percentage = response.data.body.progress;
                if (response.data.body.state === "FINISHED") {
                  clearInterval(superviseTimer);
                  if (response.data.body.finalStatus === "SUCCEEDED") {
                    obj.$refs.download.disabled = false;
                    console.log(33333)
                    obj.$refs.progress.status = "success";
                    console.log(obj.status)
                  }
                } else if (response.data.body.state === "KILLED") {
                  clearInterval(superviseTimer);
                  obj.$refs.progress.status = "exception";
                }
              }
          }).catch(function (error) {
            // alert(error);
          })
        }, 5000);
      },
      download() {
        // this.$axios({
        //   method:"GET",
        //   url:'http://192.168.240.25:3000/dldsj/parallel/result/download/'+this.jobName,
        //   headers: {//设置跨域头
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   }
        // }).then(function (response) {
        //   console.log(''.concat(response.data.code));
        // }).catch(function (error) {
        //   console.log(error);
        // });
        window.open('http://192.168.240.25:3000/dldsj/parallel/result/download/' + this.jobName, 'blank');
      }
    },
    components: {
      "v_myForm": myForm,
    },
    mounted() {
      vueEven.$on('pop', (dialogVisible, artificatId) => {
        this.dialogVisible = dialogVisible;
        this.artifactId = artificatId;
        this.initParallelModel();
      })
    }
  }
</script>
<style>
  /*@import "../../../static/css/ol-debug.css";*/
  .el-dialog__body {
    padding: 0px 20px 20px 20px;
  }
</style>
