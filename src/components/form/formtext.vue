<template>
  <div>
    <v-text-field
      outline
      clearable
      v-model="missionName"
      label="请输入任务名称"
      :rules="nameRules"
      :counter="10"
      required
    ></v-text-field>
    <v-text-field
      outline
      v-model="pointFile"
      label="请选择点数据"
      :rules="fileRules"
      required
    ></v-text-field>
    <v-text-field
      outline
      clearable
      v-model="outputFile"
      label="请输入将输出的聚类中心文件名称"
      :rules="outputRules"
      :counter="10"
      required
    ></v-text-field>
    <v-text-field
      outline
      clearable
      v-model="classNum"
      label="请输入聚类类别个数"
      :rules="classRules"
      required
    ></v-text-field>
    <v-text-field
      outline
      clearable
      v-model="plusNum"
      label="请输入最大迭代次数"
      :rules="plusRules"
      required
    ></v-text-field>
    <v-text-field
      outline
      clearable
      v-model="minNum"
      label="请输入每个类中的最小个数"
      :rules="minRules"
      required
    ></v-text-field>
  </div>

</template>

<script>
    export default {
        name: "",
      data: () => ({
        missionName: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 5) || 'Name must be less than 5 characters'
        ],
        pointFile: '',
        fileRules: [
          v => !!v || 'PointFile is required',
          v => (v && v.length <= 10) || 'PointFile must be less than 10 characters'
        ],
        outputFile: '',
        outputRules: [
          v => !!v || 'OutputFile Name is required',
          v => /.+@.+/.test(v) || 'OutputFile must be valid'
        ],
        classNum: '',
        classRules: [
          v => !!v || 'ClassNum is required',
          v => (v && parseInt(v)<= 10) || 'ClassNum must be less than 10'
        ],
        plusNum: '',
        plusRules: [
          v => !!v || 'PlusNum is required',
          v => (v && parseInt(v) <= 100) || 'PlusNum must be less than 100'
        ],
        minNum: '',
        minRules: [
          v => !!v || 'MinNum is required',
          v => (v && parseFloat(v) <= 10) || 'MinNum must be less than 10'
        ]
      }),
    }
</script>

<style scoped>

</style>
