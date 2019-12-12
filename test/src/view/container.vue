<template>
  <div id="layout">
    <el-container>
      <el-aside width="initial">
          <sideMenu />
        </el-aside>
      
      <el-container>
        <el-header>Header</el-header>
        <!-- <el-container> -->
          <div class="second_header">
            <div id="iconBox">
              <i class="el-icon-s-unfold" @click="collapseSide()" v-show="$store.state.collapse"></i>
              <i class="el-icon-s-fold" @click="collapseSide()" v-show="!$store.state.collapse"></i>
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
      collapse: this.$store.state.collapse
    };
  },
  methods: {
    collapseSide() {
      this.$store.commit("change");
      console.log(this.$store.state.collapse);
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
  height: 31px;
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
  /* background-color: yellow; */
  position: absolute;
  top: 50%;
  margin-top: -11px;
  /* left: 10px; */
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
  background-color: #262626;
  color: #333;
  text-align: center;
  line-height: 50px;
  height: 50px !important;
}

.el-aside {
  background-color: #3c3c3c;
  color: #333;
  text-align: center;
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
