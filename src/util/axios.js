import axios from 'axios';
import { getCookie } from './cookie'

// axios 配置
axios.defaults.timeout = 50000;
axios.defaults.baseURL = 'http://192.168.1.5:8080/dldsj/'; //这是调用数据接口,TODO:需要设置axios的跳转链接

// http request 拦截器，通过这个，我们就可以把Cookie传到后台
axios.interceptors.request.use(
  config => {
    const token = getCookie('session'); //获取Cookie
    // config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/json' //x-www-form-urlencoded保持参数以key-value的形式传到后台，json是以json字符串的形式传到后台
    };
    config.responseType =  'json';//请求数据类型包括'arraybuffer','blob','document','json','text','stream'
    // config.transformRequest= function(data){
    //   return data
    // };   // 只适用于 POST,PUT,PATCH，transformRequest` 允许在向服务器发送前，修改请求数据。后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    // config.transformResponse= function(data){
    //   return data
    // };  //transformResponse` 在传递给 then/catch 前，允许修改响应数据
    // config.validateStatus= function(status){
    //   return status < 400 //状态码小于400时均为成功（返回true）
    // }; //validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    if (token) {
      config.params = {'token': token} //无论请求为何种类型，在params中的属性都会以key=value的格式在urlzhong拼接
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  // response => {
  //   if(response.data.errCode == 2) {
  //     router.push({
  //       path: '/login',
  //       query: {redirect: router.currentRoute.fullPath} //从哪个页面跳转
  //     })
  //   }
  //   return response;
  // },
  // error => {
  //   return Promise.reject(error.response.data)
  // }
  );

/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {//params是添加到url中传参数，data是添加到请求体中传参数
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}
export function remove(url, data = {}) {//params是添加到url中传参数，data是添加到请求体中传参数
  return new Promise((resolve, reject) => {
    axios.delete(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}


/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

export default axios;
