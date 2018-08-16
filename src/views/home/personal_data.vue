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
      "map-dialog": MapDialog
    },
    watch:{
    },
    methods: {
      getDataByUserID: function(){
        let that = this;
        that.$axios.get('http://localhost:8090/AncientMap/getMapList.action', {
          userid: this.$cookie.getCookie("userid")
        }).then(
          function(res){
            console.log(res);
            let resultobj = $.parseJSON(res);
          }).catch(
            function(err){console.log(err);
            })
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
