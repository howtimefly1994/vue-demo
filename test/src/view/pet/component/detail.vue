<template>
  <div>
    <div v-if="dialogVisible">
      <el-dialog
        :title="type"
        :visible.sync="dialogVisible"
        :before-close="closeDialog"
        :modal="false"
      >
        <el-form :model="detForm">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="PID" :label-width="formLabelWidth">
                <el-input v-model="detForm.pid" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="名字" :label-width="formLabelWidth">
                <el-input v-model="detForm.pname" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年龄" :label-width="formLabelWidth">
                <el-input v-model="detForm.age" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-input
                  v-model="detForm.sex"
                  autocomplete="off"
                  :disabled="true"
                  style="background-color:blue"
                  v-if="detForm.sex =='男'"
                ></el-input>
                <el-input
                  v-model="detForm.sex"
                  autocomplete="off"
                  :disabled="true"
                  style="background-color:red"
                  v-if="detForm.sex =='女'"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="detForm.creatTime" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import dialogMinxins from "@/mixins/dialog-mixins";
export default {
  mixins: [dialogMinxins],
  name: "Info",
  //有些弹窗传值的方法可以复用，此处运用到mixins混入的方式写在dialogMixins文件中
  data() {
    return {
      detForm: {
        pname: "",
        pid: "",
        age: "",
        sex: "",
        creatTime: ""
      }
    };
  },
  mounted() {
    this.getDetForm();
  },
  methods: {
    closeDialog() {
      this.$emit("sureDialogFather");
    },
    getDetForm() {
      let params = {
        pid: this.row.pid
      };
      this.$http.user.detailByPid(params).then(res => {
        this.detForm = res.data.result[0];
        this.detForm.creatTime = this.formatDate(this.detForm); //调用mixins里面的方法对时间戳进行转换，下面性别也是
        this.detForm.sex = this.formatGender(this.detForm);
      });
    }
  }
};
</script>
<style lang="">
@import "../../../assets/css/dialog-css.css";
</style>