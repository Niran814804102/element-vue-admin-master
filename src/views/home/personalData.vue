<template>
  <div class="custom-data-layout">
    <div class="custom-data-card">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 v-for="(card, index) in cards" :key="index">
            <info-card ref="index" :card="card"></info-card>
          </v-flex>
          <div class="custom-data-pagination">
            <data-pagination></data-pagination>
          </div>
        </v-layout>
      </v-container>
      <map-dialog></map-dialog>
      <data-dialog></data-dialog>
      <data-info-dialog></data-info-dialog>
    </div>
  </div>
</template>

<script>
  import infoCard from '../../components/card/infoCard'
  import mapDialog from "../../components/dialog/mapDialog"
  import dataDialog from "../../components/dialog/dataDialog"
  import dataInfoDialog from "../../components/dialog/dataInfoDialog"
  import dataPagination from "../../components/pagination/dataPagination"

  export default {
    name: "perData",
    data(){
      return {
        cards: null,
        pageProps: {
          pageSize: 12,
          currentPage: 1
        }
      }
    },
    components: {
      "info-card": infoCard,
      "map-dialog": mapDialog,
      "data-dialog": dataDialog,
      "data-info-dialog": dataInfoDialog,
      "data-pagination": dataPagination
    },
    watch:{
      pageProps:{
        deep: true,
        handler(val, oldVal){
          this.getData(val);
        }
      }
    },
    methods: {
      getDataByUserID: function(pageProps){
        let that = this;
        that.$axios.get('http://192.168.1.5:8080/dldsj/user/data',
          { offset: (pageProps.currentPage - 1) * pageProps.pageSize,
            size: pageProps.pageSize
          }).then(function(res){
          that.cards = res.body.data;
          that.$Bus.$emit("totalSize", res.body.totalSize);
        }).catch(function(err){console.log(err);})
      }
    },
    created(){
      this.$Bus.$on("pageSize", (params)=>{this.pageProps.pageSize = params;});
      this.$Bus.$on("currentPage", (params)=>{this.pageProps.currentPage = params;});
    },
    mounted: function(){
      this.getDataByUserID(this.pageProps)
    }
  }
</script>

<style>

</style>
