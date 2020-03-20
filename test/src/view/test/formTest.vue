<template>
  <div>
    <div class="searchBox">
      <el-col :span="22">
        <el-form ref="searchBox" :model="searchForm" :inline="true">
          <el-form-item label="创建者">
            <el-input v-model="searchForm.creator"></el-input>
          </el-form-item>
          <el-form-item label="指派给">
            <el-input v-model="searchForm.assign"></el-input>
          </el-form-item>

          <el-form-item label="创建时间">
            <el-date-picker
              v-model="searchForm.creatTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              style="vertical-align:middle"
              @click="getTable()"
            >搜索</el-button>
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
            <el-button size="mini" type="success" @click="openDrawer(scope.row)">详情</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
       :total="totalList"
      ></el-pagination>
    </div>

    <el-drawer :title="drawerTitle" :visible.sync="drawer" :direction="direction">
      <span>{{drawerDetail}}</span>
    </el-drawer>

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
      totalList:10,
      pagesize: 10, //每页数据
      row: "", //当前行

      // 控制详情抽屉
      drawer: false,
      direction: "rtl",
      drawerDetail: "",
      drawerTitle: "",

      isShow: false,
      dialogVisible: false,
      //列表
      form: {
        bugId: "",
        userId: "",
        creatTime: "",
        priority: "",
        project: "",
        describe: "",
        assign: ""
      },
      formLabelWidth: "120px",
      //筛选区
      searchForm: {
        creator: "",
        assign: "",
        creatTime: ""
      },
      startTime: "",
      endTime: "",

      searchBox: {
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
    // 删除
    handleDelete(row) {
      this.delectTableRow(row);
    },

     handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage1 = val;
      this.getTable();
      console.log(`当前页: ${val}`);
    },
    //详情抽屉
    openDrawer(row) {
      this.drawer = true;
      let params = {
        bugId: row.bugId
      };
      this.$http.user.detailByBugId(params).then(res => {
        console.log(res.data);
        this.drawerDetail = res.data.result[0].describe;
        this.drawerTitle = res.data.result[0].project;
      });
    },
    //获取列表数据
    getTable() {
      let params = {
        currentPage: this.currentPage1,
        pageSize: this.pagesize,
        creator: this.searchForm.creator,
        assign: this.searchForm.assign
      };

      this.changeSearchFormTime();
      params.startTime = this.startTime;
      params.endTime = this.endTime
      console.log("22",typeof( params.startTime));
      this.$http.user.findAllConfirmByPage(params).then(res => {
        // console.log("table", res.data.result);
        this.totalList = res.data.totalList[0].totalList;
        this.tableData = res.data.result;

      });
    },
    // 删除行
    delectTableRow(val) {
      console.log(val);
      let params = {
        bugId: val.bugId
      };
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.user.deleteByBugId(params).then(res => {
            if (res.data.code == 1) {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.getTable();
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //处理时间选择器null和undefined
    changeSearchFormTime() {
      if (
        this.searchForm.creatTime != null &&
        this.searchForm.creatTime != undefined &&
        this.searchForm.creatTime.length > 0 
  
      ) {
        this.startTime = this.searchForm.creatTime[0] / 1000;
        this.endTime = this.searchForm.creatTime[1] / 1000;
       
      } else {
        this.startTime = "";
        this.endTime = "";
      }
      // console.log("11",isNaN(this.startTime));
    }
  }
};
</script>
<style lang="" >
.el-date-editor {
  width: 250px !important;
}
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
/* 控制抽屉 */
.el-drawer__body {
  overflow-wrap:break-word;
  padding: 10px;
  text-indent: 20px;
  letter-spacing: 2px;
}
</style>


