<template>
  <div id="layout">
    <el-container>
      <el-aside width="initial">
        <sideMenu />
      </el-aside>

      <el-container>
        <el-header>
          <el-col :span="22">header</el-col>
          <el-col :span="2">
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-avatar shape="square" :size="30" :src="squareUrl"></el-avatar>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="loginOut()">退出</el-dropdown-item>
                <el-dropdown-item>个人资料</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-header>
        <!-- <el-container> -->
        <div class="second_header">
          <div id="iconBox">
            <i class="el-icon-s-unfold" @click="collapseSide()" v-show="$store.state.collapse"></i>
            <i class="el-icon-s-fold" @click="collapseSide()" v-show="!$store.state.collapse"></i>
          </div>
          <div id="breadcrumbBox">
            <!-- <i class="el-icon-delete"></i> -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                v-for="(item,index) in breadcrumb"
                :key="index"
              >{{item.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <el-main>
          <router-view />
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
        <!-- </el-container> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sideMenu from "@/components/sideMenu.vue";
export default {
  name: "App",
  data() {
    return {
      // breadcrumb: "",
      collapse: this.$store.state.collapse,
      squareUrl:
        "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1294403272,3279068192&fm=26&gp=0.jpg"
    };
  },
  methods: {
    collapseSide() {
      //控制折叠
      this.$store.commit("change");
      console.log(this.$store.state.collapse);
    },
    loginOut() {
      this.$router.push({ path: "/" });
      localStorage.removeItem("Authorization");
      console.log("退出 ");
    }
  },
  computed: {
    breadcrumb() {
      return this.$route.matched.slice(1);
    }
  },
  components: {
    sideMenu
  }
};
</script>
<style scoped>
html,
body,
#layout,
.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
}
.second_header {
  position: relative;
  min-height: 31px;
  width: 100%;
  /* background-color: rgb(85, 82, 82);
   */
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
#iconBox {
  width: 10px;
  height: 20px;
  font-size: 20px;
  position: absolute;
  top: 50%;
  margin-top: -11px;
}
#breadcrumbBox {
  width: 500px;
  height: 20px;
  font-size: 20px;
  line-height: 20px;
  position: absolute;
  top: 63%;
  text-align: left;
  margin-top: -11px;
  margin-left: 27px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.el-header,
.el-footer {
  height: 57px !important;
  background-color: #304156;
  color: #333;
  text-align: center;
  line-height: 76px;
  /* height: 50px !important; */
}

.el-aside {
  background-color: #001529;
  color: #333;
  text-align: left;
  line-height: 200px;
}

.el-main {
  background-color: #f5f7f9;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

/* body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
</style>
