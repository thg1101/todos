import Vue from 'vue'
import Vuex from 'vuex'

const vueSpy = jest.spyOn(Vue, 'use')

describe('should test server configuration', () => {
  beforeAll(() => {
    require('../index')
  })

  it('should use CORS config', () => {
    expect(vueSpy).toHaveBeenCalledWith(Vuex)
  })
})
