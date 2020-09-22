import { createStore } from 'vuex'


export default createStore({
  state: {
    users: null || JSON.parse(localStorage.getItem('user')!),
    token: null || localStorage.getItem('token')!
  },
  mutations: {
    setUser(state, data) {
      state.users = data
    },
    setToken(state, data) {
      state.token = data
    }
  },
  actions: {
  },
  modules: {
  }
})
