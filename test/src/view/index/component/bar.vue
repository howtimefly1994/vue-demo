<template>
  <div>
    <div class="bar">
      <div id="bar1">
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="main2" style="float:left;width:100%;height: 300px"></div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入饼状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
export default {
  name: "bar",
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
      var myChart = echarts.init(document.getElementById("main2"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "需求创建时间统计",
          left: "center",
          textStyle: {
            //主标题的属性
            color: "#304156", //颜色
            fontSize: 20, //大小
            fontWeight: "700", //粗细
            fontFamily: "monospace", //字体
            // textBorderColor: "#000",//描边
            // textBorderWidth: '2',//描边的宽度
            textShadowColor: "red", //阴影颜色
            textShadowBlur: "10", //阴影的宽度
            textShadowOffsetX: "-0", //阴影向X偏移
            textShadowOffsetY: "-70" //阴影向Y偏移
          }
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      });
    }
  }
};
</script>