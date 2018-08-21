<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[12, 24, 36, 48]"
      :page-size="pageSize"
      background
      layout="sizes, total, prev, pager, next, jumper"
      :total="totalSize">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "dataPagination",
    props: {},
    data() {
      return {
        currentPage: 1,
        pageSize: 16,
        totalSize: 100
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
        this.$Bus.$emit("pageSize", this.pageSize);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.$Bus.$emit("currentPage", this.currentPage);
      }
    },
    created(){
      this.$Bus.$on("totalSize", (params)=>{this.totalSize = params;});
    }
  }
</script>

<style scoped>
  .block{
    padding: 30px 0;
    text-align: center;
    border-right: 1px solid #eff2f6;
    box-sizing: border-box;
  }
</style>
