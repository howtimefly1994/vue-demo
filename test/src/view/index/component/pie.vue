<template>
  <div>
    <div class="pie">
      <div id="pie1">
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="main1" style="float:left;width:100%;height: 300px"></div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入饼状图组件
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
export default {
  name: "pie",
  data() {
    return {};
  },
  created() {
   
  },
  mounted() {
    this.initData();
  },
  methods: {
    //初始化数据
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main1"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "指派人员男女比例",
          left: "center",
          textStyle: {//主标题的属性
          color: '#304156',//颜色
          fontSize: 20,//大小
          fontWeight: '700',//粗细
          fontFamily: 'monospace',//字体
          // textBorderColor: "#000",//描边
          // textBorderWidth: '2',//描边的宽度
          textShadowColor: 'red',//阴影颜色
          textShadowBlur: '10',//阴影的宽度
          textShadowOffsetX: '-0',//阴影向X偏移
          textShadowOffsetY: '-70',//阴影向Y偏移
        },
          
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["女", "男"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "女" ,itemStyle:{color:"#ea6363"}},
              { value: 310, name: "男" ,itemStyle:{color:"#3398db"}},
              
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>