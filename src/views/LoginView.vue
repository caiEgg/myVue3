<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="" />
            </div>
            <!-- 登录表单区域 -->
            <el-form label-width="0px" class="login_form">
                <!-- 用户名 -->
                <el-form-item>
                    <el-input placeholder="请输入用户名" v-model="ruleForm.username" class="form-item"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item>
                    <el-input type="password" placeholder="请输入密码" autoComplete="on" v-model="ruleForm.password"
                        class="form-item"></el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-row justify="end">
                    <el-form-item class="login_btn">
                        <el-button type="primary" size="large" @click="login">登录</el-button>
                        <el-button type="info" size="large" @click="clearRuleForm">重置</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
   
<script setup>

import { reactive } from 'vue'
import { getCurrentInstance } from "vue";
import { ElMessage } from 'element-plus';
import {useRouter} from 'vue-router';
import { userLoginStore } from '@/store/loginUser.js';
import {setRoutes} from '@/router/index.js'
// import { storeToRefs } from 'pinia';
// 可以在组件中的任意位置访问 `store` 变量 ✨


const store = userLoginStore()

// const { loginUserInfo } = storeToRefs(store)
// 作为 action 的 increment 可以直接解构
const { setUserInfo } = store
const { proxy } = getCurrentInstance();
const router = useRouter()
const ruleForm = reactive({
    username: 'admin',
    password: 'admin',
})
function login() {
    proxy.$post("/login", ruleForm).then((response) => {
        localStorage.setItem('token',response.token)
        ElMessage({
            type: 'success',
            message: '登录成功'
        })
        setUserInfo(response)
        setRoutes()
       
        router.push('/')
        // setRoutes()
    }, (error) => {
        
        ElMessage({
            type: 'error',
            message: `${error}`
        })
    })
}
function clearRuleForm() {
    ruleForm.username = ""
    ruleForm.password = ""
}


</script>
   
<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100vh;
}

.login_box {
    // 宽450像素
    width: 650px;
    // 高300像素
    height: 500px;
    // 背景颜色
    background-color: #fff;
    // 圆角边框3像素
    border-radius: 15px;
    // 绝对定位
    position: absolute;
    // 距离左则50%
    left: 50%;
    // 上面距离50%
    top: 50%;
    // 进行位移，并且在横轴上位移-50%，纵轴也位移-50%
    transform: translate(-50%, -50%);

    .avatar_box {

        // 盒子高度130像素
        height: 130px;
        // 宽度130像素
        width: 130px;
        // 边框线1像素 实线
        border: 1px solid #eee;
        // 圆角
        border-radius: 50%;
        // 内padding
        padding: 10px;
        // 添加阴影 向外扩散10像素 颜色ddd
        box-shadow: 0 0 10px #ddd;
        // 绝对定位
        position: absolute;
        // 距离左则
        left: 50%;
        // 位移
        transform: translate(-50%, -50%);
        // 背景
        background-color: #fff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 400px;
    padding: 0 20px;
    padding: 40px;
    box-sizing: border-box;

    .form-item {
        height: 60px;
        font-size: 24px;

    }
}

.login_btn {
    // 设置弹性布局
    display: flex;
    // 横轴上尾部对齐
    justify-content: flex-end;
}
</style>
  