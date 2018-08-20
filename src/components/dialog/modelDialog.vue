<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible.v">
      <div>
        <v_myForm :form_list="Modelparams" ref="myForm"></v_myForm>

        <span id="watch" slot="footer" class="dialog-footer">
          <el-button type="success" @click="submit">提交</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </span>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import myForm from '../form/modelForm';
  import vueEven from '../../resource/vueEvent.js';

  export default {
    name: "model-dialog",
    data() {
      return {
        Modelparams: [],
        formData: [],
        dialogVisible: Object,
        artifactId: '',
        jobName: '',
      }
    },
    components: {
      "v_myForm": myForm,
    },
    methods: {
      initParallelModel() {
        let obj=this;
        this.$axios.get(
          // url: 'http://192.168.240.25:3000/dldsj/parallel/get/' + this.artifactId,
          'http://192.168.1.5:8080/dldsj/parallel/get/' + this.artifactId)
          // '../../../static/json/perModelData.json')
          .then((res) => {
            this.Modelparams = JSON.parse(res.body.parameters);
          }
        ).catch(function (error) {
          console.log(error);
          obj.$message.error('模型参数获取失败!');
        });
        if (this.$refs.myForm)
          this.$refs.myForm.clearData();
      },
      reset() {
        if (this.$refs.myForm)
          this.$refs.myForm.clearData();
      },
      submit() {
        let obj = this;
        let modelparamData = {};
        modelparamData.user = "ubt";
        let params = this.$refs.myForm.getdata();
        console.log(params)
        modelparamData.params = params;
        modelparamData.customname = params["1"];
        console.log(modelparamData)
        this.$axios.post(
          // url: 'http://192.168.240.25:3000/dldsj/parallel/use/' + this.artifactId,
          'http://192.168.1.5:8080/dldsj/parallel/use/' + this.artifactId,
          modelparamData
        ).then(function (response) {
          // alert(''.concat(response.data.code));
          if(response.code=='200'){
            obj.$message({
              type: 'success',
              message: '模型提交成功!请前往模型项目查看运行进度！'
            });
          }
        }).catch(function (error) {
          obj.$message.error('模型提交失败!');
        });
          this.dialogVisible.v= false;
      },



      // download() {
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
      //   window.open('http://192.168.1.5:8080/dldsj/parallel/result/download/' + this.jobName, 'blank');
      // }
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
