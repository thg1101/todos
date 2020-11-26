// we don't need linting here, function is minimized on purpose, community sourced from:
// https://gist.github.com/jed/982883

// eslint-disable-next-line
const uuid = function b(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)};
const localStorageKey = 'myTodos'
const serverURL = 'http://localhost:8079'

export default {
  state: {
    filter: '',
    todos: []
  },
  getters: {
    todos (state) {
      if (state.filter === '') {
        return state.todos
      } else {
        return state.todos.filter(item => {
          return ~item.title.indexOf(state.filter)
        })
      }
    }
  },
  mutations: {
    setFilter (state, value) {
      state.filter = value
    },

    // todo CRUD
    addTodo (state) {
      const newTodo = {
        title: '',
        description: '',
        date: null,
        uid: uuid()
      }

      state.todos.push(newTodo)
    },
    removeTodo (state, id) {
      const foundIndex = state.todos.findIndex(todo => todo.uid === id)
      if (foundIndex >= 0) {
        state.todos.splice(foundIndex, 1)
      }
    },
    updateTodo (state, payload) {
      const foundIndex = state.todos.findIndex(todo => todo.uid === payload.uid)

      if (foundIndex >= 0) {
        state.todos.splice(foundIndex, 1, payload)
      }
    },

    // store load/save
    saveStore (state) {
      const serial = JSON.stringify(state.todos)
      localStorage.setItem(localStorageKey, serial)
    },
    loadLocalStore (state, todos) {
      todos = JSON.parse(todos)
      todos.forEach(item => {
        item.date = item.date === null ? null : new Date(item.date)
      })

      state.todos = todos
    }
  },
  actions: {
    // dump the entire todo list into localstorage and the server if started
    saveStore ({ commit, state }) {
      commit('saveStore')

      return fetch(serverURL, {
        method: 'PUT',
        mode: 'cors',
        // no sense in adding Content-Type: application/json since the server will be writing blind
        body: JSON.stringify(state.todos)
      })
        .then(() => {
          console.log('Data written to file')
        })
        .catch(err => {
          console.error(err)
        })
    },
    // load the todo list from localstorage, and overwrite with information from the server, when it
    // becomes available
    loadStore ({ commit }) {
      const todos = localStorage.getItem(localStorageKey)

      if (todos) commit('loadLocalStore', todos)

      return fetch(serverURL, {
        method: 'GET',
        mode: 'cors'
      })
        // interpret the response stream as text so we use the same parser as from localstorage
        .then(response => response.text())
        .then(data => {
          // update the in-memory store
          commit('loadLocalStore', data)
          // save to localStorage too
          commit('saveStore')
        })
        .catch(() => {
          // fail silently if the server isn't up
        })
    },

    // todo CRUD
    addTodo ({ commit, dispatch }) {
      commit('addTodo')
      dispatch('saveStore')
    },
    removeTodo ({ commit, dispatch }, id) {
      commit('removeTodo', id)
      dispatch('saveStore')
    },
    updateTodo ({ commit, dispatch }, payload) {
      commit('updateTodo', payload)
      dispatch('saveStore')
    }
  }
}
