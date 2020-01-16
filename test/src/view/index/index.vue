<template>
  <div>
    <div class="statisbox">
      <div class="statis-item">
        <div class="statis-card">
          <span>123</span>
          <div class="card-footer">文章总数</div>
        </div>
      </div>
      <div class="statis-item">
        <div class="statis-card">
            <span>456</span>
          <div class="card-footer">模块一总数</div>
        </div>
      </div>
      <div class="statis-item">
        <div class="statis-card">
            <span>789</span>
          <div class="card-footer">模块二总数</div>
        </div>
      </div>
    </div>
    <div class="statisbox" style="margin-top:20px">
      <div class="statis-item">
        <div class="echarts-card">
          <pie></pie>
        </div>
      </div>
      <div class="statis-item">
        <div class="echarts-card">
            <bar></bar>
        </div>
      </div>
    </div>
    <div class="statisbox" style="margin-top:20px">
        <div class="statis-item">
        <div class="echarts-card">
            <line1></line1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pie from "./component/pie";
import bar from "./component/bar";
import line1 from "./component/line1";
export default {
  name: "index",
  components: {
    pie,
    bar,
    line1
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="">
.statisbox {
  width: 100%;
  display: flex;
  text-align: center;
}
.statis-item {
  flex: 1;
  flex-wrap: wrap;
  margin: 1px;
  margin-right: 20px;
  
}
.echarts-card {
  position: relative;
  width: 100%;
  background-color: #fff;
  height: 300px;
  padding-top: 10px;
  line-height: 90px;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.statis-card {
  position: relative;
  width: 100%;
  background-color: #fff;
  height: 108px;
  line-height: 90px;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.card-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 30px;
  background-color: #ccc;
  font-size: 15px;
  color: black;
  line-height: 30px;
  opacity: 1;
  width: 100%;
}
</style>