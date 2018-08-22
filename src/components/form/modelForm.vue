<template>
  <div>
    <el-form :model="paramsFormData" :rules="rules" ref="paramsFormData">
      <h4>模型参数</h4>
      <el-form-item v-for="(value,key) in paramsFormData" :prop="key" :key="key" :label="paramsFormDataName[key]">
        <span v-if="form_list[key].datatype== 'Integer'">
          <el-input v-model.number="paramsFormData[key]" :placeholder="'请输入'+paramsFormDataName[key]"></el-input>
        </span>
        <span v-else>
          <el-input v-model="paramsFormData[key]" :placeholder="'请输入'+paramsFormDataName[key]"></el-input>
        </span>
      </el-form-item>
      <span id="watch">
          <el-button type="success" @click="submit">提交</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
      </span>
    </el-form>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: "modelForm",
    data() {
      return {
        paramsFormData: {},
        paramsFormDataName: {},
        rules: {}
      }
    },
    props: {
      form_list: Array,
      artifactId: String,
      dialogVisible: Object
    },
    methods: {
      reset() {
        this.$refs["paramsFormData"].resetFields();
      },
      submit() {
        let obj = this;
        this.$refs["paramsFormData"].validate((valid) => {
          if (valid) {
            let modelparamData = {};
            // modelparamData.user = "ubt";
            let para = [];
            for (let i = 0; i < Object.keys(obj.paramsFormData).length - 1; i++) {
              para.push(obj.paramsFormData["" + (i + 1)])
            }
            modelparamData.params = para;
            modelparamData.customname = this.paramsFormData["0"];
            this.$axios.post(
              // url: 'http://192.168.240.25:3000/dldsj/parallel/use/' + this.artifactId,
              '/parallel/use/' + this.artifactId, modelparamData
            ).then(function (response) {
              if (response.code === 200) {
                obj.$message({
                  type: 'success',
                  message: '模型提交成功!请前往模型项目查看运行进度！'
                });
              }
            }).catch(function (error) {
              obj.$message.error('模型提交失败!');
            });
            let visible = this.dialogVisible;
            visible.v = false;
            this.$emit("update:dialogVisible", visible)
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
    },
    watch: {
      form_list: {
        handler: function (newValue, oldValue) {
          this.paramsFormData = {};
          this.paramsFormDataName = {};
          this.rules = {};
          for (let i = 0; i < newValue.length; i++) {
            let param = i;
            Vue.set(this.paramsFormData, param, "");
            this.paramsFormDataName[param] = newValue[i].name;
            console.log(newValue[i].datatype)
            this.rules[param] = [];
            let ruleMessage = {};
            let ruleRequire = {};
            if (newValue[i].datatype === 'Integer') {
              ruleRequire["type"] = 'number';
              ruleRequire["message"] = '参数必须为整数值';
            } else {
              ruleRequire["type"] = '';
              ruleRequire["message"] = '';
            }
            ruleMessage["message"] = '请输入' + newValue[i].name;
            ruleMessage["required"] = true;
            ruleMessage["trigger"] = 'blur';
            ruleRequire["trigger"] = 'blur';
            this.rules[param][0] = ruleMessage;
            this.rules[param][1] = ruleRequire;
          }
        }
      }
    },
    mounted() {
    }
  }
</script>

<style>

</style>
