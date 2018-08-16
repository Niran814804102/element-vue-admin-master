<template>
  <div>
    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="card in cards" :key="card.id">
          <info-card :card="card" v-on:mapDialogParams="setMapDialogParams"></info-card>
        </v-flex>
      </v-layout>
    </v-container>
    <map-dialog ref="mapdialog"
                :dialog-visible="dialogVisible" :dialog-title="dialogTitle" :query-url="queryUrl" :query-params="queryParams">
    </map-dialog>
  </div>
</template>

<script>
  import infoCard from '../../components/card/infoCard.vue'
  import MapDialog from "../../components/dialog/mapDialog"

  export default {
    name: "pubData",
    data(){
      return {
        cards: null,
        alertVisible: false,
        alertType:"success",
        alertDescription:"No description",
        dialogVisible:{
          v:false,
          clickModalClose: false
        },
        dialogTitle:"",
        queryUrl:"",
        queryParams:null
      }
    },
    components: {
      "info-card": infoCard,
      "map-dialog": MapDialog
    },
    watch: {},
    methods: {
      getData: function(){
        let that = this;
        that.$axios.get('static/json/personalData.json',{
          params:{ userid: "userid"}
        }).then(function(res){console.log(res);
        }).catch(function(err){console.log(err);})
      },
      setMapDialogParams: function(params){
        this.dialogVisible = params.dialogVisible;
        this.dialogTitle = params.dialogTitle;
        this.queryUrl = params.queryUrl;
        this.queryParams = params.queryParams;
      }
    },
    mounted: function(){
      this.getData()
    }
  }
</script>

<style>

</style>
