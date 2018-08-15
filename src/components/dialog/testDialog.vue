<template>
  <div id="modelsign">
    <el-dialog title="注册并行模型" :visible.sync="signVisible.v" :close-on-click-modal="signVisible.clickModalClose">
    <div class="selectfile">
      <el-input type="text" :value="xmlname"></el-input>
      <input id="xmlid" name="file" type="file" @change="xmlFileChange" ref="xmlinputer">
      <label for="xmlid">
        <img src="../../assets/xml.jpg" alt="">
      </label>
    </div>
    <div class="selectfile">
      <el-input type="text" :value="jarname"></el-input>
      <input id="jarid" name="file" type="file" @change="jarFileChange" ref="jarinputer">
      <label for="jarid">
        <img src="../../assets/jar.jpg" alt="">
      </label>
    </div>

    <v-btn @click="submitfile">注册</v-btn>
    <v-btn>取消</v-btn>
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
        // signVisible:true
      }
    },
    props:{
      signVisible:Object
    },
    methods: {
      xmlFileChange(e) {
        let inputDOM = this.$refs.xmlinputer;
        console.log(inputDOM.files[0])
        // 通过DOM取文件数据
        this.file = inputDOM.files[0];
        this.errText = '';


        // 触发这个组件对象的input事件
        this.$emit('input', this.file);

        // 这里就可以获取到文件的名字了
        this.fileName = this.file.name;
        this.xmlname = this.fileName;

        //这里加个回调也是可以的
        // this.onChange && this.onChange(this.file, inputDOM.value);

      },
      jarFileChange(e) {
        let inputDOM = this.$refs.jarinputer;
        console.log(inputDOM.files[0])
        // 通过DOM取文件数据
        this.file = inputDOM.files[0];
        this.errText = '';


        // 触发这个组件对象的input事件
        this.$emit('input', this.file);

        // 这里就可以获取到文件的名字了
        this.fileName = this.file.name;
        this.jarname = this.fileName;

        // 这里加个回调也是可以的
        this.onChange && this.onChange(this.file, inputDOM.value);
      },
      submitfile() {
        let filedata = new FormData();
        filedata.append("file", this.$refs.jarinputer.files[0]);
        filedata.append('file', this.$refs.xmlinputer.files[0]);
        console.log(filedata.get('file'))
        this.$axios({
          method: "POST",
          url: 'http://192.168.240.25:3000/dldsj/parallel/register',
          data: filedata,
          headers: {//设置跨域头
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function (response) {
          alert(''.concat(response.data.code));
        }).catch(function (error) {
          alert(error);
        })
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
    width: 30px;
    height: 30px;
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
</style>
