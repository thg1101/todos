export default {
  namespaced: true,

  // module assets
  state: {
    darkMode: false
  },
  getters: {
    darkMode (state) {
      return state.darkMode
    }
  },
  mutations: {
    setDarkMode (state, value) {
      state.darkMode = value
      if (value) document.body.classList.add('dark')
      else document.body.classList.remove('dark')
    }
  }
}
