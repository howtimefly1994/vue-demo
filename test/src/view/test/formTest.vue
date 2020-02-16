<template>
  <div>
    <div class="searchBox">
      <el-col :span="22">
        <el-form ref="form" :model="searchForm" :inline="true">
          <el-form-item label="活动名称">
            <el-input v-model="searchForm.name"></el-input>
          </el-form-item>
          <el-form-item label="活动">
            <el-input v-model="searchForm.age"></el-input>
          </el-form-item>
          <el-form-item label="活动123">
            <el-input v-model="searchForm.age2"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" style="vertical-align:middle">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" @click="showDialog('add','add')">新增</el-button>
      </el-col>
    </div>
    <div class="tableBox">
      <el-table :data="tableData" style="width: 100%" border stripe>
        <!-- <el-table-column prop="date" label="人员ID" width="180" :formatter="formatDate"></el-table-column> -->
        <el-table-column prop="bugId" label="禅道ID" width="80"></el-table-column>
        <el-table-column prop="creator" label="创建者" width="80"></el-table-column>
        <el-table-column prop="creatTime" label="创建时间" width="180" :formatter="formatDate"></el-table-column>
        <el-table-column prop="priority" label="优先级"></el-table-column>
        <el-table-column prop="project" label="所属项目"></el-table-column>
        <el-table-column prop="describe" label="描述" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="assign" label="指派给"></el-table-column>
        <el-table-column fixed="right" label="操作" width="230">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button size="mini" type="primary" @click="showDialog('Info','Info',scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="success"
              @click="showDialog('detail','detail',scope.row)"
            >详情</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pageBox" style="text-align:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="pagesize"
        layout="total, prev, pager, next"
        :total="tableData.length"
      ></el-pagination>
    </div>

    <component
      v-if="isShow"
      v-bind:is="dialogComponent"
      :isShow="isShow"
      @sureDialogFather="getSonSure"
      :row="row"
      :type="dialogType"
    ></component>
    <!-- <Info :isShow="isShow" @sureDialogFather="getSonSure"></Info> -->
  </div>
</template>
<script>
import Info from "../test/component/Info";
import detail from "../test/component/detail";
import add from "../test/component/add";
import tableMixins from "@/mixins/table-mixins/";
export default {
  mixins: [tableMixins],
  data() {
    return {
      dialogComponent: "", //选择弹出的组件，info、detail
      dialogType: "", //弹窗类型
      currentPage1: 1, //当前页
      tableData: [], //表格数据,
      pagesize: 10, //每页数据
      row: "", //当前行
      isShow: false,
      dialogVisible: false,
      form: {
        bugId: "",
        userId: "",
        createTime: "",
        priority: "",
        project: "",
        descripe: "",
        assign: ""
      },
      formLabelWidth: "120px",

      searchForm: {
        name: "1",
        age: "22",
        age2: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getTable();
  },
  components: {
    Info,
    detail,
    add
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleEdit(index, row) {
      console.log(index, row);
      console.log(index);
    },
    // handleDelete(index, row) {
    //   console.log(index, row.date);
    //   // this.$elemeneuiMessage('请填写数字！','warning')

    //   this.$http.user.getUser().then(res => {
    //     console.log(res);
    //   });
    // },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage1 = val;
      console.log(`当前页: ${val}`);
    },

    getTable() {
      let params = {
        currentPage: this.currentPage1,
        pageSize: this.pagesize
      };
      this.$http.user.findAllConfirmByPage(params).then(res => {
        // console.log("table", res.data.result);
        this.tableData = res.data.result;
      });
    }
  }
};
</script>
<style lang="">
.searchBox {
  height: 62px;
  width: 100%;
  /* font-size: 0; */
  margin-bottom: 10px;
  text-align: left;
  line-height: 30px;
  font-weight: bold;
  /* font-size: 30px; */
  padding: 20px 20px 0 20px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.tableBox {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
}
.pageBox {
  height: 32px;
  width: 100%;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
/* 控制表头和内容行高*/
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 50px;
  border-right-color: #3c3c3c;
  background-color: #304156;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 40px;
}
</style>


