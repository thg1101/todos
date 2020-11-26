import store from '../main'

const mockTodos = [{
  date: null,
  description: 'Mock description A',
  done: true,
  title: 'Mock title X',
  uid: '83cc2404-9499-4679-80b8-d55e92e9ac7c'
}, {
  date: '2020-11-24T22:00:00.000Z',
  description: 'Mock description B',
  done: true,
  title: 'Mock title Y',
  uid: '7e47caed-2ebb-4b3d-886d-1a91a6cf6bd7'
}]

global.fetch = jest.fn(() =>
  Promise.resolve()
)

describe('Main store', () => {
  describe('getters', () => {
    it('should get darkMode', () => {
      expect(store.getters.todos({ filter: '', todos: mockTodos })).toBe(mockTodos)
      expect(store.getters.todos({ filter: 'Y', todos: mockTodos })).toStrictEqual([mockTodos[1]])
    })
  })

  describe('mutations', () => {
    it('should setFilter', () => {
      const state = { filter: '' }
      const mock = 'filter'

      store.mutations.setFilter(state, mock)
      expect(state.filter).toBe(mock)
    })

    it('should addTodo', () => {
      const state = { todos: [] }

      store.mutations.addTodo(state)
      expect(state.todos).toHaveLength(1)
      expect(state.todos[0].title).toBe('')
      expect(state.todos[0].description).toBe('')
      expect(state.todos[0].date).toBe(null)
      expect(typeof state.todos[0].uid).toBe('string')
    })

    it('should removeTodo', () => {
      const state = {
        todos: [].concat(mockTodos)
      }

      // remove an id that is present
      store.mutations.removeTodo(state, mockTodos[0].uid)
      expect(state.todos).toHaveLength(1)

      // fail to remove an id that is not present
      store.mutations.removeTodo(state, 'nonesense')
      expect(state.todos).toHaveLength(1)
    })

    it('should updateTodo', () => {
      const newTodo = Object.assign({}, mockTodos[0], { title: 'new title' })
      const wrongTodo = Object.assign({}, mockTodos[0], { title: 'new title', uid: 'wrong' })
      const state = {
        todos: mockTodos
      }

      // fail to update a todo that's not in the store
      store.mutations.updateTodo(state, wrongTodo)
      expect(state.todos).toBe(mockTodos)

      // update a todo that's in the store
      store.mutations.updateTodo(state, newTodo)
      expect(state.todos[0].title).toBe('new title')
    })

    it('should saveStore', () => {
      const state = {
        todos: mockTodos
      }
      const localStorageSetSpy = jest.spyOn(Storage.prototype, 'setItem')

      store.mutations.saveStore(state)
      expect(localStorageSetSpy).toHaveBeenCalledWith('myTodos', JSON.stringify(state.todos))
    })

    it('should loadLocalStore', () => {
      const state = {
        todos: []
      }
      const stringTodos = JSON.stringify(mockTodos)

      store.mutations.loadLocalStore(state, stringTodos)
      expect(state.todos[0].date).toBeNull()
      expect(state.todos[1].date instanceof Date).toBeTruthy()
    })
  })

  describe('actions', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve()
    )
    const commitSpy = jest.fn()
    const dispatchSpy = jest.fn()

    beforeEach(() => {
      // reset the global fetch mock before each test
      fetch.mockReset()
      commitSpy.mockClear()
      dispatchSpy.mockClear()
    })

    it('should saveStore', async () => {
      const state = {
        todos: [].concat(mockTodos)
      }

      const mockFetchPayload = {
        body: JSON.stringify(mockTodos),
        method: 'PUT',
        mode: 'cors'
      }

      const error = new Error('failed')

      // mock fetch to succede first, then fail
      fetch
        .mockImplementationOnce(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.reject(error))

      // test a successful put
      await store.actions.saveStore({ commit: commitSpy, state })
      expect(commitSpy).toHaveBeenCalled()
      expect(fetch).toHaveBeenCalledWith('http://localhost:8079', mockFetchPayload)

      // test a failed put
      try {
        await store.actions.saveStore({ commit: commitSpy, state })
      } catch (e) {
        expect(e).toEqual(error)
      }
    })

    it('should loadStore', async () => {
      const state = {
        todos: [].concat(mockTodos)
      }

      const mockFetchPayload = {
        method: 'GET',
        mode: 'cors'
      }
      const localStorageGetSpy = jest.spyOn(Storage.prototype, 'getItem')
      // mock local storage to return an array once, and then null (nothing stored locally)
      localStorageGetSpy
        .mockImplementationOnce(() => {
          return JSON.stringify(mockTodos)
        })
        .mockImplementationOnce(() => {
          return null
        })
      fetch.mockImplementation(() => {
        return Promise.resolve({
          text: function () {
            return JSON.stringify(mockTodos)
          }
        })
      })

      await store.actions.loadStore({ commit: commitSpy, state })
      expect(localStorageGetSpy).toHaveBeenCalledWith('myTodos')
      expect(commitSpy).toHaveBeenNthCalledWith(1, 'loadLocalStore', JSON.stringify(mockTodos))
      expect(fetch).toHaveBeenCalledWith('http://localhost:8079', mockFetchPayload)
      expect(commitSpy).toHaveBeenNthCalledWith(2, 'loadLocalStore', JSON.stringify(mockTodos))
      expect(commitSpy).toHaveBeenLastCalledWith('saveStore')

      commitSpy.mockReset()

      await store.actions.loadStore({ commit: commitSpy, state })
      // when no data is loaded from localstorage, only 2 calls to commit are made
      expect(commitSpy).toHaveBeenCalledTimes(2)
    })

    it('should addTodo', () => {
      store.actions.addTodo({ commit: commitSpy, dispatch: dispatchSpy })
      expect(commitSpy).toHaveBeenCalledWith('addTodo')
      expect(dispatchSpy).toHaveBeenLastCalledWith('saveStore')
    })

    it('should removeTodo', () => {
      const payload = 'payload'
      store.actions.removeTodo({ commit: commitSpy, dispatch: dispatchSpy }, payload)
      expect(commitSpy).toHaveBeenCalledWith('removeTodo', payload)
      expect(dispatchSpy).toHaveBeenLastCalledWith('saveStore')
    })

    it('should updateTodo', () => {
      const payload = 'payload'
      store.actions.updateTodo({ commit: commitSpy, dispatch: dispatchSpy }, payload)
      expect(commitSpy).toHaveBeenCalledWith('updateTodo', payload)
      expect(dispatchSpy).toHaveBeenLastCalledWith('saveStore')
    })
  })
})
