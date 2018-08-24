<template>
  <el-dialog :visible.sync="modelInfoVisible.v" :artifactId="artifactId" :infoData="infoData">
    <h4 style="padding-left:2% ">模型简介</h4>
    <div style="padding-left:2%;padding-top:1%">
      <p>模型ID：{{artifactId}}</p>
      <p>模型名称：{{infoData.name}}</p>
      <p>所属课题组：{{infoData.groupId}}</p>
      <p>模型描述：{{infoData.description}}</p>
      <p>算法描述：{{infoData.algo}}</p>
      <p>模型用途：{{infoData.usage}}</p>
      <p>运行主类：{{infoData.mianClass}}</p>
      <p>程序类型：{{infoData.frameworkType}}</p>
      <p>模型关键字：{{infoData.keywords}}</p>
      <p>模型依赖包:{{infoData.packages}}</p>
      <p>日期：{{this.infoData.date}}</p>
      <p>模型版本：{{this.infoData.versionId}}</p>
      <p>作者：{{this.infoData.authorId}}</p>
      <p>联系作者：{{this.infoData.email}}</p>
      <p>模型参数:</p>
      <span>
        <el-table :data="infoData.paramData">
          <el-table-column
            prop="name"
            label="参数"
            width="210">
          </el-table-column>
          <el-table-column
            prop="default"
            label="默认值"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="datatype"
            label="数据类型"
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述">
          </el-table-column>
        </el-table>
      </span>

    </div>
  </el-dialog>
</template>

<script>
  import vueEven from '../../resource/vueEvent.js';

  export default {
    name: "modelInfoDialog",
    data() {
      return {
        modelInfoVisible: Object,
        artifactId: '',
        infoData: {}
      }
    },
    methods: {
      getInfoData: function () {
        let infoData = {};
        let obj = this;
        this.$axios.get(
          // url: 'http://192.168.240.25:3000/dldsj/parallel/get/' + this.artifactId,
          '/parallel/get/' + this.artifactId)
          .then((res) => {
              obj.infoData = res.body;
              console.log(res.body)
              console.log(res.body.packages);
              obj.infoData.date = obj.dateTrans(obj.infoData.date);
              obj.infoData.paramData = JSON.parse(res.body.parameters);
              if(res.body.packages==="[{}]"){
                obj.infoData.packages='';
              }
            }
          ).catch(function (error) {
          console.log(error);
          obj.$message.error('失败!');
        });
      },
      dateTrans: function (date) {
        date = date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);
        return date;
      },
    },
    mounted() {
      vueEven.$on('pob', (modelInfoVisible, artificatId) => {
        this.modelInfoVisible = modelInfoVisible;
        this.artifactId = artificatId;
        this.getInfoData();
      })
    },
  }
</script>

<style>

</style>
