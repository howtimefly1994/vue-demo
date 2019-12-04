<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-09 14:40:40
 * @LastEditTime: 2019-11-07 10:33:01
 * @LastEditors: Please set LastEditors
 -->
 <template>
  <div class="com-dialog-wrap">
    <el-form
      ref="ruleForm"
      :model="formInline"
      :rules="ruleInline"
      :label-position="labelPosition"
      :label-width="labelWidth"
      @submit.native.prevent
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名" prop="nickName">
            <el-input v-model="formInline.nickName" :disabled="true" placeholder="请输入姓名" />
            <!-- <span>{{ info.nickName }}</span> -->
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <!-- <span>{{ info.phone }}</span> -->
            <el-input v-model="formInline.phone" :disabled="true" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="formInline.gender" placeholder="请选择">
              <el-option
                v-for="(item,index) in gender"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="会员等级" prop="vipClass">
            <!-- <el-select v-model="formInline.vipClass" placeholder="请选择"> -->
            <el-select v-model="formInline.vipClass" placeholder="请选择">
              <!-- <el-option
                v-for="(item,index) in vipClass"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>-->
              <el-option
                v-for="(item,index) in vipClass.content"
                :key="index"
                :label="item.levelName"
                :value="item.unid"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="消费积分"  prop="consumeCredits ">
            <!-- <span>{{ info.userInfos.consumeCredits }}</span> -->
            <el-input v-model="formInline.userInfos.consumeCredits " :disabled="true" placeholder="请输入消费积分" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信名称" :disabled="true" prop="wxNickName">
            <!-- <span>{{ info.wxNickName }}</span> -->
            <el-input v-model="formInline.wxNickName" :disabled="true" placeholder="微信名称" />
          </el-form-item>
          <el-form-item label="出生年月" :disabled="true" prop="birthDay">
            <el-date-picker v-model="formInline.birthDay" :disabled="true" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>

          <el-form-item label="地区" prop="selectedOptions">
            <el-cascader
              ref="myCascader"
              size="large"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="注册时间" prop="creTime">
            <!-- <span>{{ info.creTime }}</span> -->
            <el-date-picker
              v-model="formInline.creTime"
              align="right"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="基础积分" prop="baseCredits">
            <!-- <el-input v-model="formInline.baseCredits" placeholder="请输入基础积分" /> -->
            <el-input v-model.number="formInline.baseCredits" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="头像:" prop="avatarUrl">
        <div class="upload-item">
          <img
            v-if="formInline.avatarUrl"
            :src="formInline.avatarUrl"
            class="upload-img"
            @click.self="showDialog('Upload', '上传头像', 'imgId', 'avatarUrl')"
          />
          <i
            v-else
            class="el-icon-plus upload-icon"
            @click.self="showDialog('Upload', '上传头像', 'imgId', 'avatarUrl')"
          />
          <svg-icon
            v-if="formInline.AdImage"
            icon-class="close"
            class="del-item"
            @click="delAvatar('imgId', 'avatarUrl')"
          />
        </div>
      </el-form-item>
    </el-form>
    <footer class="com-footer-wrap">
      <el-button v-ripples :loading="subLoading" type="primary" @click="submitForm('ruleForm')">提 交</el-button>
      <el-button v-ripples @click="closeDialog">取 消</el-button>
    </footer>
    <el-dialog :visible.sync="visible" top="10vh" :title="comTitle" append-to-body>
      <component
        :is="comType"
        v-if="visible"
        :src="formInline[uploadImgPath]"
        @on-crop="handleCroped"
      />
    </el-dialog>
  </div>
</template>
  
  <script>
import Upload from "./Upload";
import dialogMixins from "@/mixins/dialog-mixins";

import { base64ToFile, deepClone, findIndex } from "@/utils";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
export default {
  props: {
    userId: {
      type: String,
      default: null
    }
  },
  components: {
    Upload
  },
  mixins: [dialogMixins],
  data() {
    return {
      gender: [
        {
          value: 1,
          label: "男"
        },
        {
          value: 2,
          label: "女"
        },
        {
          value: 0,
          label: "未知"
        }
      ],
      vipClass: "",
      // vipClass: [
      //   {
      //     value: "1556162286883305288",
      //     label: "个人"
      //   },
      //   {
      //     value: "1556162286883305289",
      //     label: "黄金会员"
      //   },
      //   {
      //     value: "1556162286883305399",
      //     label: "铂金会员"
      //   },
      //   {
      //     value: "1556162286883305282",
      //     label: "普通会员"
      //   }
      // ],
      // 表单验证

      creTime: [{ required: true, message: "请选择注册时间", type: "String" }],
      //birthDay: [{ required: true, message: "请选择出生年月日" }],

      options: provinceAndCityData,
      selectedOptions: ["350000","300025"],
     

      ruleInline: {
        vipClass: [{ required: true, message: "请选择会员等级" }],

        baseCredits: [
          { required: true, message: "请输入基础积分", trigger: "blur" },
          {
            type: "number",
            min: 0,
            max: 99999999,
            message: "必须是数字且长度在 0 到 8 个字符",
            trigger: "blur"
          }
          // { type: 'number',min: 0, max: 5, message: "长度在 0 到 8 个字符" }
        ]
      },
      uploadObj: {
        avatarUrl: null
      },
      // imgsData:[], //详情获取图片的数据
      formInline: {
        avatarUrl: "", //头像
        vipClass: "", //会员等级
        nickName: "", //真实姓名
        phone: "",
        province: "", //省
        city: "", //市
        birthDay: "", //出生日期
        province: "", //国家
        consumeCredits: "", //消费积分
        wxNickName: "", //微信名称
        gender: "", // 性别
        imgId: "", //广告图unid
        // userInfos: {
        //   baseCredits:""
        // },
        userInfos: "",
        baseCredits: "", //基础积分
        creTime: "" //注册时间
      },

      imgFiles: [],
      visible: false, // 是否显示弹窗

      comType: "", // 弹窗组件
      comTitle: "", // 弹窗标题
      uploadImgUnid: "", // 上传的图片的unid字段
      uploadImgPath: "", // 上传的图片的路径字段
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  created() {
    console.log(provinceAndCityData);
  },
  methods: {
   

    formatDate(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d;
    },
    // handleChange(value,a) {
    //   console.log(value);
    //   console.log(value, this.$refs['myCascader'].label)

    // },
    getCheckedNodes(value) {},
    getData(data) {
      this.formInline.address = data.address;
      this.formInline.longitude = data.lnglat[0];
      this.formInline.latitude = data.lnglat[1];
    },

    handleChange(value) {
      // debugger;
      this.formInline.province = CodeToText[value[0]];
      this.formInline.city = CodeToText[value[1]];
    },
    sendImgDatas(file) {
      this.imgFiles.push(file);
    },
    // async getDet() {
    //   console.log("\\\\\\\\\\\\\\\\\\\\\\\\");
    //   const resSelect = await this.$api[this.$route.meta.module][
    //     this.$route.meta.request.getSelect
    //   ](Object.assign({ userId: this.defalutParams.unid }, this.otherParams));
    //   console.log("resSelect------------------------" + resSelect);
    // }, //获取下拉数据

    async getDet() {
      const resSelect = await this.$api[this.$route.meta.module][
        this.$route.meta.request.getSelect
      ](Object.assign({ userId: this.defalutParams.unid }, this.otherParams));

      this.vipClass = resSelect;
      console.log(
        "vipclass------------------------" + JSON.stringify(this.vipClass)
      );

      const res = await this.$api[this.$route.meta.module][
        this.$route.meta.request.det
      ](Object.assign({ userId: this.defalutParams.unid }, this.otherParams));
      if (res) {
        if (this.afterGet) {
          this.afterGet(res);
        } else {
          this.info = res;
          for (const key in this.formInline) {
            if (this.info[key]) {
              this.$set(this.formInline, key, this.info[key]);
            }
          }
        }
      }

      let picUrl = res.avatarUrl
      if(res.avatarUrl.indexOf('https://wx') == -1){
        picUrl = this.$config.source + res.avatarUrl;
      }
      const params = {
        avatarUrl: picUrl,
        birthDay: this.formatDate(res.birthDay),
        creTime: this.formatDate(res.creTime),
        vipClass: res.userInfos.vipClass,
        baseCredits: res.userInfos.baseCredits
      };

      const newParams = Object.assign(res, params);
      for (const key in this.formInline) {
        this.$set(this.formInline, key, newParams[key]);
      }
      console.log("formInline++++" + JSON.stringify(this.formInline));
      return res;
    },

    // 显示弹窗
    showDialog(type, title, uploadImgUnid, avatarUrl) {
      this.comTitle = title;
      this.comType = type;
      this.visible = true;
      this.uploadImgUnid = uploadImgUnid;
      this.uploadImgPath = avatarUrl;
    },

    // 裁剪图片回调
    handleCroped(val) {
      this.visible = false;
      this.formInline[this.uploadImgPath] = val;
      this.uploadObj[this.uploadImgPath] = base64ToFile(val);
    },
    // showMapDialog() {
    //   this.Mapvisible = true;
    // },
    // 提交之前做的处理
    async beforeSub() {
      console.log("formInline--------" + this.formInline);
      let params = [];
      const ids = await this.uploadFiles();
      if (ids) {
        for (const key in ids) {
          params.push(ids[key].unid);
        }
      }
      const adImageRes = await this.uploadAdImage();
      if (adImageRes) {
        params.imgId = adImageRes.unid;
        params.avatarUrl = adImageRes.filePath;
      } else {
        params.avatarUrl = this.info && this.info.avatarUrl;
      }

      const newParams = Object.assign(deepClone(this.formInline), params);

      this.subData(newParams);
      // this.subData(obj)

     
    },
    // 删除上传的图片
    async delAvatar(type, typePath) {
      if (this.formInline[type]) {
        const res = await this.$api.common.delFile({
          ids: this.formInline[type]
        });
        if (res) {
          this.$set(this.formInline, type, "");
          this.$set(this.formInline, typePath, "");
          this.$set(this.uploadObj, type, "");
        }
      } else {
        this.$set(this.formInline, type, "");
        this.$set(this.formInline, typePath, "");
        this.$set(this.uploadObj, type, "");
      }
    },
    async uploadFiles() {
      if (this.imgFiles.length) {
        const formData = new FormData();
        for (const key in this.imgFiles) {
          formData.append("files", this.imgFiles[key].raw);
        }
        formData.append("fileType", "0000");
        formData.append(
          "uploadUser",
          this.$wsCache.get("userInfo").userBack.unid
        );
        const res = await this.$api.common.uploads(formData);
        if (res) return res;
      } else {
        return null;
      }
    },
    // 上传广告图片
    async uploadAdImage() {
      if (this.uploadObj.avatarUrl) {
        const formData = new FormData();
        formData.append("file", this.uploadObj.avatarUrl);
        formData.append("fileType", "0002");
        formData.append(
          "uploadUser",
          this.$wsCache.get("userInfo").userBack.unid
        );
        const res = await this.$api.common.upload(formData);
        if (res) {
          return res;
        }
      } else {
        return null;
      }
    },

  }
};
</script>
  
  
<style lang="less" scoped>
.upload-item {
  width: 95px;
  height: 95px;
  text-align: center;
  position: relative;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  i {
    width: 95px;
    height: 100%;
    font-size: 30px;
    line-height: 95px;
    background: #dedede;
  }
  .del-item {
    width: 20px;
    height: 20px;
    position: absolute;
    top: -10px;
    right: -10px;
    cursor: pointer;
  }
}

.words-num {
  padding: 0 5px;
  position: absolute;
  text-align: right;
  right: 18px;
  bottom: 2px;
  background-color: #fff;
}
/deep/ .el-select {
  width: 100%;
}
</style>
  