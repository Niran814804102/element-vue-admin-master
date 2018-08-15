<template>
  <div>
    <div id="tool">
      <el-button type="primary" icon="el-icon-plus" circle disabled
      ></el-button>
      <el-button type="primary" icon="el-icon-delete" circle disabled></el-button>
      <el-button type="primary" icon="el-icon-refresh" circle @click="refresh()"></el-button>
    </div>


    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="card in cards" :key="card.artifactId">
          <v-modelCard :card="card"></v-modelCard>
        </v-flex>
      </v-layout>
    </v-container>
    <v-modelDialog></v-modelDialog>
    <!--<v-signDialog :visible.sync="signVisible"></v-signDialog>-->
  </div>
</template>

<script>
  import modelCard from '../../components/card/modelCard.vue';
  import modelDialog from '../../components/dialog/modelDialog.vue';
  import modelSign from './modelSign.vue';

  export default {
    name: "modelcompute",
    data() {
      return {
        cards: null,
        modalTitle: "",
        centerDialogVisible: false,
        isVisible: false,
        // signVisible:{
        //   v:true
        // }
      }
    },
    components: {
      "v-modelCard": modelCard,
      "v-modelDialog": modelDialog,
      // "v-signDialog":modelSign
    },
    methods: {
      getModelData: function () {
        this.$axios({
          method: "GET",
          // params:{ userid: "userid"},
          // url: 'http://192.168.240.25:3000/dldsj/parallel/get',
          url:'../../../static/json/modelData.json',
          headers: {//设置跨域头
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          this.cards = res.data.body;
        })
          .catch(function () {
            console.log(error);
          })
      },
      // editRow:function(){
      //   this.signVisible.v=true
      // },
      refresh: function () {
        this.$axios({
          method: "GET",
          url: 'http://192.168.240.25:3000/dldsj/parallel/get',
          headers: {//设置跨域头
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          this.cards = res.data.body;
        })
          .catch(function () {
            console.log(error);
          })
      }
    },
    mounted: function () {
      this.getModelData()
    }
  }
</script>

<style scoped>
  #tool {
    padding: 0 0 0 10px;
  }
</style>
