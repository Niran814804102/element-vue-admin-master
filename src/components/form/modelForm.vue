<template>
  <div>
    <el-form ref="ruleForm" >
      <h4>模型参数</h4>
      <el-form-item  v-for="(item,i) in form_list" :key="item.name" :label="item.name">
        <el-input v-model='paramsFormData[i]' :placeholder="'请输入'+item.name"></el-input>
      </el-form-item>
      <!--<el-form-item>-->
        <!--<el-button type="success" @click="submit">提交</el-button>-->
        <!--<el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>-->
      <!--</el-form-item>-->
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "modelForm",
    data() {
      return {
        paramsFormData: [],
        // rules:{
        //   forall:[{required:true,message:'请正确填写参数'}]
        // },
        // ruleForm:{
        //   forall:''
        // }
      }
    },
    props: {form_list: Array},
    methods: {
      getdata() {
        let data = {};
        data.user = "ubt";
        for(let index in this.paramsFormData){
          data[parseInt(index)+1]=this.paramsFormData[index];
        }
        return data;
      },
      clearData() {
        this.paramsFormData = [];
      },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // },
      // submit() {
      //   let obj = this;
      //   let modelparamData = {};
      //   modelparamData.user = "ubt";
      //   let params = this.getdata();
      //   console.log(params)
      //   modelparamData.params = params;
      //   modelparamData.customname = params["1"];
      //   console.log(modelparamData)
      //   this.$axios.post(
      //     // url: 'http://192.168.240.25:3000/dldsj/parallel/use/' + this.artifactId,
      //     'http://192.168.1.5:8080/dldsj/parallel/use/' + this.artifactId,
      //     modelparamData
      //   ).then(function (response) {
      //     // alert(''.concat(response.data.code));
      //     if(response.code=='200'){
      //       obj.$message({
      //         type: 'success',
      //         message: '模型提交成功!请前往模型项目查看运行进度！'
      //       });
      //     }
      //   }).catch(function (error) {
      //     obj.$message.error('模型提交失败!');
      //   });
      //   this.$emit("dialogVisible.v=false");
      // },

    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
