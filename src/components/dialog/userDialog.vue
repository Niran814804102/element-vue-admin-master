<template>
  <div>
    <el-dialog
      title="用户登录"
      :visible.sync="dialogVisible.v"
      :close-on-click-modal="dialogVisible.clickModalClose"
      width="300px"
      top="4%"
    >
      <user-form v-show="formVisible"></user-form>
    </el-dialog>
  </div>
</template>

<script>
  import userForm from '../form/userForm.vue'
  export default {
    name: "userDialog",
    data() {
      return {
        formVisible: true
      }
    },
    props: {
      dialogVisible: Object,
    },
    components: {
      "user-form": userForm,
    }
  }
</script>

<style scoped>
  .custom-mouse-position{
    position: absolute;
    top: 5px;
    right: 5px;
    color: white;
    font-size: medium;
  }
</style>
