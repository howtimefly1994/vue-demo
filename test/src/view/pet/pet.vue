<template>
  <div>
    <div>
      <div class="searchBox">
        <el-col :span="22">
          <el-form ref="form" :model="searchForm" :inline="true">
            <el-form-item label="ID">
              <el-input v-model="searchForm.pid"></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="searchForm.pname" @keyup.enter.native="getTable()"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="value" placeholder="请选择" @change="selectSex">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
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
          <!-- <el-button type="danger" @click="showDialog('Info','add')">新增</el-button> -->
        </el-col>
      </div>
      <div id="tableBox">
        <el-table :data="tableData" style="width: 100%" border stripe >
          <!-- <el-table-column prop="date" label="人员ID" width="180" :formatter="formatDate"></el-table-column> -->
          <el-table-column prop="pid" label="ID" width="180"></el-table-column>
          <el-table-column prop="pname" label="姓名" width="180" :show-overflow-tooltip='true'></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="sex" label="性别" :formatter="formatGender"></el-table-column>
          <el-table-column prop="creatTime" label="时间" :formatter="formatDate"></el-table-column>
          <el-table-column fixed="right" label="操作" width="230">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="showDialog('Info','Info',scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="success"
                @click="showDialog('detail','detail',scope.row)"
              >详情</el-button>
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
      <!-- <Info :isShow="isShow" @sureDialogFather="getSonSure"></Info> -->
    </div>
  </div>
</template>
<script>
import Info from "../pet/component/Info";
import detail from "../pet/component/detail";
import tableMixins from "@/mixins/table-mixins/";
export default {
  name: "pet",
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
        pid: "",
        pname: "",
        sex: ""
      },
      options: [
        {
          value: "",
          label: "全部"
        },
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
  components: {
    Info,
    detail
  },
  created() {
    this.getTable();
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage1 = val;
      this.getTable();
      // console.log(`当前页: ${val}`);
    },
    handleDelete(row) {
      //删除
      this.delectTableRow(row);
    },
    selectSex(val) {
      //获取性别下拉选中
      this.searchForm.sex = val;
    },

    // 删除行
    delectTableRow(val) {
      let params = {
        pid: val.pid
      };
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.user.delectByPid(params).then(res => {
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
    getTable() {
      let params = {
        currentPage: this.currentPage1,
        pageSize: this.pagesize,
        pid: this.searchForm.pid,
        pname: this.searchForm.pname,
        sex: this.searchForm.sex
      };
      this.$http.user.getPet(params).then(res => {
        this.totalList = res.data.totalList[0].totalList;
        this.tableData = res.data.result;
      });
    }
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
/* 动画效果测试 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>