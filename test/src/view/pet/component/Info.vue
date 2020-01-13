<template>
  <div>
    <div v-if="dialogVisible">
      <el-dialog
        :title="type"
        :visible.sync="dialogVisible"
        :before-close="closeDialog"
        :modal="false"
      >
        <el-form :model="infoForm" :rules="rules" ref="infoForm">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="ID" :label-width="formLabelWidth">
                <el-input v-model="infoForm.pid" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="名字" :label-width="formLabelWidth" prop="pname">
                <el-input v-model="infoForm.pname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="头像" :label-width="formLabelWidth">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:3000/image"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :headers="myHeaders"
                >
                  <img v-if="infoForm.imageUrl" :src="infoForm.imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="value" placeholder="请选择" @change="selectSex">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="infoForm.creatTime" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="年龄" :label-width="formLabelWidth">
                <el-input v-model="infoForm.age" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog('concel','infoForm')">取 消</el-button>
          <el-button type="primary" @click="closeDialog('sure','infoForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import dialogMinxins from "@/mixins/dialog-mixins";
 
export default {
  mixins: [dialogMinxins],
  name: "Info",
  data() {
    return {
      myHeaders: { },
      infoForm: {
        pid: "",
        pname: "",
        sex: "",
        age: "",
        imageUrl: "",
        creatTime: ""
      },
      options: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        }
      ],
      value: "",
      rules: {
        pname: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getInfoForm();
  },
  methods: {
    closeDialog(val, infoForm) {
      console.log(this.infoForm);
      if (val == "sure") {
        this.$refs[infoForm].validate(valid => {
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
    selectSex(val) {
      //获取性别下拉选中
      this.infoForm.sex = val;
    },
    // 头像图片
    handleAvatarSuccess(res, file) {
      this.$message.success("success");
      let path = "";
      path = `http://localhost:3000` + `/img/markdown/${res.imgName}`;
      this.infoForm.imageUrl = path;
      this.$set(this.infoForm, this.infoForm.imageUrl, path);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 获取编辑页面数据
    getInfoForm() {
     
  
      let params = {
        pid: this.row.pid
      };
      this.$http.user.detailByPid(params).then(res => {
        this.infoForm = res.data.result[0];
        this.infoForm.creatTime = this.formatDate(this.infoForm); //调用mixins里面的方法对时间戳进行转换，下面性别也是
        this.value = res.data.result[0].sex;
      });
    },
    updateInfoForm() {
      let params = this.infoForm;
      console.log('params',params);
      this.$http.user.updateInfoForm(params).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="">
@import "../../../assets/css/dialog-css.css";
</style>