<template>
  <div id="modelsign">
    <v-progress-circular
      indeterminate
      color="blue"
      v-show="load"
      style="padding-left: 550px;margin-top: -550px"
    ></v-progress-circular>
    <el-dialog :visible.sync="signVisible.v" >
      <p>注册并行模型</p>
      <div class="selectfile">
        <el-input type="text" :value="xmlname"></el-input>
        <input id="xmlid" name="file" type="file" accept=".xml" @change="xmlFileChange" ref="xmlinputer">
        <label for="xmlid">
          <img src="../../assets/xml.png" alt="">
        </label>
      </div>
      <div class="selectfile">
        <el-input type="text" :value="jarname"></el-input>
        <input id="jarid" name="file" type="file" accept=".jar" @change="jarFileChange" ref="jarinputer">
        <label for="jarid">
          <img src="../../assets/jar.png" alt="">
        </label>
      </div>
      <div class="selectfile">
        <el-input type="text" :value="picname"></el-input>
        <input id="picid" name="file" type="file" accept=".png,.jpg" @change="picFileChange" ref="picinputer">
        <label for="picid">
          <img src="../../assets/img.png" alt="">
        </label>
      </div>
      <v-btn id="signbtn" @click="submitfile">注册</v-btn>
      <v-btn @click="cancle">取消</v-btn>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "modelSign",
    // props: {
    //   target:''
    // },
    data() {
      return {
        xmlname: '',
        jarname: '',
        picname: '',
        load: false
      }
    },
    props:{
      signVisible:Object
    },
    methods: {
      xmlFileChange(e) {
        if (e.target.files.length > 0)
        // 这里就可以获取到文件的名字了
          this.xmlname = e.target.files[0].name;
      },
      jarFileChange(e) {
        if (e.target.files.length > 0)
        // 这里就可以获取到文件的名字了
          this.jarname = e.target.files[0].name;
      },
      picFileChange(e) {
        if (e.target.files.length > 0)
        // 这里就可以获取到文件的名字了
          this.picname = e.target.files[0].name;
      },
      submitfile() {
        let obj = this;
        let filedata = new FormData();
        filedata.append("file", this.$refs.jarinputer.files[0]);
        filedata.append('file', this.$refs.xmlinputer.files[0]);
        filedata.append('file', this.$refs.picinputer.files[0]);
        console.log(filedata.get('file'))
        this.signVisible.v=false;
        //注册框消失
        obj.$message({
          type: 'info',
          message: '请稍候……',
          duration: 1000
        });
        this.load = true;
        this.$axios.post(
          // url: 'http://192.168.240.25:3000/dldsj/parallel/register',
          'http://192.168.1.5:8080/dldsj/parallel/register'
          , filedata
        ).then(function (response) {
          obj.load = false;
          if (response.code === 200) {
            obj.$emit('childRefresh')
            obj.$message({
              type: 'success',
              message: '模型注册成功!'
            })
          } else {
            obj.$message.error('模型注册失败!');
          }
          //判断是否注册成功进行弹窗
        }).catch(function (error) {
          obj.$message.error('模型注册失败!');
        });
        obj.xmlname = '';
        obj.jarname = '';
        obj.picname = '';
        obj.$refs.xmlinputer.value = '';
        obj.$refs.jarinputer.value = '';
        obj.$refs.picinputer.value = '';
      },
      cancle() {
        this.xmlname = '';
        this.jarname = '';
        this.picname = '';
        this.$refs.xmlinputer.value = '';
        this.$refs.jarinputer.value = '';
        this.$refs.picinputer.value = '';
        this.signVisible.v = false;
      }
    }
  }
</script>

<style scoped>

  #modelsign {
    /*height: 200px;*/
    width: 50%;
    margin: 200px;
    /*border: 1px solid #ddd;*/
    position: relative;
  }

  #modelsign h4 {
    margin: 10px;
    position: relative;
  }

  #modelsign img {
    width: 38px;
    height: 38px;
  }
  #signbtn:hover {
    color:#4d9bf7;
  }

  #modelsign input {
    font-size: 0;
    position: absolute;
    left: -999px;
  }

  #modelsign input::-webkit-file-upload-button {
    background: #efeeee;
    color: #333;
    border: 0;
    padding: 40px 100px;
    border-radius: 5px;
    font-size: 12px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .1), 0 0 10px rgba(0, 0, 0, .12);
  }

  .el-input {
    width: 90%;
  }

  .selectfile {
    padding: 8px;
  }

  .selectfile img {
    padding-left: 5px;
  }

  .el-input {
    width: 90%;
  }

  .selectfile {
    padding: 8px;
  }

  .selectfile img {
    padding-left: 5px;
  }
  .el-dialog p{
    font-size: 22px;
    padding-left:1.5%;
  }
</style>
