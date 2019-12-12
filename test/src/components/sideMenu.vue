<template>
  <div>
    <el-menu
      default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#3C3C3C"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse=$store.state.collapse
      router
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-submenu>
      <el-menu-item index="/form">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="/form">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
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
  width: 150px;
  min-height: 400px;
}
.el-menu {
  border-right-width: 0px;
}
/* 下拉菜单字体 */
.el-submenu__title {
  font-size: 10px;
   /* padding-left: 0 !important; */
}
/* 普通菜单字体 */
.el-menu-item {
  font-size: 10px;
  /* padding-left: 0 !important; */
}

</style>