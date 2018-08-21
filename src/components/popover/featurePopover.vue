<template>
  <el-popover
    v-model="visible"
    ref="popover"
    placement="top-start"
    title="要素信息"
    width="400"
    trigger="manual">
    <data-info-table :tableData="featureParams"></data-info-table>
  </el-popover>
</template>

<script>
  import dataInfoTable from '../table/dataInfoTable.vue'

  export default {
    name: "featurePopover",
    components:{
      "data-info-table": dataInfoTable
    },
    data() {
      return {
        featureParams: null,
        visible: false
      }
    },
    created() {
      let that = this;
      that.$Bus.$on("featurePopoverParams", (params) => {
        that.featureParams = that.featureDeepCopy(params.featureParams, params.geometry);//自定义深拷贝，浅拷贝会导致feature对象循环赋值报错
        that.visible = params.visible;
      })
    },
    methods:{
      featureDeepCopy(featureParams, geometry){
        let obj = {};
        for (let key in featureParams){
          obj[key] = key == "geometry" ? geometry : featureParams[key];
        }
        return obj;
      }
    }
  }
</script>

<style scoped>

</style>
