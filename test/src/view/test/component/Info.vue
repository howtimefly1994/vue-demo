<template>
  <div>
    <el-dialog :title="type" :visible.sync="dialogVisible" :before-close="closeDialog" :modal='false'>
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="活动区域2" :label-width="formLabelWidth">
          <el-select v-model="form.region2" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="closeDialog()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Info",
  props: {
    type: {
      //弹窗类型，接收父组件传来的值，用于确定弹窗标题
      type: String,
      default: ""
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isShow() {
      this.dialogVisible = this.isShow;
      // console.log(this.dialogVisible);
    }
  },
  data() {
    return {
      dialogVisible: this.isShow,
      form: {
        name: "",
        region: "",
        region2:''
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    closeDialog() {
      this.$emit("sureDialogFather",this.form);
    }
  }
};
</script>