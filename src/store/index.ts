import { createStore } from 'vuex'


export default createStore({
  state: {
    users: null || JSON.parse(localStorage.getItem('user')!)
  },
  mutations: {
    setUser(state, data) {
      state.users = data
    }
  },
  actions: {
  },
  modules: {
  }
})
