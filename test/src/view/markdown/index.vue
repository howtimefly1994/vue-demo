<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="treeBox">
          <div class="title-item">
            <el-tooltip effect="dark" content="新增" placement="top" v-if="isFirstLevel">
              <i class="el-icon-circle-plus-outline" @click="addTree" />
            </el-tooltip>
            <el-tooltip effect="dark" content="编辑" placement="top" v-if="!isFirstLevel">
              <i class="el-icon-edit" />
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" v-if="!isFirstLevel">
              <i class="el-icon-delete" />
            </el-tooltip>
          </div>
          <div class="tree-warp">
            <el-tree
              :data="data"
              :props="defaultProps"
              node-key="unid"
              default-expand-all
              @node-click="handleNodeClick"
            ></el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="markdownBox">
          <div class="title-item" style="text-align:center">
            <span>{{seletTreeData.label}}</span>
          </div>
          <div class="markdown-warp">
            <!-- <el-button @click="test()">打印</el-button> -->
            <mavon-editor ref="editor" v-model="doc" :ishljs="true" @save="save" :subfield="false"></mavon-editor>
          </div>
        </div>
      </el-col>
    </el-row>
    <component
      v-if="isShow"
      v-bind:is="dialogComponent"
      :isShow="isShow"
      @sureDialogFather="getSonSure"
      :type="dialogType"
    ></component>
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import addTree from "./component/addTree";
import tableMixins from "@/mixins/table-mixins/";
export default {
  name: "markdown",
  mixins: [tableMixins],
  components: {
    mavonEditor,
    addTree
  },
  data() {
    return {
      dialogComponent: "", //选择弹出的组件，info、detail
      dialogType: "", //弹窗类型
      isShow: false,

      isFirstLevel: false, //是否选择父节点
      seletTreeData: {}, // 选中的数据
      seletTreeNode: null, // 选中的节点

      doc: "", //md
      data: [
        {
          unid: "0",
          label: "一级 1",
          children: []
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.getTable();
  },
  methods: {
    //获取选中节点的信息
    handleNodeClick(data, node) {
      if (node.level == 1) {
        this.isFirstLevel = true;
      } else {
        this.isFirstLevel = false;
      }
      this.seletTreeData = data;
      this.seletTreeNode = node;
      this.getMarkdown();
      // console.log(data, node);
      //    console.log(this.isFirstLevel);
    },
    // 新增子节点
    addTree() {
      this.showDialog("addTree");
    },
    //获取全部节点数据
    getTable() {
      this.$http.user.findAllTree().then(res => {
        for (let i = 0; i < res.data.result.length; i++) {
          var flag = true;
          for (let j = 0; j < this.data[0].children.length; j++) {
            if (this.data[0].children[j].unid == res.data.result[i].unid) {
              flag = false;
            }
          }
          if (flag) {
            this.data[0].children.push({
              unid: res.data.result[i].unid,
              label: res.data.result[i].label,
              sort: res.data.result[i].sort
            });
          }
        }
      });
    },
    //获取侧边Markdown
    getMarkdown() {
      if (!this.isFirstLevel) {
        let params = {
          unid: this.seletTreeData.unid
        };
        this.$http.user.getMarkdownByUnid(params).then(res => {
          if (res.data.result[0].md == null) {
            this.doc = "";
          } else {
            this.doc = res.data.result[0].md;
          }
        });
      }
    },
    //markdown工具栏的保存按钮
    save(value, rander) {
      let params = {
        unid: this.seletTreeData.unid,
        md: this.doc
      };
      this.$http.user.updateMarkdownByUnid(params).then(res => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
        }
      });
      //  console.log("markdown", value, rander, this.seletTreeData.unid);
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
  text-align: right;
  height: 40px;
  padding: 0 20px 0 20px;
  color: #fff;
  line-height: 40px;
}
.tree-warp {
  height: 78vh;
  background-color: #fff;
}
/* 增删改三个按钮间距离 */
.title-item > i {
  padding-left: 10px;
}
.el-tree-node__label {
  font-size: 18px;
}
.el-tree-node__content {
  height: 45px;
}
</style>