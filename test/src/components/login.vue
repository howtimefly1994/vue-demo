<template>
  <div class="login_warp">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-weight:bold">登陆</span>
      </div>
      <div class="text item">
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
            <el-input v-model="formModel.pas" class="form--input" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <span class="svg-container">
              <i class="el-icon-success"></i>
            </span>
            <el-input
              v-model="formModel.verifiy"
              class="txtSearch"
              @keyup.enter.native="submitForm('ruleForm')"
            ></el-input>
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
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      verifyLoadState: "",
      verifiy: "http://localhost:3000/captcha",
      //  verifiy:'http://49.235.129.13:3000/captcha',
      // verifiy:"http://chen1994.club:3000/captcha",
      formModel: {
        name: "66666",
        pas: "66666",
        verifiy: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pas: [
          { required: true, message: "密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    // this.$http.user.getUser().then(res => {
    //   console.log("++" + JSON.stringify(res));
    // });
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
          console.log(res);
          var token = res.data.result.token;
          //  console.log(token);
          this.$store.commit("setToken", token);
          this.$message({
            message: "登陆成功",
            type: "success"
          });
          this.$router.push({
            path: "/index"
          });
        } else if (res.data.result.code == -2) {
          const base = this.verifiy;
          this.verifiy = base + "?" + Math.random();
          this.$message({
            message: "验证码错误",
            type: "warning"
          });
        } else {
          const base = this.verifiy;
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
      const base = this.verifiy;
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
  background-image: url("../assets/img/login-bg.png");
  background-color: rgb(48, 65, 86);
}
.txtSearch {
  vertical-align: middle;
  width: 60%;
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

.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  position: relative;
  top: 30%;
  left: 68%;
  width: 400px;
  box-shadow: 5px 5px 4px rgb(59, 61, 70);
}
</style>
