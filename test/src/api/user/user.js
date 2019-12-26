import axios from '../axios'
import qs from 'qs'
const user = {
    getUser(params){
        return axios.get('index/query'+"?currentPage="+params.currentPage+"&&pagesize="+params.pageSize);
    },
    loginUser(params){
        return axios.post('login',qs.stringify(params))
    },
    getCaptcha(){
        return axios.get('captcha')
    },
    getPet(params){
        return axios.get('pet/findPetByPage'+"?currentPage="+params.currentPage+"&&pageSize="+params.pageSize+"&&pid="+params.pid+"&&pname="+params.pname);
    },
}
export default user