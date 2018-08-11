<template>
  <div>
    <alert-modal></alert-modal>
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
  import infoCard from '../../components/card/infoCard.vue';
  import alertModal from '../../components/alert/alertModal.vue';
  import MapDialog from "../../components/dialog/mapDialog";

  export default {
    name: "perData",
    data(){
      return {
        cards: null,
        alertVisible: false,
        alertType:"success",
        alertDescription:"No description",
        dialogVisible:{
          v:false,
          clickModalClose:false//模态框是否显示
        },
        dialogTitle:"",
        queryUrl:"",
        queryParams:null
      }
    },
    components: {
      "info-card": infoCard,
      "alert-modal": alertModal,
      "map-dialog": MapDialog
    },
    watch:{
    },
    methods: {
      getDataByUserID: function(){
        this.$axios.get('static/json/personalData.json',{
          params:{ userid: "userid"}
        }).then(res=>{this.cards = res.data;
        }).catch(function(){console.log(error);})
      },
      setMapDialogParams: function(params){
        this.dialogVisible = params.dialogVisible;
        this.dialogTitle = params.dialogTitle;
        this.queryUrl = params.queryUrl;
        this.queryParams = params.queryParams;
      }
    },
    mounted: function(){
      this.getDataByUserID()
    }
  }
</script>

<style>

</style>
