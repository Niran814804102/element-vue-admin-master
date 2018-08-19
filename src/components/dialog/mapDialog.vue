<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="84%"
      top="4%"
      @open="map()">
      <div id="tdtmap" ref="tdtmap" class="map-div"></div>
    </el-dialog>
  </div>
</template>
<script>
  import "../../../static/js/ol-debug.js";

  export default {
    name: "map-dialog",
    data(){
      return {
        tdtmap: null,
        title: "No Title",
        visible: false,
        queryUrl: "",
        queryParams: null
      }
    },
    mounted(){
    },
    methods: {
      //地图初始化
      map() {
        this.$nextTick(function(){
          this.$refs.tdtmap.innerText=null
          // let tdtSource = new ol.source.XYZ({
          //   url: 'http://202.121.180.59/tianditu/tdt/{z}/{y}/{x}.jpg'
          // })
          //Map初始化
          this.tdtmap = new ol.Map({
            target: 'tdtmap',
            layers: [
              new ol.layer.Tile({
                // source: tdtSource
                source: new ol.source.OSM()
              })
            ],
            view: new ol.View({
              center: ol.proj.transform([116.4, 39.9], 'EPSG:4326', 'EPSG:3857'),//初始化中心为北京
              zoom: 10,
              minZoom: 3,
              maxZoom: 18
            }),
            controls: ol.control.defaults().extend([
              new ol.control.Zoom(),
              new ol.control.ZoomSlider(),
              new ol.control.ScaleLine(),
              new ol.control.ZoomToExtent(),
              new ol.control.FullScreen(),
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
          // this.tdtmap.on('click', function(evt) {
          //   var pixel = this.tdtmap.getEventPixel(evt.originalEvent);
          //   var feature =this.tdtmap.forEachFeatureAtPixel(pixel, function(feature, layer) {
          //     return feature;
          //   });
          //   var coordinate = evt.coordinate;
          //   var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
          //     coordinate, 'EPSG:3857', 'EPSG:4326'));
          //   if(feature !== undefined){
          //     content.innerHTML = '<p>你点击的坐标是：</p><code>' + hdms + '</code><p>这里属于：'+ feature.get('name') + '</p>';
          //   }
          //   else{
          //     content.innerHTML = '<p>你点击的坐标是：</p><code>' + hdms + '</code><p>这里是大海！</p>';
          //   }
          //   overlay.setPosition(coordinate);
          //   map.addOverlay(overlay);
          // });
        })
      },
      //向地图上添加数据
      addMapData(){
        let that = this;
        //根据数据id获取指定数据的geojson
        that.$axios.get(that.queryUrl, that.queryParams).then(
          function(res) {
            if (res.body) {
              let vectorLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                  features: new ol.format.GeoJSON().readFeatures(res.body, {
                    dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
                    featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
                  })
                }),
                style: that.styleInit
              });
              that.tdtmap.getView().fit(ol.proj.transformExtent(res.body.bbox, 'EPSG:4326', 'EPSG:3857'), that.tdtmap.getSize());
              that.tdtmap.addLayer(vectorLayer);
            }
            else
              that.$Bus.$emit("alertModalParams", {
                alertType: "warning",
                alertDescription: "该数据为空"
              })
          }).catch(function(err){ console.log(err)})
      },
      //自定义图层样式
      styleInit(feature) {
        let styles = {//TODO:其他geometry的样式需要美化
          'Point': new ol.style.Style({
            image: new ol.style.Circle({
              radius: 10,
              fill: new ol.style.Fill({
                color: 'red'
              })
            })
          }),
          'LineString': new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'green',
              width: 1
            })
          }),
          'MultiLineString': new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'green',
              width: 1
            })
          }),
          'MultiPoint': new ol.style.Style({
            fill: new ol.style.Fill({color:'#e6a299'}), //填充
            stroke: new ol.style.Stroke({
              color:'rgb(165,24,27)',
              width:3,
              lineDash:[10,10]
            })
          }),
          'MultiPolygon': new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'yellow',
              width: 1
            }),
            fill: new ol.style.Fill({
              color: 'rgba(255, 255, 0, 0.1)'
            })
          }),
          'Polygon': new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'blue',
              lineDash: [4],
              width: 3
            }),
            fill: new ol.style.Fill({
              color: 'rgba(0, 0, 255, 0.1)'
            })
          }),
          'GeometryCollection': new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'magenta',
              width: 2
            }),
            fill: new ol.style.Fill({
              color: 'magenta'
            }),
            image: new ol.style.Circle({
              radius: 10,
              fill: null,
              stroke: new ol.style.Stroke({
                color: 'magenta'
              })
            })
          }),
          'Circle': new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'red',
              width: 2
            }),
            fill: new ol.style.Fill({
              color: 'rgba(255,0,0,0.2)'
            })
          })
        };
        return styles[feature.getGeometry().getType()];
      }
    },
    created(){
      let that = this;
      that.$Bus.$on("mapDialogParams",(params)=> {
        that.visible = params.visible;
        that.title = params.title;//如果为undefined，报错说title（String）无法绑定function
        that.queryUrl = params.queryUrl;
        that.queryParams = params.queryParams;
      });
    }
  }
</script>
<style>
  .el-dialog__body {
    height: 95%;
    padding: 0px 20px 20px 20px;
  }
  .el-dialog__header {
    height: 5%;
    font-size:16px;
    padding: 10px;
  }
  .el-dialog__headerbtn{
    top:15px;
  }
  .custom-mouse-position{
    position: absolute;
    top: 8px;
    right: 8px;
    color: black;
    font-size: medium;
  }
  .map-div{
    height: 800px;
  }
</style>
