<template>
  <div style="width:95%;margin: 10px auto;">
    <el-row style="margin-left: 15px">
      <div id="tool">
        <el-button title="注册模型" type="primary" icon="el-icon-plus" circle @click="signDialog()"
        ></el-button>
        <el-button title="列表刷新" type="primary" icon="el-icon-refresh" circle @click="refresh()"></el-button>
      </div>
    </el-row>
    <el-row>
      <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 v-for="card in cards" :key="card.artifactId">
            <v-modelCard :card="card" v-on:childRefresh="refresh"></v-modelCard>
          </v-flex>
        </v-layout>
      </v-container>
    </el-row>
    <v-modelDialog></v-modelDialog>
    <v-signDialog :sign-visible="signVisible" v-on:childRefresh="refresh"></v-signDialog>
    <v-modelInfoDialog></v-modelInfoDialog>
  </div>

</template>

<script>
  import modelCard from '../../components/card/model-card.vue';
  import modelDialog from '../../components/dialog/model-dialog.vue';
  import signDialog from '../../components/dialog/sign-dialog.vue';
  import modelInfoDialog from '../../components/dialog/modelInfo-dialog.vue';

  export default {
    name: "modelcompute",
    data() {
      return {
        cards: null,
        modalTitle: "",
        centerDialogVisible: false,
        isVisible: false,
        signVisible: {
          v: false,
        },
        modelInfoVisible:false
      }
    },
    components: {
      "v-modelCard": modelCard,
      "v-modelDialog": modelDialog,
      "v-signDialog": signDialog,
      "v-modelInfoDialog": modelInfoDialog
    },
    methods: {
      getModelData: function () {
        this.$axios.get(
          // params:{ userid: "userid"},
          //  'http://192.168.240.25:3000/dldsj/parallel/get',
          '/parallel/get')
          .then(res => {
            this.cards = res.body;
            this.cards.forEach(model => {
              model.picPath = this.$serverUrl + model.picPath;
            })
          }).catch(function () {
          console.log(error);
        })
      },
      // editRow:function(){
      //   this.signVisible.v=true
      // },
      refresh: function () {
        let obj = this;
        this.$axios.get('/parallel/get')
          .then(res => {
            this.cards = res.body;
            this.cards.forEach(model => {
              model.picPath = this.$serverUrl + (model.picPath||'static/default.png');
            })
          })
          .catch(function () {
            obj.$message.error('刷新失败!');
          })
      },
      signDialog: function () {
        this.signVisible.v = true
      }
    },
    mounted: function () {
      this.getModelData()
    },
  }
</script>

<style>
  #tool {
    padding: 0 10px 0 0;
    float: right;
  }
</style>
