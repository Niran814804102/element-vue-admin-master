<template>
  <div class="card-container" @mouseenter="mouseEnter()" @mouseleave="mouseLeave()" :class="{itemHover:itemHoverIndex==1}">
    <v-card height="220px">
      <v-card-media
        class="white--text"
        height="151px"
        :src="card.url"
        @click="openDataResourceOnMap()">
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
          <div class="data-name">{{ card.title}}</div>
          <div class="data-count">{{ card.count }}</div>
          <div class="data-date">{{ card.updatedate }}</div>
        </div>
      </div>
      <div class="data-option">
        <div class="data-icon">
          <i title="数据预览" class="fa fa-table" aria-hidden="true"></i>
        </div>
        <div class="data-icon">
          <i title="数据上图" class="fa fa-globe" aria-hidden="true"></i>
        </div>
        <div class="data-icon">
          <i :title="favoriteTitle" :class="favoriteClass" @click="chanegeFavorites()" aria-hidden="true"></i>
        </div>
        <div class="data-icon">
          <i title="复制数据UUID" class="fa fa-files-o" @click="getUUIDByID()" aria-hidden="true"></i>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
  import MapDialog from "../dialog/mapDialog";

  export default {
    name: "infoCard",
    components: {
      "map-dialog": MapDialog
    },
    props: {
      card: {type: Object, default: []}
    },
    data() {
      return {
        itemHoverIndex: null
      }
    },
    computed: {
      favoriteClass() {
        return this.card.isFavorite === "true" ? 'fa fa-star fa-star-full-yellow' : 'fa fa-star';
      },
      favoriteTitle() {
        return this.card.isFavorite === "true" ? '取消收藏' : '添加收藏';
      }
    },
    watched: {
      isFavorite(newV, oldV) {
        this.favoriteClass = newV === "true" ? 'fa fa-star fa-star-full-yellow' : 'fa fa-star';
        this.favoriteTitle = newV === "true" ? '取消收藏' : '添加收藏';
      }
    },
    methods: {
      mouseEnter() {
        this.itemHoverIndex = 1;
      },
      mouseLeave() {
        this.itemHoverIndex = null;
      },
      getUUIDByID(){
        let that = this;
        this.$axios.patch('static/json/getUUIDByID.json',{
          id : that.card.id
        }).then(res=>{
          window.clipboardData.setData('Text',res);
          that.$Bus.$emit("alertModalParams", {
            alertType: "success",
            alertDescription: "数据UUID复制成功"
          })
        }).catch(()=>{
          that.$Bus.$emit("alertModalParams", {
            alertType: "error",
            alertDescription: "数据UUID复制失败"
          })
        })
      },
      //修改对应数据的收藏属性，根据当前class判断当前是否收藏，如果收藏，点击后为取消收藏，反之添加收藏
      chanegeFavorites() {
        let that = this;
        if (this.favoriteClass === "fa fa-star") {
          // this.$axios.post('/addToFavorites', {
          //   id: this.card.id,
          //   user: this.user
          // }).then(function() {
          // if (res.data == "success") {
          this.card.isFavorite = "true";
          that.$Bus.$emit("alertModalParams", {
            alertType: "success",
            alertDescription: "收藏成功"
          });
          // }
          // }).catch(function(){
          //   this.$emit("alertType", "error")
          //   this.$emit("alertDescription","收藏失败")
          // })
        }
        else {
          // this.$axios.post('/removeFromFavorites', {
          //   id: this.card.id,
          //   user: this.user
          // }).then(function() {
          // if (res.data == "success"){
          this.card.isFavorite = "false"
          that.$Bus.$emit("alertModalParams", {
            alertType: "error",
            alertDescription: "收藏失败"
          })
          //   }
          // }).catch(function(){
          //   this.$emit("alertType", "error")
          //   this.$emit("alertDescription","取消收藏失败")
          // })
        }
      },
      //加载所点击的数据到地图上
      openDataResourceOnMap() {
        this.$emit("mapDialogParams", {
          dialogTitle: this.card.title,
          dialogVisible: {
            v: true,
            clickModalClose: false
          },
          queryUrl: "static/json/projData/ylsj.json",
          queryParams: {
            "userid": "userid",
            "proname": "proname"
          }
        });
      }
    }
  }
</script>

<style scoped>
  .itemHover {
    /*box-shadow:0px 0px 1px 0px #313131;*/
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, .1);
  }
  .card-container {
    margin-left: 25px;
    /*padding: 5px 10px 5px 10px;*/
    width: 240px;
  }
  .data-info {
    height: 69px;
    padding: 8px 12px 12px;
    overflow: hidden;
    color: #303c46;
    position: relative;
  }
  .data-info-container {
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .data-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 24px;
    text-align: left;
    font-size: 14px;
    line-height: 22px;
    position: relative;
    margin-right: 102px;
  }
  .data-count {
    text-align: left;
    font-size: 12px;
    line-height: 14px;
    width: 110px;
    color: #222;
    padding: 10px 0 6px;
  }
  .data-date {
    position: absolute;
    right: 2px;
    top: 4px;
    height: 14px;
    font-size: 12px;
    line-height: 14px;
    text-align: left;
    color: #8a9194;
  }
  .data-option {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  .data-icon {
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
  .data-option-container {
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
  .option-icon {
    width: 18px;
    text-align: center;
    float: left;
    margin-right: 6px;
  }
  .fa-star-full-yellow {
    color: #fbbc07
  }
</style>
