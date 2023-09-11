/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';
import { ElMessage } from 'element-plus'
//qs.stringify()是将对象 序列化成URL的形式，以&进行拼接
//  let protocol = window.location.protocol; //协议
//  let host = window.location.host; //主机
//  axios.defaults.baseURL = protocol + "//" + host;
axios.defaults.baseURL = 'http://www.XiaoLeQL.com/api'

axios.interceptors.request.use( //响应拦截
    async config => {
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        config.headers.token = localStorage.getItem('token')
        return config;
    },
    error => {
        return Promise.error(error);
    })
// 响应拦截器
axios.interceptors.response.use(
    response => {
        console.log("响应拦截器",response)
        if (response.data.code === 200) {
            return Promise.resolve(response.data); //进行中        
        } else {
            return Promise.reject(response); //失败       
        }
    },
    // 服务器状态码不是200的情况    
    error => {
        let status = error.response.status;
        switch (status) {
            case 404:
                //错误提示信息
                ElMessage({
                    type: 'error',
                    message: '请求失败路径出现问题'
                })
                break;
            case 500 | 501 | 502 | 503 | 504 | 505:
                ElMessage({
                    type: 'error',
                    message: '服务器挂了'
                })
                break;
            case 401:
                ElMessage({
                    type: 'error',
                    message: '参数有误'
                })
                break;
        }
        return Promise.reject(new Error(error.message))
    }
);
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
const $get = (url, params) => {
    let promise = new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data.msg)
        })
    })
    return promise
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
const $post = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params)) //是将对象 序列化成URL的形式，以&进行拼接   
            .then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data.msg)
            })
    });
}
//下面是vue3必须加的，vue2不需要，只需要暴露出去get，post方法就可以
export default {
    install: (app) => {
        app.config.globalProperties['$get'] = $get;
        app.config.globalProperties['$post'] = $post;
        app.config.globalProperties['$axios'] = axios;
    }
}