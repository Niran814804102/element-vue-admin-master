<template>
  <el-card class="custom-card" :body-style="{ padding: '5px 5px' }">
    <div slot="header" class="custom-card-header">
      底图
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
    </div>
    <div>
      <el-tree
        class="filter-tree"
        ref="basemaps" :data="basemaps"
        show-checkbox :check-strictly="true" node-key="name"
        highlight-current draggable
        :filter-node-method="filterNode"
        @check-change="changeBasemap">
      </el-tree>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "basemapCard",
    data () {
      return {
        filterText: '',
        checkedBasemaps: [],//存储被选择的底图names
        basemaps:[]
      };
    },
    watch: {
      filterText(val) {
        this.$refs.basemaps.filter(val);
      }
    },
    methods:{
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      changeBasemap(data, checked, indeterminate){
        this.$Bus.$emit("basemapChecked", {//传输当前checked的节点数组，变化的节点和变化的类型是勾选/不勾选
          oldCheckedBasemap: this.checkedBasemaps,
          changeBasemap: data.name,
          checked: checked
        });
        let index = this.checkedBasemaps.indexOf(data.name);//获取当前选择的底图name
        if(index < 0 && this.checkedBasemaps.length === 1 && checked){//如果不存在已选择的底图数组中，并且已选择底图数组已有底图
          this.$refs.basemaps.setChecked(this.checkedBasemaps[0], false);
          this.$refs.basemaps.setChecked(data, true);
          this.checkedBasemaps[0] = data.name;
        }else if(this.checkedBasemaps.length === 0 && checked){//如果底图数组为空，且为确认选择
          this.checkedBasemaps = [];//为防止数组为空，先清空
          this.checkedBasemaps.push(data.name);
        }else if(index >= 0 && this.checkedBasemaps.length === 1 && !checked){//如果底图数组为1，且为取消选择
          this.checkedBasemaps = [];
        }
      }
    },
    created() {
      let that = this;
      that.$Bus.$on("basemaps", (params) => {
        let firstKey;
        that.basemaps = [];
        for (let key in params){
          firstKey = firstKey ? firstKey: key;
          that.basemaps.push({
            name: key,
            label: params[key].title
          })
        }
      });
    }
  }
</script>

<style scoped>
  .custom-card {
    width: 250px;
    background: rgba(255,255,255,0.7);
  }
  .custom-card-header{
    margin:-13px -10px;
    padding: 0px 10px;
    font-size: 16px;
  }
  .custom-card-header>.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 80%;
  }
  .custom-card-header>.el-input input{
    height:20px;
  }
  .el-tree {
    position: relative;
    cursor: default;
     background: rgba(255,255,255,0.1);
    color: #606266;
  }
</style>
