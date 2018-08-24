<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible.v">
      <div>
        <v_myForm :form_list="Modelparams" :dialogVisible.sync="dialogVisible" :artifactId="artifactId" ref="myForm"></v_myForm>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import myForm from '../form/modelForm';

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
        this.Modelparams=[];
        let obj=this;
        this.$axios.get(
          // url: 'http://192.168.240.25:3000/dldsj/parallel/get/' + this.artifactId,
          '/parallel/get/' + this.artifactId)
          .then((res) => {
            let modelpara = [{"default":"default","datatype":"String","name":"任务名称","description":"一个SPARK任务的名称"}];
            this.Modelparams = modelpara.concat(JSON.parse(res.body.parameters));
          }
        ).catch(function (error) {
          console.log(error);
          obj.$message.error('模型参数获取失败!');
        });
        if (this.$refs.myForm)
            this.$refs.myForm.reset();
      },
      reset() {
        if (this.$refs.myForm)
          this.$refs.myForm.reset();
      },
      submit() {
        let obj = this;
        let modelparamData = {};
        modelparamData.user = "ubt";
        let params = this.$refs.myForm.getdata();
        modelparamData.params = params;
        modelparamData.customname = params["1"];
        this.$axios.post(
          // url: 'http://192.168.240.25:3000/dldsj/parallel/use/' + this.artifactId,
          '/parallel/use/' + this.artifactId,
          modelparamData
        ).then(function (response) {
          if(response.code===200){
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
    },
    mounted() {
      this.$Bus.$on('pop', (dialogVisible, artificatId) => {
        this.dialogVisible = dialogVisible;
        this.artifactId = artificatId;
        this.initParallelModel();
      })
    }
  }
</script>
<style>
  .el-dialog__body {
    padding: 0px 20px 20px 20px;
  }
</style>
