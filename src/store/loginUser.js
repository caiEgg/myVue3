import { defineStore } from 'pinia'
import {ref} from 'vue'

export const userLoginStore = defineStore('loginUser', () => {
    let loginUserInfo =ref( JSON.parse(localStorage.getItem('loginUserInfo'))) ||ref({})
    function setUserInfo(data){
        this.loginUserInfo = data
        let loginInfo = JSON.stringify(this.loginUserInfo)
        localStorage.setItem('loginUserInfo',loginInfo)
       
    }
    function clearUserInfo(){
        this.loginUserInfo = {}
    }
    return { loginUserInfo, setUserInfo,clearUserInfo }

})