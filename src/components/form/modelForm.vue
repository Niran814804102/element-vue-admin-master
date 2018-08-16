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
      getdata() {
        let data = {};
        data.user = "ubt";
        for(let index in this.paramsFormData){
          data[parseInt(index)+1]=this.paramsFormData[index];
        }
        return data;
      },
      show() {
        console.log(this.paramsFormData[0])
        console.log(this.paramsFormData.length)
      },
      clearData() {
        this.paramsFormData = [];
      },
      // submit() {
      //
      // }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
