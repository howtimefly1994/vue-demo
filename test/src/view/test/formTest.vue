<template>
  <div>
    <div class="searchBox">
      123
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formModel: {
        name: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log("1111");

      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.$router.push({ path: "/" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="">
.searchBox {

  height: 62px;
  width: 100%;
  padding: 20px 20px 0 20px;
  background-color: rgb(124, 42, 42);
}
</style>
