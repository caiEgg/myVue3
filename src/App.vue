<template>
  <router-view/>
</template>
<script setup>
import {setRoutes} from '@/router/index.js'
import { onBeforeMount } from 'vue';
onBeforeMount(()=>{
  console.log("有执行吗")
  setRoutes()
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* flex布局 */
.flex-float {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex {
  display: flex;
  align-items: center;
}
</style>
