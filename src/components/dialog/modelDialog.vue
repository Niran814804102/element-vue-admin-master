<template>
  <div>
    <el-dialog
      title="模型参数"
      :visible.sync="dialogVisible.v"
      :close-on-click-modal="dialogVisible.clickModalClose"
    >
      <model-form v-show="formVisible"></model-form>
    </el-dialog>
  </div>
</template>

<script>
  import "../../../static/js/ol-debug.js"
  import modelForm from '../form/modelForm.vue'
  export default {
    name: "modelDialog",
    data(){
      return{
        formVisible:true
      }
    },
    props: {
      dialogVisible: Object,
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
