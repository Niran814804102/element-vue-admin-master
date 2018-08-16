<template>
  <transition name="fade">
    <div class="alertPosition" v-show="visible">
        <v-alert
          value=true
          :color.sync="color"
          :icon.sync="icon"
          transition="scale-transition"
        >
          {{ description }}
        </v-alert>
    </div>
  </transition>
</template>

<script>
    export default {
        name: "alert",
        created(){
          this.$Bus.$on("alertModalParams",(data)=> {
            this.description = data.alertDescription;
            this.type = data.alertType;
            this.visible = data.alertVisible;
          });
        },
        data(){
          return{
            icon: "check_circle",
            color: "success",
            visible: false,
            description: "",
            type:""
          }
        },
        watch:{
          type(){
            if(this.type === "success") { this.color = "success"; this.icon="check_circle";}
            else if(this.type === "info") { this.color = "info"; this.icon="info";}
            else if(this.type === "warning") { this.color = "warning"; this.icon="priority_high";}
            else { this.color = "error"; this.icon="warning";}
          },
          visible(newV, oldV){
            if(newV)
              setTimeout(()=>{
                this.visible = false;
              },2000)
          }
        },
        methods:{
          getAlertType(){
            if(this.alertType === "success") { this.color = "success"; this.icon="check_circle";}
            else if(this.alertType === "info") { this.color = "info"; this.icon="info";}
            else if(this.alertType === "warning") { this.color = "warning"; this.icon="priority_high";}
            else { this.color = "error"; this.icon="warning";}
          }
        },
        mounted(){
        }
    }
</script>

<style scoped>
  @import "../../../static/css/icon.css";

  .alertPosition{
    position: absolute;
    left: 50%;
    width:200px;
    margin-right:200px;
    z-index:2;
  }
  .success{
    background-color: #4caf50;
    opacity: 0.7;
  }
  .error{
    background-color: #ff5252;
    opacity: 0.7;
  }
  .warning{
    background-color: #ffc107;
    opacity: 0.7;
  }
  .info{
    background-color: #2196f3;
    opacity: 0.7;
  }
  /* 开始过渡阶段,动画出去阶段 */
  .fade-enter-active,.fade-leave-active{
    transition: all 0.5s ease-out;
  }
  /* 进入开始 */
  .fade-enter{
    transform: translateY(-500px);
    opacity: 0;
  }
  /* 出去终点 */
  .fade-leave-active{
    transform: translateY(-500px);
    opacity: 0;
  }
</style>
