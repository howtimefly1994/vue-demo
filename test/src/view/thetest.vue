<template>
  <div>
    <div class="mavonEditor">
      <el-button @click="test()">打印</el-button>
      <mavon-editor ref="editor" v-model="doc" :ishljs = "true"></mavon-editor>
    </div>
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "thetest",
  components: {
    mavonEditor
  },
  data() {
    return {
      doc: ""
    };
  },
  methods: {
      test(){
          console.log(this.doc);
      }
  }
};
</script>
<style lang="">
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>