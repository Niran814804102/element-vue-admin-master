<template>
  <v-breadcrumbs divider=">>">
    <!--<v-icon slot="divider">forward</v-icon>-->
    <!--<v-breadcrumbs-item :to="{ path: '/' }">首页</v-breadcrumbs-item>-->
    <v-breadcrumbs-item v-for="item in currentPath"
                        :to="item.name"
                        :key="item.title">{{ item.title }}
    </v-breadcrumbs-item>
  </v-breadcrumbs>


</template>
<style scoped>


</style>
<script>
  export default {
    name: 'breadcrumb',
    props: {},
    data () {
      return {}
    },
    computed: {
      currentPath () {
        return this.$store.state.layout.currentPath.slice()
      }
    }

  }
</script>
