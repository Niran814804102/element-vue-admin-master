<template>
  <div>
    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 v-for="card in cards" :key="card.id">
            <info-card :card="card"></info-card>
          </v-flex>
      </v-layout>
    </v-container>
  </div>

</template>

<script>
  import infoCard from '../../components/info-card/infoCard.vue'
  export default {
    name: "pubData",
    data(){
      return {
        cards: null,
      }
    },
    components: {
      "info-card": infoCard
    },
    methods: {
      getData: function(){
        this.$axios.get('static/json/personalData.json',{
          params:{ userid: "userid"}
        }).then(res=>{this.cards = res.data;
        }).catch(function(){console.log(error);})
      }
    },
    mounted: function(){
      this.getData()
    }
  }
</script>

<style>
</style>
