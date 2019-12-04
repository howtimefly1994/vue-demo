<template>
  <div>
    <img @load="verifyLoadState=true" @click="toggleVerify" :src="verifiy" alt />
    <!-- <input type="button" value="123" @click="add()" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      verifyLoadState:"",
      verifiy:'http://localhost:3000/captcha'
    };
  },
  created() {},
  methods: {
    toggleVerify(e) {
      if (!this.verifyLoadState) return;
      // 防止下一次重复点击
      this.verifyLoadState = false;
      const base = "http://localhost:3000/captcha";
      this.verifiy = base + "?" + e.timeStamp;
    }
  }
};
</script>
<style>
</style>