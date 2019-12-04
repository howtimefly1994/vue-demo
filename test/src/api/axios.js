// 配置API接口地址
var root = process.env.API
// var root = 'https://cnodejs.org/api/v1'
// 引用axios
console.log("---" + root);
//var axios = require('axios')
import axios from 'axios'


var instance = axios.create({
  timeout: 1000 * 12,
  baseURL: root
})
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.withCredentials = true;
export default instance;