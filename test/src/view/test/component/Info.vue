<template>
  <div>
    <el-dialog
      :title="type"
      :visible.sync="dialogVisible"
      :before-close="closeDialog"
      :modal="false"
      @open="clearData"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="bugId" :label-width="formLabelWidth" prop="bugId">
              <el-input v-model.number="form.bugId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属项目" :label-width="formLabelWidth" prop="project">
              <el-input v-model="form.project" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="指派给" :label-width="formLabelWidth" prop="assign">
              <el-select v-model="form.assign" placeholder="请选择">
                <el-option
                  v-for="item in selectOptions"
                  :key="item.pid"
                  :label="item.pname"
                  :value="item.pname"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建者" :label-width="formLabelWidth" prop="creator">
              <el-input v-model="form.creator" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="优先级" :label-width="formLabelWidth">
              <el-radio-group v-model="form.priority" v-for="(item,key) in priorityList" :key="key">
                <el-radio :label="item.grade"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="describe">
          <el-input type="textarea" v-model="form.describe" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="closeDialog('sure','form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import dialogMinxins from "@/mixins/dialog-mixins";
export default {
  mixins: [dialogMinxins],
  name: "add",
  data() {
    return {
      form: {
        bugId: "",
        describe: "",
        creator: "",
        creatTime: "",
        priority: "",
        project: "",
        assign: ""
      },
      priorityList: [],
      rules: {
        bugId: [
          { required: true, message: "bugId不能为空" },
          { type: "number", message: "bugId必须为数字值" }
        ],
        describe: [{ required: true, message: "不能为空", trigger: "blur" }],
        creator: [
          { required: true, message: "不能为空", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        project: [
          { required: true, message: "不能为空", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ]
      },
      selectOptions: []
    };
  },
  mounted() {
    this.getInfoForm();
    this.getSelectData();
    this.getPriorityList();
  },
  methods: {
    //新增按钮和取消按钮，点击提交表单
    closeDialog(val, form) {
      //   console.log(this.form);
      if (val == "sure") {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.updateInfoForm(); //更新数据

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

    //清除表单数据
    clearData() {
      this.$refs.form.resetFields();
    },
    getInfoForm() {
      let params = {
        bugId: this.row.bugId
      };
      this.$http.user.detailByBugId(params).then(res => {
        this.form = res.data.result[0];
      });
    },
    updateInfoForm() {
      let params = this.form;
      //console.log('params',params);
      this.$http.user.updateByBugId(params).then(res => {
        // console.log(res.data);
      });
    },
    getSelectData() {
      this.$http.user.getAllPet().then(res => {
        this.selectOptions = res.data.result;
      });
    },
    getPriorityList() {
      this.$http.user.findAllGrade().then(res => {
        this.priorityList = res.data.result;
      });
    }
  }
};
</script>
<style lang="">
@import "../../../assets/css/dialog-css.css";
.el-radio {
  margin-top: 15px;
}
.el-radio-group {
  padding-bottom: 10px;
}
.el-radio__label {
  padding: 0 10px 0 5px !important;
}
</style>