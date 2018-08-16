<template>
  <span id="sidebar">
    <!--侧边栏颜色-->
    <el-menu
      router
      :default-active="$router.name"
      :default-openeds="openedMenuList"
      class="el-menu-vertical-demo disabled-animation"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      text-color="#4a4e55"
      active-text-color="#2d8cf0"
      background-color="#f6f8fb"
      :collapse="isCollapse"
      :class="{'hide-sidebard-text': isCollapse}">
      <template v-for="item in menuList">
        <el-menu-item v-if="!item.children" :index="item.name" :route="item"  :key="item.path">
          <i :class="item.icon" :key="item.path" style="width:24px"></i>
          <span class="sidebar-menu-text" :key="item.path" slot="title">{{ item.meta.title }}</span>
        </el-menu-item>

        <el-submenu :index="item.name" v-if="item.children && item.children.length > 0" :key="item.path">
          <template slot="title">
          <i :class="item.icon" :key="item.path" style="width:24px"></i>
            <span class="sidebar-menu-text">{{ item.meta.title }}</span>
          </template>
          <el-menu-item :index="child.name"  :route="child" :key="child.name" v-for="child in item.children">
          <i :class="child.icon" :key="item.path" style="width:24px"></i>
            <span class="sidebar-menu-text" :key="child.name" slot="title">{{ child.meta.title }}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </span>
</template>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  /*.hide-sidebard-text .sidebar-menu-text {*/
    /*display: none;*/
  /*}*/

  /*.hide-sidebard-text i.ivu-menu-submenu-title-icon {*/
    /*display: none;*/
  /*}*/
</style>
<script>
  import { appRouter } from '../../router'

  export default {
    name: 'sidebar',
    props: {
      theme: {type: String, default: 'dark'},
      isCollapse: {type: Boolean, default: false}
    },
    data () {
      return {
        currentPageName: null,
        openedMenuList: []
      }
    },
    computed: {
      iconSize() {
        return 14
      },
      menuList() {
        return this.$store.state.layout.menuList.slice()
      }
    },
    watch: {
      '$route' (to, from) {
        this.currentPageName = to.name
      },
      currentPageName () {
        if (this.$store.state.layout.ready) {
          this.setCurrentPath()
        } else {
          //setTimeout : wait for store state ready when force refresh
          setTimeout(() => {this.setCurrentPath()}, 100)
        }
      }
    },
    methods: {
      init () {
        this.currentPageName = this.$route.name
      },
      handleOpen(key, keyPath) {},//打开下拉选项事件的响应函数
      handleClose(key, keyPath) {},//关闭下拉选项事件的响应函数
      handleSelect (menuName) {
        this.currentPageName = menuName
        this.$router.push({
          name: menuName
        })
      },
      setCurrentPath () {
        this.$store.dispatch('openTab', this.$route.name)
        this.$store.dispatch('setCurrentPath', this.$route.name).then(() => {
          this.openedMenuList = this.$store.state.layout.openedMenuNameList.slice()
          this.$nextTick(() => {
//            this.$refs.sideMenu.updateOpened()
//            this.$refs.sideMenu.updateActiveName()
          })
        })
      }
    },
    mounted () {
      this.init()
    }
  }
</script>
