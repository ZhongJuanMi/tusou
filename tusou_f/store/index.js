import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const state = () => {
  return {
    userInfo: {}
  }
}

export const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload.userInfo
  },
  clearUserInfo(state) {
    state.userInfo = {}
  }
}
