import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import Home from '../Home.vue'
import Todo from '@/components/Todo'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Home.vue', () => {
  it('should not render the light bulb rays if dark mode is on', () => {
    const store = new Vuex.Store({
      getters: {
        todos: jest.fn().mockImplementation(() => [{
          date: null,
          description: 'mock description',
          done: true,
          title: 'mock todo',
          uid: '83cc2404-9499-4679-80b8-d55e92e9ac7c'
        }])
      },
      actions: {
        loadStore: jest.fn()
      }
    })
    const wrapper = shallowMount(Home, { store, localVue })

    // there should be one todo rendered
    const allTodos = wrapper.findAllComponents(Todo)
    expect(allTodos).toHaveLength(1)
  })
})
