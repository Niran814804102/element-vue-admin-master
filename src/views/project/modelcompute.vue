<template>
  <div>
    <div id="tool">
      <el-button type="primary" icon="el-icon-plus" circle @click="signshow()"></el-button>
      <el-button type="primary" icon="el-icon-delete" circle></el-button>
      <el-button type="primary" icon="el-icon-refresh" circle></el-button>

    </div>


    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="card in cards" :key="card.artifactId">
          <v-modelCard :card="card"></v-modelCard>
        </v-flex>
      </v-layout>
    </v-container>
    <v-modelDialog></v-modelDialog>
    <v-signDialog></v-signDialog>
  </div>
</template>

<script>
  import modelCard from '../../components/card/modelCard.vue';
  import modelDialog from '../../components/dialog/modelDialog.vue';
  import signDialog from './modelSign.vue';
  export default {
    name: "modelcompute",
    data(){
      return {
        cards: null,
        modalTitle: "",
        centerDialogVisible: false,
        isVisible:false,

      }
    },
    components: {
      "v-modelCard":modelCard,
      "v-modelDialog":modelDialog,
      "v-signDialog":signDialog
    },
    methods: {
      getModelData: function(){
        this.$axios.get('static/json/modelData.json',{
          params:{ userid: "userid"}
        }).then(res=>{this.cards = res.data.body;})
          .catch(function(){
            console.log(error);})
      }
    },
    mounted: function(){
      this.getModelData()
    },
    signshow(){

    }
  }
</script>

<style scoped>
 #tool{
   padding: 0 0 0 10px;
 }
</style>
