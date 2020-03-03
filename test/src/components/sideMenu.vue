<template>
  <div>
    <el-menu
     
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="rgba(255,255,255,0.7)"
      active-text-color="#fff"
      :collapse="$store.state.collapse"
      router
    >
      <el-menu-item index="/index">
        <i class="el-icon-document"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>需求管理</span>
        </template>
        <el-menu-item index="/form">需求管理</el-menu-item>
        <el-menu-item index="/thetest">需求等级管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/pet">
        <i class="el-icon-menu"></i>
        <span slot="title">指派人员管理</span>
      </el-menu-item>
      <el-menu-item index="/markdown">
        <i class="el-icon-s-order"></i>
        <span slot="title">Markdown</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "sideMenu",
  data() {
    return {
      activePath: "/index"
    };
  },
  created() {
      this.getHref();
  },
  computed: {
    activePathcom: function() {
      let nowHref = window.location.href;
      let url = nowHref.split("#")[1];
      this.activePath = url;
      return window.location.href.split("#")[1];
    }
  },
  methods: {
    // 解决页面刷新后菜单无法高亮
    getHref() {
      let nowHref = window.location.href;
      let url = nowHref.split("#")[1];
      this.activePath = url;
      // console.log( this.activePath);
    },
 
  }
};
</script>
<style lang="" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right-width: 0px;
}
.is-active {
  background-color: #2d8cf0 !important;
}
</style>