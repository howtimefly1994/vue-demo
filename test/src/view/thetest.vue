<template>
  <div>
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="timestamp"
      ></el-date-picker>
      <el-button @click="open()">123123</el-button>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
       value1: '',
    };
  },
  methods: {
   open(){
     if(this.value1[0] != undefined || this.value1[1] != undefined){
       console.log("startTime",this.value1[0]);
     }else{
       
     }
     
   }
  }
};
</script>
<style lang="">

</style>