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
      v-model="checkRememberPwd"
      :error-messages="checkRememberPwdErrors"
      label="记住密码"
      required
      @change="$v.checkRememberPwd.$touch()"
      @blur="$v.checkRememberPwd.$touch()"
    ></v-checkbox>
    <v-checkbox
      v-model="checkAutoLogin"
      :error-messages="checkAutoLoginErrors"
      label="自动登录"
      required
      @change="$v.checkAutoLogin.$touch()"
      @blur="$v.checkAutoLogin.$touch()"
    ></v-checkbox>
    <v-btn @click="submit">登录</v-btn>
    <v-btn @click="clear">重置</v-btn>
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
      checkRememberPwd: { required },
      checkAutoLogin: { required }
    },
    data: () => ({
      name: '',
      password: '',
      checkRememberPwd: false,
      checkAutoLogin: false
    }),
    computed: {
      checkRememberPwdErrors () {
        const errors = []
        if (!this.$v.checkRememberPwd.$dirty) return errors
        !this.$v.checkRememberPwd.required && errors.push('You must agree to continue!')
        return errors
      },
      checkAutoLoginErrors () {
        const errors = []
        if (!this.$v.checkAutoLogin.$dirty) return errors
        !this.$v.checkAutoLogin.required && errors.push('You must agree to continue!')
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
        let that = this;
        let expires = 60 * 60 * 1000;//cookie生存周期
        that.$v.$touch();
        that.$axios.post('user/login', {
            name: that.name,
            pass: md5.hex(that.password)//TODO:对应数据库的密码加密方式，此处是md5加密
          }).then(function(res){
          if (res.code == 200) {
            if (that.checkRememberPwd) {//是否记住密码
              that.$cookie.setCookie("bremember","true", expires);
              that.$cookie.setCookie("userid",res.body, expires);
              that.$cookie.setCookie("username",that.name, expires);
              that.$cookie.setCookie("password",that.password, expires);
              if(that.checkAutoLogin){that.$cookie.setCookie("bautologin","true", expires);}
              else                    {that.$cookie.setCookie("bautologin","false", expires);}
            }
            else{
              that.$cookie.setCookie("bremember","false", expires);
              if(that.checkAutoLogin){
                that.$cookie.setCookie("userid",res.body)
                that.$cookie.setCookie("username",that.name, expires);
                that.$cookie.setCookie("password",that.password, expires);//也是要set不然可能之前的状态并不是记住密码所以没保存用户名密码
                that.$cookie.setCookie("bautologin","true", expires);//不记住密码但自动登录
              }
              else{
                that.$cookie.setCookie("bautologin","false",expires);
                that.$cookie.delCookie("userid");
                that.$cookie.delCookie("username");
                that.$cookie.delCookie("password");//不记住密码不自动登录则clear
              }
            }
            //弹窗提示登录成功
            that.$Bus.$emit("alertModalParams", {
              alertType: "success",
              alertDescription: "用户" + "niran" + "登录成功"
              // alertDescription: "用户" + that.name + "登录成功"
            });
            //关闭用户登录dialog
            that.$Bus.$emit("userDialogParams", {
              dialogVisible: false
            });
            //登录状态变化，触发sessionStorage赋值
            that.$store.dispatch("setUser", res.body);//dispatch异步分发，commit同步提交
            //跳转页面
            if(that.$route.query.redirect) {  that.$router.push(that.$route.query.redirect);}
            else {  that.$router.push('/dataSource/perData');
            }
          }
          else{
            that.$Bus.$emit("alertModalParams", {
              alertType: "warning",
              alertDescription: "用户名或密码错误"
            });
            that.$Bus.$emit("userDialogParams", {
              dialogVisible:false
            }) };
        }).catch(function(err){
          that.$Bus.$emit("alertModalParams", {
            alertType: "error",
            alertDescription: err
          });
          that.$Bus.$emit("userDialogParams", {
            dialogVisible:false
          }) });
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.password = ''
        this.checkbox = false
      }
    },
    created(){
      this.$Bus.$on("userFormParams",(data)=> {
        this.name = data.username;
        this.password = data.password;
        this.checkRememberPwd = data.bremember;
        this.checkAutoLogin = data.bautologin;
      });
    }
  }
</script>

<style scoped>
  @import "../../../static/css/icon.css";
</style>
