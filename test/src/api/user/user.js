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
    // 宠物
    getPet(params){
        return axios.get('pet/findPetByPage'+"?currentPage="+params.currentPage+"&&pageSize="+params.pageSize+"&&pid="+params.pid+"&&pname="+params.pname+"&&sex="+params.sex);
    },
    detailByPid(params){
        return axios.get('pet/detailByPid?pid='+params.pid)
    },
    delectByPid(params){
        return axios.post('pet/deleteByPid',qs.stringify(params))
    },
}
export default user