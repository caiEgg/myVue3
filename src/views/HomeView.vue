<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header class="common-header flex-float">
          <div class="flex">
            <img class="logo" src="../assets/logo.png" alt="" />
            <h1 class="title">商铺后台管理系统</h1>
          </div>

          <el-button type="danger" @click="logOut">{{ loginUserInfo.username }}退出</el-button>
        </el-header>
        <el-container>
          <!-- 侧边栏 -->
          <el-aside class="common-aside" width="200px">
            <!-- 菜单 -->
            <el-menu background-color="none" text-color="#fff" :router="true">
              <testItem v-for="menu in loginUserInfo.rights" :menu="menu" :key="menu.id" :index="menu.role_path"></testItem>
            </el-menu>
          </el-aside>
          <el-main>
            <router-view></router-view></el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import {onMounted } from 'vue'
import { userLoginStore } from '@/store/loginUser.js'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const store = userLoginStore()
const router = useRouter()
// const { count } = storeToRefs(store)
const { loginUserInfo } = storeToRefs(store)
const {clearUserInfo} = store
onMounted(()=>{
 
  console.log(router.getRoutes(),"没执行吗")
})
function logOut(){
  localStorage.clear('token');
  clearUserInfo()
  router.push('/login');
}
</script>
<style >
.el-container {
  height: 100vh;
  overflow: hidden;
}

.common-header {
  background: rgb(63 67 72);
}

.common-aside {
  background: rgb(48, 55, 65);
}

.logo {
  width: 60px;
}

.title {
  color: #fff;
}
</style>
