<template>
  <div>
    <div class="statisbox">
      <div class="statis-item">
        <div class="statis-card">
          <span>
            <router-link :to="{path:'/form'}" style=" text-decoration: none;color:black;font-size:24px;">{{confirmNum}}</router-link>
          </span>
          <div class="card-footer">需求确认总数</div>
        </div>
      </div>
      <div class="statis-item">
        <div class="statis-card">
            <span>
              <router-link :to="{path:'/form'}" style=" text-decoration: none;color:black;font-size:24px;">{{personNum}}</router-link>
            </span>
          <div class="card-footer">指派人总数</div>
        </div>
      </div>
      <div class="statis-item">
        <div class="statis-card">
            <span>
              <router-link :to="{path:'/markdown'}" style=" text-decoration: none;color:black;font-size:24px;">{{markdownNum}}</router-link>
            </span>
          <div class="card-footer">markdown笔记总数</div>
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
    return {
      confirmNum:'',//需求
      personNum:'',//指派人员
      markdownNum:''//markdown
    };
  },
  created () {
    this.findDrillData()
  },
  methods: {
    findDrillData(){
      this.$http.user.findDrillData().then(res => {
       this.confirmNum=res.data.result[2].Num;
       this.personNum=res.data.result[0].Num;
       this.markdownNum=res.data.result[1].Num;;
      })
    }
  }
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
  background-color: #304156;
  font-size: 15px;
  color: white;
  line-height: 30px;
  opacity: 1;
  width: 100%;
}
</style>