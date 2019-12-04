<template>
  <div class="layout">
    <div class="header">头部</div>
    <div id="container">
      
      <div class="column" id="center">mmmmmmqweqweqweqwmmmeqwmmmm</div>
      <div class="column" id="left">zzzzzzzzzzz
          <br>111
          <br>123
          <br>123
          <br>123
          <br>123
          <br>123
          <br>123
          <br>123
          <br>123
          <br>123
          <br>123
          <br>123
      </div>
      <div class="column" id="right">yyyyyyyyyyyyy</div>
    </div>
    <div class="foot">底部</div>
  </div>
</template>
<script>
export default {
  name: "css_test",
  mounted() {
      this.test()
  },
  methods: {
      test(){
          var a=[1,2,3,4]
          var b=[1]
          var c= a.slice(0,2)
          console.log("a",c);
          var d=a.splice(1,1,'w','e')
          console.log("d",d);
          console.log("a",a);
      }
  }
};
</script>
<style lang="">
/* * {
  padding: 0;
  margin: 0;
} */
/* body {
  min-width: 550px;
} */
#container
.column {
  float: left;
}
#container {
    padding-right: 150px;
    padding-left: 200px;
}
#right {
    width: 150px;
    background-color: rgb(70, 68, 68);
    margin-right: -150px;
}
#center {
    width: 100%;
    background-color: rgb(53, 59, 151);
}
#left {
    position: relative;
    right: 200px;
    width: 200px;
    margin-left: -100%;
    background-color: rgb(167, 161, 161);
}
.foot ,.header{
  clear: both;
  background-color: rgb(22, 16, 16);
}
</style>