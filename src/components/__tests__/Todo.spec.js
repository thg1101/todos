import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import Todo from '../Todo.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

const setSpy = jest.fn()
const actionSpy = jest.fn()
const store = new Vuex.Store({
  mutations: {
    setFilter: setSpy
  },
  actions: {
    updateTodo: actionSpy,
    removeTodo: actionSpy
  },
  modules: {
    Settings: {
      namespaced: true,
      getters: {
        darkMode: jest.fn().mockImplementation(() => true)
      }
    }
  }
})
const propsData = {
  done: true,
  title: 'mock title',
  description: 'mock description',
  date: null,
  uid: 'mock uid'
}
const wrapper = shallowMount(Todo, { store, localVue, propsData })

describe('Todo.vue', () => {
  beforeEach(() => {
    actionSpy.mockReset()
  })

  it('should read darkMode', () => {
    expect(wrapper.vm.darkMode).toBe(true)
  })

  it('should remove a todo', () => {
    wrapper.vm.removeTodo()
    expect(actionSpy).toHaveBeenCalledWith(expect.anything(), propsData.uid)
  })

  it('should handle change events', () => {
    // handle change for dates
    let mockValue = new Date()
    wrapper.vm.hndChange(mockValue, 'date')

    // first argument will be the context, and we are not interested in testing that
    let payload = Object.assign({}, propsData, { date: mockValue })
    expect(actionSpy).toHaveBeenCalledWith(expect.anything(), payload)

    // handle change for the done checkbox
    mockValue = false
    wrapper.vm.hndChange(mockValue, 'done')

    payload = Object.assign({}, propsData, { done: mockValue })
    expect(actionSpy).toHaveBeenLastCalledWith(expect.anything(), payload)

    // handle change for title (or description)
    mockValue = 'new text'
    // we'll simulate an event object as the first argument
    wrapper.vm.hndChange({ target: { value: mockValue } }, 'title')

    payload = Object.assign({}, propsData, { title: mockValue })
    expect(actionSpy).toHaveBeenLastCalledWith(expect.anything(), payload)
  })
})
