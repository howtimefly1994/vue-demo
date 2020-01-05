<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="treeBox">
          <div class="title-item"></div>
          <div class="tree-warp">qwe</div>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="markdownBox">
          <div class="title-item"></div>
          <div class="markdown-warp">
            <!-- <el-button @click="test()">打印</el-button> -->
            <mavon-editor ref="editor" v-model="doc" :ishljs="true"></mavon-editor>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "markdown",
  components: {
    mavonEditor
  },
  data() {
    return {
      doc: ""
    };
  },
  methods: {
    test() {
      console.log(this.doc);
    }
  }
};
</script>
<style lang="">
.treeBox,
.markdownBox {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.title-item {
  background: #304156;
  height: 40px;
  padding-left: 20px;
  color: #fff;
  line-height: 40px;
}
.tree-warp {
  height: 78vh;
  background-color: #fff;
}
</style>