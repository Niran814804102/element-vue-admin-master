<template>
  <div>
    <div slot="activator" class="card-container" @mouseenter="mouseEnter()" @mouseleave="mouseLeave()" @click="editRow(card.artifactId)" :class="{itemHover:itemHoverIndex==1}">
      <v-card height="220px">
        <v-card-media
          class="white--text"
          height="151px"
          :src="card.url">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <!--<span class="headline">Top 10 Australian beaches</span>-->
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <div class="data-info">
          <div class="data-info-container">
            <div class="data-name">{{ card.artifactId}}</div>
            <div class="data-discribe" style="width: 180px">{{ card.name }}</div>
            <div class="data-date">{{ card.date }}</div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
  import vueEven from "../../resource/vueEvent";
  export default {
    name: "modelCard",
    props: {
      card: {type: Object, default: []}
    },
    data(){
      return {
        itemHoverIndex : null,
        artifactId:"123",
        dialogVisible:{
          v:false,
          clickModalClose:false
        }
      }
    },
    methods:{
      mouseEnter(){
        this.itemHoverIndex = 1;
      },
      mouseLeave(){
        this.itemHoverIndex = null;
      },
      getUUIDByID(){
        this.axios.get('static/json/getUUIDByID.json',{
          id : this.data.id
        }).then(res=>{console.log(re.data)}).
        catch(function(){console.log("get email error")})
      },
      editRow(artifactId) {
        //TODO 打开地图编辑页面
        this.dialogVisible.v=true;
        vueEven.$emit('pop',this.dialogVisible,this.artifactId);
      }
    }
  }
</script>

<style scoped>
  .itemHover{
    /*box-shadow:0px 0px 1px 0px #313131;*/
    box-shadow: 0 0 10px 1px rgba(0,0,0,.1);
  }
  .card-container{
    margin-left: 25px;
    /*padding: 5px 10px 5px 10px;*/
    width: 240px;
  }
  .data-info{
    height: 69px;
    padding: 8px 12px 12px;
    overflow: hidden;
    color: #303c46;
    position: relative;
  }
  .data-info-container{
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .data-name{
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 24px;
    text-align: left;
    font-size: 14px;
    line-height: 22px;
    position: relative;
    margin-right: 102px;
  }
  .data-count{
    text-align: left;
    font-size: 12px;
    line-height: 14px;
    width: 110px;
    color: #222;
    padding: 10px 0 6px;
  }
  .data-date{
    position: absolute;
    right: 2px;
    top: 4px;
    height: 14px;
    font-size: 12px;
    line-height: 14px;
    text-align: left;
    color: #8a9194;
  }
  .data-option{
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  .data-icon{
    margin: 0;
    border: 0;
    padding-right: 3px;
    font-size: 14px;
    box-sizing: border-box;
    position: relative;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: inline-flex;

  }
  .data-option-container{
    position: absolute;
    z-index: 9;
    width: 118px;
    background-color: #fff;
    border-radius: 3px;
    bottom: 30px;
    right: -20px;
    border: 1px solid #d4d8db;
    text-align: left;
    color: #8a9194;
    padding: 6px 0;
  }
  .option-icon{
    width: 18px;
    text-align: center;
    float: left;
    margin-right: 6px;
  }
</style>
