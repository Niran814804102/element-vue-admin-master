<template>
    <div>
      <v-app  ref="app" appid="">
        <v-btn @click="getPersonalJobStat()">监控</v-btn>
        <v-progress-linear
          ref="progress"
          color="warning"
          height="15"
          :value="0"
        ></v-progress-linear>
      </v-app>
    </div>
</template>

<script>
    export default {
      name: "",
      data() {
        return {
          userid: 1,
          // urlBase: "parallel",
          superviseTimer: '',
        }
      },
      methods: {
        getPersonalJobStat() {
          var task = {};
          this.$axios.get('../../static/json/test.json').then(res => {
            if (res) {
              console.log(res)

              task.name = res.body;
              console.log(task.name)
            }

          setInterval(()=> {
            // this.$axios.get('../../static/json/testResult.json').then(res => {
            this.$axios.get("http://localhost:8080/dldsj/parallel/monitor/"+task.name).then(res => {

              console.log(res)
              var result = res.body;
              console.log(result)
              switch (result.state) {
                case"RUNNING":
                  alert("正在运行……");
                  break;
                case"ACCEPTED":
                  alert("已被后台接收");
                  break;
                case"FINISHED":
                  alert("运行完成");
                  break;
                case"UNACCEPTED":
                  alert("未被后台接收");
                  break;
                case"FAILED":
                  alert("运行失败");
                  break;
              }
              this.$refs.progress.value = "result.progress";
          },50000);
        });
      });
      }
    }
  }
</script>

<style scoped>

</style>
