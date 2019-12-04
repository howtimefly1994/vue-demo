import axios from '../axios'
import qs from 'qs'
const user = {
    getUser(){
        return axios.get('index/query');
    },
    loginUser(params){
        return axios.post('login',qs.stringify(params))
    },
    getCaptcha(){
        return axios.get('captcha')
    }

}
export default user