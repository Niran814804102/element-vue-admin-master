<template>
  <v-form lazy-validation >
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="用户名"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      label="密码"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="记住密码"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>
    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
  import { required, minLength, maxLength, sameAs, password } from 'vuelidate/lib/validators'
  import md5 from 'js-md5'

  export default {
    name: "userForm",
    validations: {
      name: { required, maxLength: maxLength(10), minLength: minLength(2) },//必填，最长8个字符，最短2个字符
      password: { required },
      checkbox: { required }
    },
    props:{
      formVisible:{ type: Boolean, default: true }
    },
    data: () => ({
      name: '',
      password: '',
      checkbox: false
    }),
    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.required && errors.push('You must agree to continue!')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most '+ this.$v.name.minLength +' characters long')
        !this.$v.name.minLength && errors.push('Name must be at least '+ this.$v.name.minLength + ' characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required')
        return errors
      }
    },
    methods: {
      submit () {
        this.$v.$touch()
        this.$axios({
          method: "POST",
          url: 'http://localhost:8090/AncientMap/login.action',
          params: {//params是添加到url中传参数，data是添加到请求体中传参数 TODO:需要修改此处的参数，现在是写死的
            username: "niran",//this.name,
            password: md5.hex("wanglijun1996071")//TODO:对应数据库的密码加密方式，此处是md5加密
          },
          datatype: "json",
          headers: {//设置跨域头
            'Content-Type': 'application/x-www-form-urlencoded'//保持参数以key-value的形式传到后台，若是application/json是以json字符串的形式传到后台
          }
        }).then(function(res){
          console.log(res.data)
        }).catch(function(){ console.log("sdasdasda") });
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.password = ''
        this.checkbox = false
      }
    }
  }
</script>

<style scoped>
  @import "../../../static/css/icon.css";
</style>
