import ElementUI from 'element-ui';
// 配置API接口地址
var root = process.env.API
// var root = 'https://cnodejs.org/api/v1'
// 引用axios
console.log("baseUrl" + root);
import axios from 'axios'
import router from '../router';

var instance = axios.create({
  timeout: 1000 * 12,
  baseURL: root,

})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.withCredentials = true;


// 每次请求都获取localStorage里面的token
instance.interceptors.request.use(function (config) {
  let Authorization = localStorage.getItem('Authorization')
  if (Authorization) {
    Authorization = 'bearer ' + Authorization.replace(/'|"/g, ' ')
    // Object.assign(config.headers,{'authorization':Authorization});
    // config.headers.common['Authorization']=Authorization;
    config.headers.Authorization = Authorization
  }
  return config
}, function (err) {
  return Promise.reject(err)
})
//返回状态判断(添加响应拦截器)
instance.interceptors.response.use(res => {
  /*  这里对全局的返回code做判断，可以留着以后用来做提示语 */
  //对响应数据做些事
  // if (res.data.result.code != 200) {
  //   // alert(res.error_msg)
  //   return Promise.reject(res).catch(err => {})
  // }
  return res
}, error => {
  if (error.response.status === 401) {
    // 401 说明 token 验证失败
    // 可以直接跳转到登录页面，重新登录获取 token
    ElementUI.Message({
      message: 'token过期请重新登录',
      type: 'warning'
    });
    location.href = '/login'
    // router.replace({path:"/"})
  } else if (error.response.status === 500) {
    return Promise.reject(error.response.data).catch(err => { })
  }
  // 返回 response 里的错误信息
  return Promise.reject(error.response.data).catch(err => { })
})

export default instance;