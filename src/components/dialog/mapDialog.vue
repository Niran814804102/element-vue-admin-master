<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="84%"
      top="4%"
      @open="mapInit()">
      <div id="map" ref="map" class="map-div"></div>
      <basemap-card class="custom-basemap-card"></basemap-card>
      <feature-popover ref="featurePopover"></feature-popover>
    </el-dialog>
  </div>
</template>
<script>
  import "../../../static/js/ol-debug.js";
  import basemapCard from "../card/basemapCard.vue"
  import featurePopover from "../popover/featurePopover.vue"

  export default {
    name: "map-dialog",
    components: {
      "basemap-card": basemapCard,
      "feature-popover": featurePopover
    },
    data(){
      return {
        map: null,
        title: "No Title",
        visible: false,
        queryUrl: "",
        queryParams: null,
        basemaps: {},
        basemapLabel: "tdtr",
      }
    },
    mounted(){},
    methods: {
      //地图初始化
      mapInit() {
        this.$nextTick(function(){
          let that = this;
          that.$refs.map.innerText=null
          // let tdtSource = new ol.source.XYZ({
          //   url: 'http://202.121.180.59/tianditu/tdt/{z}/{y}/{x}.jpg'
          // })
          that.map = new ol.Map({
            target: 'map',
            layers: [],
            view: new ol.View({
              center: ol.proj.transform([116.4, 39.9], 'EPSG:4326', 'EPSG:3857'),//初始化中心为北京
              zoom: 10,
              minZoom: 3,
              maxZoom: 18
            }),
            controls: ol.control.defaults({
              attributionOptions: {collapsible: false},
              rotateOptions: {className: 'custom-rotate'}
            }).extend([
              new ol.control.OverviewMap({
                collapsible: false,
                collapsed: false,
                className: 'custom-overview-map'
              }),
              new ol.control.ScaleLine({units:'metric'}),
              new ol.control.FullScreen({className: 'custom-fullscreen'}),
              new ol.control.MousePosition({
                coordinateFormat: ol.coordinate.createStringXY(4),
                projection: 'EPSG:4326',
                className: 'custom-mouse-position'
              })
            ]),
            logo : false
          }); //Map初始化
          that.basemapInit();//底图对象初始化
          //去掉鹰眼的放大缩小按钮
          that.map.controls.array_[3].element.lastElementChild.style.display = "none";
          let vectorLayer = that.addMapData();
          let popup = new ol.Overlay({
            element: that.$refs.featurePopover.$el
          });
          that.map.on('pointermove',function(e) {
            let pixel = that.map.getEventPixel(e.originalEvent);
            let feature = undefined;
            feature = that.map.forEachFeatureAtPixel(pixel, function (feature) {
              return feature;
            }, 0, function(layer) {
              return layer === vectorLayer;
            });
            if (!feature) {
              that.map.getTargetElement().style.cursor = "auto"
            } else {
              that.map.getTargetElement().style.cursor = "pointer";
            }
          });
          that.map.on('click', function(e) {
            that.map.removeOverlay(popup);
            let pixel = that.map.getEventPixel(e.originalEvent);
            let feature = undefined;
            feature = that.map.forEachFeatureAtPixel(pixel, function(feature) {
              return feature;
            }, 0, function(layer) {
              return layer === vectorLayer;
            });
            if(feature){
              let coordinate = e.coordinate;
              popup.setPosition(coordinate);
              that.map.addOverlay(popup);
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
              that.map.getView().fit(extent, that.map.getSize());//视图更新到当前图层的bbox
              that.map.addControl(new ol.control.ZoomToExtent({extent: extent, className: "custom-zoom-extent"}));//增加缩放到当前图层控件
              that.map.addLayer(vectorLayer);
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
      //底图初始化
      basemapInit(){
        //OpenStreetMap
        let osm_layer = new ol.layer.Tile({
          source: new ol.source.OSM()
        });
        //OpenStreetMap地形图
        let osm_terrain_layer = new ol.layer.Tile({
          source: new ol.source.OSM({
            url: 'http://tile-{a-c}.openstreetmap.fr/hot/{z}/{x}/{y}.png'
          })
        });
        // OpenStreetMap自行车地图
        let osm_bicycle_layer = new ol.layer.Tile({
          source: new ol.source.OSM({
            url:'http://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png'
          })
        })
        // 天地图路网图
        let tianditu_road_layer = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: "http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
          })
        });
        // 天地图路网注记
        let tianditu_road_annotation = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: 'http://t4.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}'
          })
        });
        // 天地图地形图
        let tianditu_terrain_layer = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: "http://t4.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}"
          })
        });
        // 天地图地形注记
        let tianditu_terrain_annotaation = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: "http://t4.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}"
          })
        });
        // 天地图影像图
        let tianditu_image_layer = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: "http://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}"
          })
        });
        // 天地图影像注记
        let tianditu_image_annotation = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: "http://t4.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}"
          })
        });
        // 高德地图
        let gaode_layer = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: 'http://webrd03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8'
          }),
          projection: 'EPSG:3857'
        });
        // 谷歌交通地图
        let google_map_layer = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url:'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'
          })
        });
        // 谷歌地形地图
        let google_terrain_layer = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: 'http://mt3.google.cn/vt/lyrs=t@131,r@216000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Gal'//谷歌地形地图
          }),
          projection: 'EPSG:3857'

        });
        // 谷歌卫星地图
        let google_satellite_layer = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url:'http://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G'
          }),
          projection: 'EPSG:3857'
        });

        this.basemaps["osm"] = { title: "OpenStreetMap", layer: osm_layer };
        this.basemaps["osmt"] = { title: "OpenStreetMap地形图", layer: osm_terrain_layer };
        this.basemaps["osmb"] = { title: "OpenStreetMap自行车图", layer: osm_bicycle_layer };
        this.basemaps["tdtr"] = { title: "天地图路网图", layer: tianditu_road_layer };
        this.basemaps["tdtra"] = { title: "天地图路网注记", layer: tianditu_road_annotation };
        this.basemaps["tdtt"] = { title: "天地图地形图", layer: tianditu_terrain_layer };
        this.basemaps["tdtta"] = { title: "天地图地形注记", layer: tianditu_terrain_annotaation };
        this.basemaps["tdti"] = { title: "天地图影像图", layer: tianditu_image_layer };
        this.basemaps["tdtia"] = { title: "天地图影像注记", layer: tianditu_image_annotation };
        this.basemaps["gd"] = { title: "高德地图", layer: gaode_layer };
        this.basemaps["gm"] = { title: "谷歌交通地图", layer: google_map_layer };
        this.basemaps["gt"] = { title: "谷歌地形地图", layer: google_terrain_layer };
        this.basemaps["gs"] = { title: "谷歌卫星地图", layer: google_satellite_layer };
        this.$Bus.$emit("basemaps", this.basemaps);
      },
      //底图切换
      changeBasemap(oldCheckedBasemap, changeBasemap, checked){
        if (oldCheckedBasemap.length === 0){
          this.addLayer2Bottom(this.basemaps[changeBasemap].layer);
        }
        else {
          if (!checked)
            this.map.removeLayer(this.basemaps[changeBasemap].layer);
          else {
            this.map.removeLayer(this.basemaps[oldCheckedBasemap[0]].layer);
            this.addLayer2Bottom(this.basemaps[changeBasemap].layer);
          }
        }
      },
      addLayer2Bottom(layer){
        let layers = this.map.getLayers();
        layers.insertAt(0, layer);
      },
      //自定义图层样式
      styleInit(feature) {
        //TODO:其他geometry的样式需要美化
        let geometryType = feature.getGeometry().getType()
        switch(geometryType){
          case "Point":return new ol.style.Style({
            image: new ol.style.Circle({
              radius: 10,
              fill: new ol.style.Fill({
                color: 'red'
              })
            })
          });
          case "LineString":return this.lineStyle(feature);
          case "MultiLineString": return this.lineStyle(feature);
          case "MultiPoint": return new ol.style.Style({
            fill: new ol.style.Fill({color:'#e6a299'}), //填充
            stroke: new ol.style.Stroke({
              color:'rgb(165,24,27)',
              width:3,
              lineDash:[10,10]
            })
          });
          case "MultiPolygon": return new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'yellow',
              width: 1
            }),
            fill: new ol.style.Fill({
              color: 'rgba(255, 255, 0, 0.5)'
            })
          });
          case "Polygon": return new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'blue',
              lineDash: [4],
              width: 3
            }),
            fill: new ol.style.Fill({
              color: 'rgba(0, 0, 255, 0.1)'
            })
          });
          case "GeometryCollection": return new ol.style.Style({
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
          });
          case "Circle": return new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'red',
              width: 2
            }),
            fill: new ol.style.Fill({
              color: 'rgba(255,0,0,0.2)'
            })
          });
          default: return null;
        }
      },
      //线样式编辑器
      lineStyle(feature){
        let geometry = feature.getGeometry();
        let styles = [
          new ol.style.Style({
            fill: new ol.style.Fill({
              color: '#ff9f64'
            }),
            stroke: new ol.style.Stroke({
              width: 3,
              color: [255, 0, 0, 1]
            })
          })
        ];
        geometry.forEachSegment(function(start, end) {
          let endLonLat = [end[0],end[1]];
          let startLonLat = [start[0],start[1]];
          styles.push(new ol.style.Style({
            geometry: new ol.geom.Point(endLonLat),
            image: new ol.style.Circle({
              radius: 5,
              fill: new ol.style.Fill({
                color: '#5ca1d7'
              })
            })
          }));
          styles.push(new ol.style.Style({
            geometry: new ol.geom.Point(startLonLat),
            image: new ol.style.Circle({
              radius: 5,
              fill: new ol.style.Fill({
                color: '#5ca1d7'
              })
            })
          }));
        });
        return styles;
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
      that.$Bus.$on("basemapChecked", (params)=> {
        that.changeBasemap(params.oldCheckedBasemap, params.changeBasemap, params.checked)
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
    top: 0.5em;
    right: 0.5em;
    color: black;
    font-size: medium;
  }
  .custom-rotate{
    top:0.5em;
    left:2.2em;
  }
  .custom-overview-map{
    bottom: -1em;
    left: -1em;
    padding: .4em;
    background: white;
    width: 20%
  }
  .custom-fullscreen{
    left: 2.2em;
    top: 2.1em;
  }
  .custom-zoom-extent{
    top:3.75em;
    left:0.5em;
  }
  .custom-scale-line{
    left:0.5em;
    bottom:0em;
  }
  .map-div{
    height: 600px;
  }
  .custom-basemap-card{
    position: absolute;
    top: 6em;
    right: 1.5em;
  }
</style>
