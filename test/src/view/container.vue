<template>
  <div id="layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="initial">
          <sideMenu />
        </el-aside>
        <el-container>
          <div class="second_header">
            <div id="iconBox">
              <i class="el-icon-s-unfold" @click="collapseSide()" v-show="$store.state.collapse"></i>
              <i class="el-icon-s-fold" @click="collapseSide()" v-show="!$store.state.collapse"></i>
            </div>
          </div>
          <el-main>
             <router-view />
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
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
<style>
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
  height: 51px;
  width: 100%;
  background-color: rgb(85, 82, 82);
}
#iconBox {
  width: 30px;
  height: 30px;
  font-size: 30px;
  /* background-color: yellow; */
  position: absolute;
  top: 50%;
  margin-top: -17px;
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
  line-height: 60px;
}

.el-aside {
  background-color: #3c3c3c;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
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
