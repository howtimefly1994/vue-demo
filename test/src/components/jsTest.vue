<template>
    <div>
        <input type="button" value="测试" onmouseover="test()">
    </div>
</template>
<script>
export default {
    name:'jsTest',
    methods: {
       test(){
           alert('123')
       }
    },
}
</script>