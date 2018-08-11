<template>
  <div id="modelForm">
    <v-app>
      <v-form ref="form" v-model="valid" lazy-validation >
        <model-form-text v-show="formVisible"></model-form-text>
        <v-btn
          :disabled="!valid"
          @click="submit"
        >
          submit
        </v-btn>
        <v-btn @click="clear()" >clear</v-btn>
      </v-form>
    </v-app>
  </div>
</template>

<script>
    import modelFormText from './modelFormText.vue'
    export default {
      name: "modelForm",
      components:{
        "model-form-text": modelFormText
      },
      props:{
        formVisible:{ type: Boolean, default: true }
      },
      data(){
        return { valid: true }
      },
      methods: {
        submit() {
          if (this.$refs.form.validate()) {
            // Native form submission is not yet supported
            this.$axios.post('api/submit', {
              name: this.missionName,
              pointFile: this.pointFile,
              outputFile: this.outputFile,
              classNum: this.classNum,
              plusNum:this.plusNum,
              minNum:this.minNum
            });
            this.formVisible=false
          }
        },
        clear() {
          this.$refs.form.reset()
          console.log(v.value)
        }
      }
    }
</script>

<style scoped>

</style>
