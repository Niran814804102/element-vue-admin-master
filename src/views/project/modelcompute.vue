<template>
  <div>
    <div id="tool">
      <el-button type="primary" icon="el-icon-plus" circle @click="signDialog()"
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
    <v-signDialog :sign-visible="signVisible"></v-signDialog>
  </div>
</template>

<script>
  import modelCard from '../../components/card/modelCard.vue';
  import modelDialog from '../../components/dialog/modelDialog.vue';
  import testDialog from '../../components/dialog/testDialog.vue';

  export default {
    name: "modelcompute",
    data() {
      return {
        cards: null,
        modalTitle: "",
        centerDialogVisible: false,
        isVisible: false,
        signVisible:{
          v:false,
          clickModalClose:false
        }
      }
    },
    components: {
      "v-modelCard": modelCard,
      "v-modelDialog": modelDialog,
      "v-signDialog":testDialog
    },
    methods: {
      getModelData: function () {
        this.$axios.get(
          // params:{ userid: "userid"},
          // url: 'http://192.168.240.25:3000/dldsj/parallel/get',
          '../../../static/json/modelData.json')
          .then(res => {
          this.cards = res.data.body;}).
        catch(function () {
            console.log(error);
          })
      },
      // editRow:function(){
      //   this.signVisible.v=true
      // },
      refresh: function () {
        this.$axios.get('http://192.168.240.25:3000/dldsj/parallel/get')
          .then(res => {this.cards = res.data.body;})
          .catch(function () {console.log(error);})
      },
      signDialog:function(){
        this.signVisible.v=true
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
