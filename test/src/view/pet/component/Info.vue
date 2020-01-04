<template>
  <div>
    <div v-if="dialogVisible">
      <el-dialog
        :title="type"
        :visible.sync="dialogVisible"
        :before-close="closeDialog"
        :modal="false"
      >
        <el-form :model="infoForm">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="ID" :label-width="formLabelWidth">
                <el-input v-model="infoForm.pid" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="名字" :label-width="formLabelWidth">
                <el-input v-model="infoForm.pname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="头像" :label-width="formLabelWidth">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
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
          <el-button @click="closeDialog()">取 消</el-button>
          <el-button type="primary" @click="closeDialog()">确 定</el-button>
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
      imageUrl: "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2524666289,3365852660&fm=26&gp=0.jpg",
      infoForm: {
        pid: "",
        name: "",
        sex: "",
        age: "",
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
      value: ""
    };
  },
  mounted() {
    this.getInfoForm();
  },
  methods: {
    closeDialog() {
      this.$emit("sureDialogFather");
    },
    selectSex(val) {
      //获取性别下拉选中
      this.infoForm.sex = val;
    },
    // 头像图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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

    getInfoForm() {
      let params = {
        pid: this.row.pid
      };
      this.$http.user.detailByPid(params).then(res => {
        this.infoForm = res.data.result[0];
        this.infoForm.creatTime = this.formatDate(this.infoForm); //调用mixins里面的方法对时间戳进行转换，下面性别也是
        this.value = res.data.result[0].sex;
      });
    }
  }
};
</script>
<style lang="">
@import "../../../assets/css/dialog-css.css";
</style>