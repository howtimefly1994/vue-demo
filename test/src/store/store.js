import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
      collapse: false
    },
    mutations: {
        change (state) {
        state.collapse=!state.collapse
      }
    }
  })