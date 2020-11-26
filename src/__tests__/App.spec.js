import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import App from '../App.vue'
import router from '@/router/index'

const localVue = createLocalVue()

localVue.use(Vuex)

const mockFilter = 'mockFilter'
const getSpy = jest.fn().mockImplementation(() => mockFilter)
const setSpy = jest.fn()
const actionSpy = jest.fn()
const store = new Vuex.Store({
  getters: {
    filter: getSpy
  },
  mutations: {
    setFilter: setSpy
  },
  actions: {
    addTodo: actionSpy
  }
})
const wrapper = shallowMount(App, { store, router, localVue })

describe('App.vue', () => {
  it('should be able to read filter from the store', () => {
    expect(wrapper.vm.filter).toBe(mockFilter)
  })

  it('should be able to write filter to the store', () => {
    const newVal = 'newfilter'
    wrapper.vm.filter = newVal

    expect(setSpy).toHaveBeenCalledWith({}, newVal)
  })

  it('should be able to add a new todo data structure', () => {
    wrapper.vm.addTodo()

    expect(actionSpy).toHaveBeenCalled()
  })
})
