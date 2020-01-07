<template>
  <div>
    <div v-if="dialogVisible">
      <el-dialog
        :title="type"
        :visible.sync="dialogVisible"
        :before-close="closeDialog"
        :modal="false"
      >
        <el-form :model="treeForm" :rules="rules" ref="treeForm">
          <el-form-item label="节点名称" :label-width="formLabelWidth" prop="label">
            <el-input v-model="treeForm.label" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
            <el-input v-model="treeForm.sort" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog('concel','treeForm')">取 消</el-button>
          <el-button type="primary" @click="closeDialog('sure','treeForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import dialogMinxins from "@/mixins/dialog-mixins";
export default {
  name: "addTree",
  mixins: [dialogMinxins],
  data() {
    return {
      treeForm: {
        label: "",
        sort: ""
      },
      rules: {
        label: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 9, message: "长度在 1 到 9 个字符", trigger: "blur" }
        ],
        // sort: [
        //   { required: true, message: "请输入排序", trigger: "blur" },
        //   { min: 3, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        // ]
      }
    };
  },
  methods: {
    closeDialog(val, treeForm) {
      if (val == "sure") {
        this.$refs[treeForm].validate(valid => {
          if (valid) {
            this.updateInfoForm(); //更新树节点数据
            this.$emit("sureDialogFather"); //传给父组件，告知弹窗关闭
            this.$message({
              type: "success",
              message: "编辑成功"
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$emit("sureDialogFather"); //如果是取消按钮，直接关闭弹窗
      }
    },
    updateInfoForm() {
      let params = this.treeForm;
      this.$http.user.addSonTree(params).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="">
@import "../../../assets/css/dialog-css.css";
</style>