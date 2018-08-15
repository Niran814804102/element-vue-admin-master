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
          <v-btn flat @click="userLogin()"><i class="fa fa-sign-out fa-md" style="color:#ff3135"></i>&nbsp;退出</v-btn>
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

<style scoped >
  .layout-ceiling {
    color: #4a4e55;
    background: #f6f8fb;
    /*padding: 0;*/
    height: 40px;
    overflow: hidden;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  }



  /*.layout-ceiling-main a {*/
    /*border-left: 1px solid #cccccc;*/
    /*color: #9ba7b5;*/
    /*padding: 0 10px;*/
    /*margin: 10px 0;*/
    /*text-align: center;*/
    /*cursor: pointer;*/
    /*font-size: 14px;*/
    /*line-height: 14px;*/
    /*position: relative;*/
  /*}*/

  /*.layout-ceiling-main a:hover {*/
    /*color: #fff;*/
  /*}*/
  /*.layout-ceiling .avatar {*/
    /*float: right;*/
    /*margin-right: 1em*/
  /*}*/
  /*.layout-ceiling .avatar img {*/
    /*width: 40px;*/
    /*height: 40px;*/
    /*border-radius: 20px;*/
    /*margin-left: 10px;*/
    /*float: right;*/
  /*}*/


</style>
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
    methods: {
      userLogin() {
        this.dialogVisible.v = true
      }
    }
  }
</script>
