<template>
  <div>
    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="card in cards" :key="card.data.pkMetaID">
          <info-card :card="card"></info-card>
        </v-flex>
      </v-layout>
    </v-container>
    <map-dialog></map-dialog>
    <data-dialog></data-dialog>
    <data-info-dialog></data-info-dialog>
  </div>
</template>

<script>
  import infoCard from '../../components/card/infoCard.vue'
  import mapDialog from "../../components/dialog/mapDialog"
  import dataDialog from "../../components/dialog/dataDialog"
  import dataInfoDialog from "../../components/dialog/dataInfoDialog"

  export default {
    name: "perData",
    data(){
      return {
        cards: null,
        alertVisible: false,
        alertType:"success",
        alertDescription:"No description",
      }
    },
    components: {
      "info-card": infoCard,
      "map-dialog": mapDialog,
      "data-dialog": dataDialog,
      "data-info-dialog": dataInfoDialog
    },
    watch:{},
    methods: {
      getDataByUserID: function(){
        let that = this;
<<<<<<< HEAD
        that.$axios.get('../../../static/json/personalData.json', {
          userid: sessionStorage.getItem("userid")
        }).then(function(res){console.log(res);that.cards=res;
=======
        let offset = 0;
        let size = 100;
        that.$axios.get('http://192.168.1.5:8080/dldsj/user/data',
          { offset: offset,
            size: size,
          }).then(function(res){
          that.cards = res.body;
>>>>>>> 2d2df2fb2099104b73add32a360a6e9860258e72
        }).catch(function(err){console.log(err);})
      }
    },
    mounted: function(){
      this.getDataByUserID()
    }
  }
</script>

<style>

</style>
