<template>
  <div>
    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="card in cards" :key="card.artifactId">
          <model-card :card="card"></model-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
    import modelCard from '../../components/info-card/modelCard.vue'
    export default {
      name: "modelcompute",
      data(){
        return {
          cards: null,
          modalTitle: "",
          centerDialogVisible: false,
          isVisible:false
        }
      },
      components: {
        modelCard,
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
      }
    }
</script>

<style scoped>

</style>
