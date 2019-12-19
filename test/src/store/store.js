import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    collapse: false,
    token: ""
  },
  mutations: {
    change(state) {
      state.collapse = !state.collapse;
    },
    setToken(state, token) {
      state.token = token;
      console.log(state.token);
      localStorage.setItem('Authorization', token)
    }
  }
})