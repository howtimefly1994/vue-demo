<template>
  <div>
    <div class="statisbox">
      <div class="statis-item">
          <div class="statis-card">
              <div class="card-footer">
                  123
              </div>
          </div>
      </div>
      <div class="statis-item">2</div>
      <div class="statis-item">3</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "index"
};
</script>
<style lang="">
.statisbox {
  width: 100%;
  
  border: 1px solid black;
  display: flex;
}
.statis-item{
  flex: 1;
  flex-wrap: wrap;
  margin: 1px;
  margin-right:10px;
}
.statis-card{
    position: relative;
    width: 100%;
    background-color: rgb(142, 118, 231);
    height: 200px;
}
.card-footer{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 30px;
    background-color: #ccc;
    font-size: 15px;
    line-height: 30px;
    text-align: center;
    opacity:0.5;
    width: 100%;
}
</style>