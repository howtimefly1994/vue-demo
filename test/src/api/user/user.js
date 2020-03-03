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
    getAllPet(params){
        return axios.get('pet/findAllpetByPage')
    },
    getPet(params){
        return axios.get('pet/findPetByPage'+"?currentPage="+params.currentPage+"&&pageSize="+params.pageSize+"&&pid="+params.pid+"&&pname="+params.pname+"&&sex="+params.sex);
    },
    detailByPid(params){
        return axios.get('pet/detailByPid?pid='+params.pid)
    },
    delectByPid(params){
        return axios.post('pet/deleteByPid',qs.stringify(params))
    },
    updateInfoForm(params){
        return axios.post('pet/updateByPid',qs.stringify(params))
    },
    //markdown
    findAllTree(params){
        return axios.get('markdown/findAllTree')
    },
    addSonTree(params){
        return axios.post('markdown/addSonTree',qs.stringify(params))
    },
    getMarkdownByUnid(params){
        return axios.get('markdown/getMarkdownByUnid?unid='+params.unid)
    },
    updateMarkdownByUnid(params){
        return axios.post('markdown/updateMarkdownByUnid',qs.stringify(params))
    },
    deleteTreeByUnid(params){
        return axios.post('markdown/deleteTreeByUnid',qs.stringify(params))
    },
    findTreeByUnid(params){
        return axios.get('markdown/findTreeByUnid?unid='+params.unid)
    },
    updateTreeByUnid(params){
        return axios.post('markdown/updateTreeByUnid',qs.stringify(params))
    },
    //confirm
    findAllConfirmByPage(params){
        return axios.get('/bugConfirm/findAllConfirmByPage?creator='+ params.creator + '&&assign=' + params.assign+'&&startTime=' + params.startTime+ '&&endTime=' + params.endTime+'&&currentPage='+params.currentPage+"&&pageSize="+params.pageSize)
    },
    addFirm(params){
        return axios.post('bugConfirm/addConfirm',qs.stringify(params))
    },
    detailByBugId(params){
        return axios.get('bugConfirm/detailByBugId?bugId='+params.bugId)
    },
    updateByBugId(params){
        return axios.post('bugConfirm/updateByBugId',qs.stringify(params))
    },
    deleteByBugId(params){
        return axios.post('bugConfirm/deleteByBugId',qs.stringify(params))
    },
    //首页
    findDrillData(params){
        return axios.get('indexData/findDrillData')
    },
}
export default user