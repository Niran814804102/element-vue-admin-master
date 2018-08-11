<template>
  <div id="modal">
    <v-app id="inspire">
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
          <v-card>
            <v-card-title class="headline">Use Google's location service?</v-card-title>
            <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native="dialog = false">Disagree</v-btn>
              <v-btn color="green darken-1" flat @click.native="dialog = false">Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-app>
  </div>

</template>

<script>
    export default {
      name: "modal",
      // props: {
      //   isModalVisible:Object
      // },
      data() {
        return {
          dialog: false
        }
      // },
      // methods: {
      //   close: function () {
      //     this.$emit('close');
      //   }
      }
    }


</script>

<style scoped>
  .modal-backdrop{
    position: fixed;
    padding: 0;
    /*background: rgba(0,0,0,0.3);*/
    background:#f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    /*height: 100%;*/
    /*width: 100%;*/
  }
  .modal{
    background: #fff;
    box-shadow: 0px 1px 2px 1px;
    /*border: 1px solid #ddd;*/
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: 50%;
    width: 50%;
    margin:0 220px 120px 0;
  }
  .modal-header,.modal-footer{
    padding: 15px;
    display: flex;
  }
  .modal-header{
    border-bottom: 1px solid #eee;
    color: #4aae9b;
    justify-content: space-between;
  }
  .modal-footer{
    border-top: 1px solid #eee;
    justify-content: flex-end;
  }
  .modal-body{
    position: relative;
    padding: 20px  10px;
  }
  .btn-close{
    border:none 0;
    font-size: 20px;
    padding: 2px 2px 2px 10px;
    cursor: pointer;
    font-weight: bold;
    color:#4aae9b;
    background-color: transparent;
  }
  .btn-green{
    color: #FFF;
    background-color: #4aae9b;
    border:1px solid #4aae9b;
    border-radius: 2px;
  }
</style>
