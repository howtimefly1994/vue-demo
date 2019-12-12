<template>
  <div>
    <div class="searchBox">
      <el-form ref="form" :model="form"  :inline="true">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableBox">
       <el-table
      :data="tableData"
      style="width: 100%"
      border>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "1",
        age:'22'
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
       tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
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
  margin-bottom: 10px;
  text-align: left;
  line-height: 30px;
  font-weight: bold;
  /* font-size: 30px; */
  padding: 20px 20px 0 20px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 40px;
    background-color: #3c3c3c;
}
.el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
}

</style>
