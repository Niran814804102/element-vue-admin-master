<template>
  <div>
    <el-dialog
      title="模型参数"
      :visible.sync="dialogVisible.v"
      :close-on-click-modal="dialogVisible.clickModalClose">
        <model-form :form_list="Modelparams" ref="modelForm"></model-form>

        <span id="watch" slot="footer" class="dialog-footer">
          <el-button type="success"  @click="submit">submit</el-button>
          <el-button type="primary" @click="reset">reset</el-button> </span>
    </el-dialog>
  </div>

</template>

<script>
  import modelForm from '../form/modelForm.vue'
  export default {
    name: "model-dialog",
    props: {
      artifactId:{type:String}
    },
    data(){
      return{
        Modelparams:[],
        formData:[],
        dialogVisible: Object
      }
    },
    methods:{

      initParallelModel(){
        console.log("111");
        this.$axios.get('static/json/perModeldata.json',{
          params:{ artifactId: this.artifactId}
        }).then((res)=>{

              this.Modelparams = JSON.parse(res.data.body.parameters);
                      }
          ).catch(function(){
            console.log(error);})
      },
      reset(){
        debugger;
        this.$refs.modelForm.clearData();
      },
      submit(){
        debugger;
        this.$refs.modelForm.submit();
      }
    },
    components:{
      "model-form": modelForm,
    }
  }
</script>
<style>
  @import "../../../static/css/ol-debug.css";
  .el-dialog__body {
    padding: 0px 20px 20px 20px;
  }
</style>
