<template>
  <div>
    <div class="layout-ceiling">
      <v-toolbar height="40px">
        <v-toolbar-title class="height--text">地理大数据时空解析原型系统</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat><i class="fa fa-user-circle-o fa-md"></i>&nbsp;个人中心</v-btn>
          <v-btn flat><i class="fa fa-bell-o fa-md"></i>&nbsp;消息</v-btn>
          <v-btn flat><i class="fa fa-question-circle-o fa-md"></i>&nbsp;帮助</v-btn>
          <v-btn flat @click="userLogin()" v-show="!isUserLogin"><i class="fa fa-sign-in fa-md" style="color:#409EFF"></i>&nbsp;登录</v-btn>
          <v-btn flat @click="userLogout()" v-show="isUserLogin"><i class="fa fa-sign-out fa-md" style="color:#ff3135"></i>&nbsp;退出</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>

    <div>
      <!--container会使面包屑等不显示-->
      <!--<v-container grid-list-xl text-xs-center>-->
        <user-dialog :dialogVisible="dialogVisible"></user-dialog>
      <!--</v-container>-->
    </div>

  </div>
</template>

<script>
  import userDialog from "../../components/dialog/userDialog";

  export default {
    name: 'ceiling',
    components: {
      "user-dialog": userDialog
    },
    data: () => ({
      links: [
        '个人中心',
        '消息',
        '帮助',
        '退出'
      ],
      dialogVisible: {
        v: false,
        clickModalClose: false
      }
    }),
    methods:{
      userLogin(){
        this.dialogVisible.v = true;
        //获取cookie，传到userDialog
        let cookie_username = this.$cookie.getCookie("username");
        let cookie_password = this.$cookie.getCookie("password");
        let cookie_bremember = this.$cookie.getCookie("bremember");
        let cookie_bautologin = this.$cookie.getCookie("bautologin");
        if(cookie_bremember == "false"){
          cookie_password = "";
        }
        Bus.$emit("userFormParams", {
          username: cookie_username,
          password: cookie_password,
          bremember: cookie_bremember,
          bautologin: cookie_bautologin
        });
      },
      //从后台获取session，然后存储在sessionStorage里
      getSession(){
        let that = this;
        that.$axios.post('http://localhost:8090/AncientMap/sessionGet.action')
          .then(function(res){
            sessionStorage.setItem("userid", res.body.userid);//此处session.id为int,但是sessionStorage.id变成了string
            sessionStorage.setItem("username", res.body.username);
            sessionStorage.setItem("authority", res.body.authority);})
          .catch(function(){
            that.$Bus.$emit("alertModalParams", {
              alertVisible: true,
              alertType: "error",
              alertDescription: "session获取失败"
          });
        })
      },
      userLogout(){
        let expires = 60 * 60 * 1000;//1h
        let that = this;
        that.$axios.post('http://localhost:8090/AncientMap/logout.action')
          .then(function(res){
          if (res.code == 200) {
            //弹窗提示登录成功
            that.$cookie.setCookie("bautologin", "false", expires);
            that.$Bus.$emit("alertModalParams", {
              alertVisible: true,
              alertType: "success",
              alertDescription: "用户注销成功"
            });
            //登录状态变化，触发sessionStorage赋值
            that.$store.dispatch("setUser", null);//dispatch异步分发，commit同步提交
            that.$router.push({//注销时页面跳转到公共数据
              name: 'pubData'
            });
          }
          else{
            that.$Bus.$emit("alertModalParams", {
              alertVisible: true,
              alertType: "warning",
              alertDescription: "用户注销失败"
            });
          };})
          .catch(function(err){
            that.$Bus.$emit("alertModalParams", {
            alertVisible: true,
            alertType: "error",
            alertDescription: err
          });});
      },
      //自动登录
      do_autologin(){
        let that = this;
        let cookie_username = this.$cookie.getCookie("username");
        let cookie_password = this.$cookie.getCookie("password");
        let cookie_bautologin = this.$cookie.getCookie("bautologin");
        if(cookie_bautologin != "true"){return;}
        this.$axios.post('http://localhost:8090/AncientMap/login.action',{
            username: cookie_username,//this.name,
            password: md5.hex(cookie_password)//TODO:对应数据库的密码加密方式，此处是md5加密
          }).then(function(res){
          if (res.code == 200) {
            //弹窗提示登录成功
            that.$Bus.$emit("alertModalParams", {
              alertVisible: true,
              alertType: "success",
              alertDescription: "用户" + cookie_username + "登录成功"
            });
            //登录状态变化，触发sessionStorage赋值
            that.$store.dispatch("setUser", cookie_username)//dispatch异步分发，commit同步提交
          }
          else{
            that.$Bus.$emit("alertModalParams", {
              alertVisible: true,
              alertType: "warning",
              alertDescription: "用户" + cookie_username + "登录失败"
            });};
        }).catch(function(err){
          that.$Bus.$emit("alertModalParams", {
            alertVisible: true,
            alertType: "error",
            alertDescription: err
          });
        });
      }
    },
    computed:{
      isUserLogin(){
        if(sessionStorage.getItem("username") != null){
          this.$store.commit("SET_USER_STATUS", sessionStorage.getItem("username"));
        }
        else{
          this.$store.commit("SET_USER_STATUS", null)
        }
        return this.$store.getters.isLogin;
      }
    },
    mounted(){
      this.do_autologin();
    }
  }
</script>
<style scoped >
  .layout-ceiling {
    color: #4a4e55;
    background: #f6f8fb;
    /*padding: 0;*/
    height: 40px;
    overflow: hidden;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  }
</style>
