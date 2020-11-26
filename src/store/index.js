import Vue from 'vue'
import Vuex from 'vuex'

import Main from '@/store/main'
import Settings from '@/store/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  ...Main,
  modules: {
    Settings
  }
})
