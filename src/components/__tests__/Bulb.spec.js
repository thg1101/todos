import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import Bulb from '../Bulb.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Bulb.vue', () => {
  it('should not render the light bulb rays if dark mode is on', () => {
    const store = new Vuex.Store({
      modules: {
        Settings: {
          namespaced: true,
          getters: {
            darkMode: jest.fn().mockImplementation(() => true)
          },
          mutations: {
            setDarkMode: jest.fn()
          }
        }
      }
    })
    const wrapper = shallowMount(Bulb, { store, localVue })

    const rays = wrapper.find('.rays')
    expect(rays.exists()).toBe(false)
  })

  it('should render the light bulb rays if dark mode is off', () => {
    const store = new Vuex.Store({
      modules: {
        Settings: {
          namespaced: true,
          getters: {
            darkMode: jest.fn().mockImplementation(() => false)
          }
        }
      }
    })
    const wrapper = shallowMount(Bulb, { store, localVue })

    const rays = wrapper.find('.rays')
    expect(rays.exists()).toBe(true)
  })

  it('should call the necessary getter / setter', () => {
    const getSpy = jest.fn().mockImplementation(() => true)
    const setSpy = jest.fn()
    const store = new Vuex.Store({
      modules: {
        Settings: {
          namespaced: true,
          getters: {
            darkMode: getSpy
          },
          mutations: {
            setDarkMode: setSpy
          }
        }
      }
    })
    const wrapper = shallowMount(Bulb, { store, localVue })

    // force a read of the vm's computed
    console.log(wrapper.vm.darkMode)
    expect(getSpy).toHaveBeenCalled()

    // write a new value to the vm's computed
    wrapper.vm.darkMode = false
    expect(setSpy).toHaveBeenCalledWith({}, false)
  })
})
