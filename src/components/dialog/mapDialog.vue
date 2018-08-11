<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible.v"
    :close-on-click-modal="dialogVisible.clickModalClose"
    width="84%"
    top="4%"
    @open="map()">
    <div id="tdtmap" ref="tdtmap"></div>
  </el-dialog>
</template>
<script>
  export default {
    name: "map-dialog",
    props: {
      dialogTitle:String,  //dialog标题
      dialogVisible: Object,  //dialog可视化相关，dialogVisible.v代表是否可见，dialogVisible.clickModalClose代表点击框体外区域是否关闭dialog
      queryUrl:String,    //请求数据的url
      queryParams:Object  //请求数据的参数
    },
    data(){
      return {
        tdtmap:null
      }
    },
    mounted(){
    },
    methods: {
      /**
       * 地图初始化
       */
      map() {
        this.$nextTick(function(){
          this.$refs.tdtmap.innerText=null
          let tdtSource = new ol.source.XYZ({
            url: 'http://202.121.180.59/tianditu/tdt/{z}/{y}/{x}.jpg'
          })
          let tdtLayer = new ol.layer.Tile({
            name: "tianditu_layer",
            chName: "天地图地图",
            source: tdtSource
          })
          /*
         * 视图初始化
         */
          let view = new ol.View({
            center: ol.proj.transform([120, 30], 'EPSG:4326', 'EPSG:3857'),
            zoom: 3,
            minZoom: 3,
            maxZoom: 9,
            extent: ol.proj.get('EPSG:3857').getExtent()
          });
          /*
         * Map初始化
         */
          this.tdtmap = new ol.Map({
            target: 'tdtmap',
            layers: [tdtLayer],
            view: view,
            controls: ol.control.defaults().extend([
              new ol.control.ScaleLine({
                target: document.getElementById('scale-line')
              }),
              new ol.control.MousePosition({
                coordinateFormat: ol.coordinate.createStringXY(4),
                projection: 'EPSG:4326',
                className: 'custom-mouse-position',
                target: document.getElementById('mouse-position')
              })
            ]),
            logo : false
          });
          this.addMapData();
        })
      },
      /**
       * 向地图上添加数据
       * @params
       */
      addMapData(){
        //初始化数据图层
        var data_source = new ol.source.Vector({
          features:null
        });
        var data_layer = new ol.layer.Vector({
          name : "track_layer",
          chName : "轨迹图层",
          source:data_source
        });

        //根据用户id以及项目名称获取项目数据并展示在地图上
        this.$axios.get(this.queryUrl,this.queryParams).then(res=>{
          var data=res.data;
          var features = new Array();
          for(var i=0;i<data.length;i++){
            features[i] = new ol.Feature({
              geometry:new ol.geom.Point(ol.proj.transform([ data[i].lon, data[i].lat ], 'EPSG:4326', 'EPSG:3857')),
              name:data[i].prettyname
            });
            features[i].setId(data[i].id);
          }
          data_layer.getSource().addFeatures(features);
          this.tdtmap.addLayer(data_layer);
        })
      }
    }
  }



</script>
<style>
  .custom-mouse-position{
    position: absolute;
    top: 5px;
    right: 5px;
    color: white;
    font-size: medium;
  }
</style>
