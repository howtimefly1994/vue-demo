<template>
  <div class="login_warp">
    <el-form class="form_warp" :model="formModel" :rules="rules" ref="ruleForm">
      <el-form-item prop="name">
        <span class="svg-container">
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input v-model="formModel.name" class="form--input"></el-input>
      </el-form-item>
      <el-form-item prop="pas">
        <span class="svg-container">
          <i class="el-icon-s-cooperation"></i>
        </span>
        <el-input v-model="formModel.pas" class="form--input"></el-input>
      </el-form-item>
      <el-form-item>
        <span class="svg-container">
          <i class="el-icon-success"></i>
        </span>
        <el-input v-model="formModel.verifiy" class="txtSearch"></el-input>
        <img
          class="btnSearch"
          @load="verifyLoadState=true"
          @click="toggleVerify"
          :src="verifiy"
          alt
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      verifyLoadState: "",
      verifiy: "http://localhost:3000/captcha",
      formModel: {
        name: "qqq",
        pas: "",
        verifiy: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.$http.user.getUser().then(res => {
      console.log("++" + JSON.stringify(res));
    });
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return;
        }
      });
    },
    login() {
      let params = {
        cname: this.formModel.name,
        tno: this.formModel.pas,
        verifiy: this.formModel.verifiy
      };
      this.$http.user.loginUser(params).then(res => {
        if (res.data.result.code == 200) {
          this.$message({
            message: "登陆成功",
            type: "success"
          });
          // this.$router.push({
          //   path: "/table"
          // });
        } else if (res.data.result.code == -2) {
          const base = "http://localhost:3000/captcha";
          this.verifiy = base + "?" + Math.random();
          this.$message({
            message: "验证码错误",
            type: "warning"
          });
        } else {
          const base = "http://localhost:3000/captcha";
          this.verifiy = base + "?" + Math.random();
          this.$message({
            message: "账号不存在或者密码错误",
            type: "warning"
          });
        }
      });
    },
    toggleVerify(e) {
      if (!this.verifyLoadState) return;
      // 防止下一次重复点击
      this.verifyLoadState = false;
      const base = "http://localhost:3000/captcha";
      this.verifiy = base + "?" + e.timeStamp;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login_warp {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/img/login-bg.png');
  background-color: rgb(48, 65, 86);
}
.form_warp {
  position: relative;
  top: 60%;
  left: 80%;
  width: 400px;
  transform: translate(-50%, -50%);
  background-color: rgb(252, 252, 253);
  border-radius: 5%;
  padding: 20px 20px;
  border: 1px solid #fff;
  box-shadow: 10px 10px 5px rgb(59, 61, 70);
}
.txtSearch {
  vertical-align: middle;
  width: 253px;
  /* float: left; */
  /* padding-bottom: 20px; */
}
.btnSearch {
  vertical-align: middle;
}
.svg-container {
  color: #889aa4;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
.form--input {
  width: 89%;
}
</style>
