<template>
  <div>
    <div class="searchBox">
      <el-col :span="22">
        <el-form ref="form" :model="searchForm" :inline="true">
          <el-form-item label="等级">
            <el-input v-model="searchForm.grade" clearable></el-input>
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
    <div id="tableBox">
      <el-table :data="tableData" style="width: 100%" border stripe>
        <!-- <el-table-column prop="date" label="人员ID" width="180" :formatter="formatDate"></el-table-column> -->
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="grade" label="等级" width="180" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="describe" label="描述"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="showDialog('Info','Info',scope.row)">编辑</el-button>
          
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
    <component
      v-if="isShow"
      v-bind:is="dialogComponent"
      :isShow="isShow"
      @sureDialogFather="getSonSure"
      :row="row"
      :type="dialogType"
    ></component>
  </div>
</template>
<script>
import Info from "./component/Info";
import add from "./component/add";
import tableMixins from "@/mixins/table-mixins/";
export default {
  name: "petGrade",
  mixins: [tableMixins],
  data() {
    return {
      dialogComponent: "", //选择弹出的组件，info、detail
      dialogType: "", //弹窗类型
      isShow: false,
      //   dialogVisible: false,
      currentPage1: 1, //当前页
      tableData: [], //表格数据,
      pagesize: 10, //每页数据
      totalList: 10, //总条数
      row: "", //当前行
      searchForm: {
        grade: ""
      }
    };
  },
  created() {
    this.getTable();
  },
  methods: {
    //分页
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage1 = val;
      this.getTable();
      console.log(`当前页: ${val}`);
    },
    //获取列表数据
    getTable() {
      let params = {
        currentPage: this.currentPage1,
        pageSize: this.pagesize,
        grade: this.searchForm.grade
      };
      this.$http.user.findAllGradeByPage(params).then(res => {
        this.totalList = res.data.totalList[0].totalList;
        this.tableData = res.data.result;
      });
    },
    handleDelete(row) {
      //删除
      this.delectTableRow(row);
    },
    // 删除行
    delectTableRow(val) {
      let params = {
        id: val.id
      };
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.user.deleteByGradeId(params).then(res => {
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
  },
  components: {
    add,
    Info
  }
};
</script>
<style>
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
#tableBox {
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
  padding: 0 !important;
  height: 50px;
  border-right-color: #3c3c3c !important;
  background-color: #304156 !important;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 40px;
}
/* 动画效果测试 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>