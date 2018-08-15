<template>
  <div>
    <el-form ref="formName">
      <h4>模型参数</h4>
      <el-form-item v-for="(item,i) in form_list" :key="item.name" :label="item.name">
        <el-input v-model='paramsFormData[i]' :placeholder="'请输入'+item.name" required:true
                  show-message:true></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "modelForm",
    data() {
      return {
        paramsFormData: [],
      }
    },
    props: {form_list: Array},

    methods: {
      submit() {
        let data = {};
        data.user = "ubt";
        for (item in this.form) {

        }
      },
      show() {
        console.log(this.paramsFormData[0])
        console.log(this.paramsFormData.length)
      },
      clearData() {
        debugger;
        this.paramsFormData = [];
      },
      submit() {
        debugger;

      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
