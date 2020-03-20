<template>
  <div>
    <div v-if="dialogVisible">
      <el-dialog
        :title="type"
        :visible.sync="dialogVisible"
        :before-close="closeDialog"
        :modal="false"
      >
        <el-form :model="form" :rules="rules" ref="form">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="等级" :label-width="formLabelWidth" prop="grade">
                <el-input type="input" v-model="form.grade" autocomplete="off" maxlength="30"></el-input>
              </el-form-item>
              <el-form-item label="排序" :label-width="formLabelWidth" prop="creator">
                <el-input-number v-model="form.sort" label="描述文字"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="describe">
            <el-input type="textarea" v-model="form.describe" autocomplete="off" maxlength="30"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog()">取 消</el-button>
          <el-button type="primary" @click="closeDialog('sure','form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import dialogMinxins from "@/mixins/dialog-mixins";
export default {
  name: "add",
  mixins: [dialogMinxins],
  data() {
    return {
      form: {
        sort: "",
        describe: "",
        grade: ""
      },
      rules: {
        describe: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            min: 1,
            max: 155,
            message: "长度在 1 到 155 个字符",
            trigger: "blur"
          }
        ],
        grade: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            min: 1,
            max: 4,
            message: "长度在 1 到 4 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //新增按钮和取消按钮，点击提交表单
    closeDialog(val, form) {
      //   console.log(this.form);
      if (val == "sure") {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.addFirmGrade(); //更新数据
            this.$emit("sureDialogFather"); //传给父组件，告知弹窗关闭
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$emit("sureDialogFather"); //如果是取消按钮，直接关闭弹窗
      }
    },
    //调用新增接口
    addFirmGrade() {
      let params = this.form;
      // console.log("params", params);
      this.$http.user.addConfirmGrade(params).then(res => {
        if (res.data.code == -1) {
          this.$message({
            type: "warning",
            message: "新增失败,id不能重复"
          });
        } else {
          this.$message({
            type: "success",
            message: "新增成功"
          });
        }
      });
    }
  }
};
</script>
<style lang="">
@import "../../../assets/css/dialog-css.css";
</style>