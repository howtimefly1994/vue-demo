<template>
  <div>
    <el-menu
      :default-active="activePath"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#3C3C3C"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse=$store.state.collapse
      router
    >
     <el-menu-item index="/index">
        <i class="el-icon-document"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>人员管理</span>
        </template>
        <el-menu-item index="/form">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-submenu>
      <el-menu-item index="/pet">
        <i class="el-icon-menu"></i>
        <span slot="title">这个管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "sideMenu",
  data() {
    return {
       activePath:'/index'
    };
  },
  created() {
   
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="" scoped>
/* .el-menu {
  width: 100%;
} */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right-width: 0px;
}


</style>