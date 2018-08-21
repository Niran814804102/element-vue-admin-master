<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="84%"
      top="4%"
      @open="map()">
      <div id="tdtmap" ref="tdtmap" class="map-div"></div>
      <feature-popover ref="featurePopover"></feature-popover>
    </el-dialog>
  </div>
</template>
<script>
  import "../../../static/js/ol-debug.js";
  import featurePopover from "../popover/featurePopover.vue"

  export default {
    name: "map-dialog",
    components: {
      "feature-popover": featurePopover
    },
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
          let that = this;
          that.$refs.tdtmap.innerText=null
          // let tdtSource = new ol.source.XYZ({
          //   url: 'http://202.121.180.59/tianditu/tdt/{z}/{y}/{x}.jpg'
          // })
          //Map初始化
          that.tdtmap = new ol.Map({
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
              new ol.control.OverviewMap({
                collapseLabel: "",
                collapsed: false,
                className: 'custom-overview-map'
              }),
              new ol.control.ZoomSlider({className: 'custom-zoom-slider'}),
              new ol.control.ScaleLine({units:'metric'}),
              new ol.control.FullScreen({className: 'custom-fullscreen'}),
              new ol.control.MousePosition({
                coordinateFormat: ol.coordinate.createStringXY(4),
                projection: 'EPSG:4326',
                className: 'custom-mouse-position'
              })
            ]),
            logo : false
          });
          let vectorLayer = that.addMapData();
          let popup = new ol.Overlay({
            element: that.$refs.featurePopover.$el
          });
          that.tdtmap.on('pointermove',function(e) {
            let pixel = that.tdtmap.getEventPixel(e.originalEvent);
            let feature = undefined;
            feature = that.tdtmap.forEachFeatureAtPixel(pixel, function (feature) {
              return feature;
            }, 0, function(layer) {
              return layer === vectorLayer;
            });
            if (!feature) {
              that.tdtmap.getTargetElement().style.cursor = "auto"
            } else {
              that.tdtmap.getTargetElement().style.cursor = "pointer";
            }
          });
          that.tdtmap.on('click', function(e) {
            that.tdtmap.removeOverlay(popup);
            let pixel = that.tdtmap.getEventPixel(e.originalEvent);
            let feature = undefined;
            feature = that.tdtmap.forEachFeatureAtPixel(pixel, function(feature) {
              return feature;
            }, 0, function(layer) {
              return layer === vectorLayer;
            });
            if(feature){
              let coordinate = e.coordinate;
              popup.setPosition(coordinate);
              that.tdtmap.addOverlay(popup);
              that.$Bus.$emit("featurePopoverParams",{
                featureParams: feature.values_,
                geometry: feature.getGeometry().getType(),
                visible: true
              });
            }
            else{
              that.$Bus.$emit("featurePopoverParams",{
                featureParams: [],
                geometry: null,
                visible: true
              });
            }
          });
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
              let extent = ol.proj.transformExtent(res.body.bbox, 'EPSG:4326', 'EPSG:3857');
              that.tdtmap.getView().fit(extent, that.tdtmap.getSize());//视图更新到当前图层的bbox
              that.tdtmap.addControl(new ol.control.ZoomToExtent({extent: extent}));//增加缩放到当前图层控件
              that.tdtmap.addLayer(vectorLayer);
              return vectorLayer;
            }
            else {
              that.$Bus.$emit("alertModalParams", {
                alertType: "warning",
                alertDescription: "该数据为空"
              });
              return null;
            }
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
              color: 'rgba(255, 255, 0, 0.5)'
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
  @import "../../../static/css/ol-debug.css";
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
  .custom-zoom-slider{
    top: 4.5em;
    left: .5em;
    height: 200px;
    background: rgb(255, 255, 255);
  }
  .custom-overview-map{
    bottom: 2em;
    right: .5em;
    padding: .5em;
    background: white;
  }
  .custom-fullscreen{
    right: .5em;
    top: 2em;
  }
  .map-div{
    height: 600px;
  }
  .custom-basemap-card{
    position: absolute;
    top: 7em;
    right: 2em;
  }
  /*.ol-control button{*/
    /*!*display: none;*!*/
  /*}*/
</style>
