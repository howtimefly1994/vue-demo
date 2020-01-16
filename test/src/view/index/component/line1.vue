<template>
  <div>
    <div class="line">
      <div id="line1">
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="main3" style="float:left;width:100%;height: 300px"></div>
      </div>
      <!-- <div id="pie2">
        <div id="main2" style="float:left;width:100%;height: 300px"></div>
      </div>-->
    </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入饼状图组件
require("echarts/lib/chart/line");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
export default {
  name: "line1",
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.initData();
  },
  methods: {
    //初始化数据
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main3"));
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      });
    }
  }
};
</script>