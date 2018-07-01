import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const state = () => {
  return {
    curPageIndex: 0,
    userInfo: {
      name: '',
      age: '',
      height: '',
      idealWeight: '',
      gender: 'female'
    }
  }
}

export const mutations = {
  setCurPageIndex(state, payload) {
    state.curPageIndex = payload.curPageIndex
  },
  setUserInfo(state, payload) {
    state.userInfo = payload.userInfo
  },
  clearUserInfo(state) {
    state.userInfo = {
      name: '',
      age: '',
      height: '',
      idealWeight: '',
      gender: 'female'
    }
  }
}
