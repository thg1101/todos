<template>
  <div id="app">
    <nav class="nav">
      <button class="addtodo" @click="addTodo">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"/>
        </svg>
      </button>

      <div class="search-group">
        <input type="search" v-model="filter">
        <svg xmlns="http://www.w3.org/2000/svg"
          height="24" width="24"
          viewBox="0 0 24 24"
        >
          <path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>
      <bulb />
    </nav>
    <router-view />
  </div>
</template>

<script>
import Bulb from '@/components/Bulb'

export default {
  name: 'Todos',

  components: {
    Bulb
  },

  computed: {
    filter: {
      get () {
        return this.$store.getters.filter
      },
      set (newVal) {
        this.$store.commit('setFilter', newVal)
      }
    }
  },

  methods: {
    addTodo () {
      this.$store.dispatch('addTodo')
    }
  }
}
</script>

<style lang="scss">
  // This is just an example on how one can import less of what's not necessary from a framework
  // such as bootstrap

  // @import "bootstrap/scss/bootstrap.scss";
  @import "bootstrap/scss/_functions";
  @import "bootstrap/scss/_variables";
  @import "bootstrap/scss/_mixins";
  @import "bootstrap/scss/_root";
  @import "bootstrap/scss/_reboot";
  @import "bootstrap/scss/_grid";
  @import "bootstrap/scss/_forms";
  @import "bootstrap/scss/_buttons";
  @import "bootstrap/scss/_dropdown";
  @import "bootstrap/scss/_utilities";
  @import 'bootstrap-vue/src/index.scss';

  body {
    transition: background-color 0.2s;
  }

  .nav {
    height: 64px;
    background-color: #26a69a;
    display: flex;
    align-items: center;
    padding-left: 8px;
    display: flex;
    align-items: center;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .addtodo {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 4px;
    background-color: inherit;
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      fill: $nav-fill;
    }

    &:focus,
    &:active {
      outline: none;

      background-color: $nav-fill;
      svg {
        fill: $primary;
      }
    }
  }

  .search-group {
    margin: 0 12px;
    position: relative;
    flex: 1;

    svg {
      fill: #fafafa;
      transition: fill 0.2s;
      position: absolute;
      left: 5px;
      top: 5px;
    }

    input {
      padding: 4px 8px;
      border-radius: $input-radius;
      background-color: darken($primary, 10%);
      border: none;
      color: #fafafa;
      transition: color 0.2s, background-color 0.2s;
      text-indent: 26px;
      width: 100%;

      &:focus,
      &:active {
        background-color: #fafafa;
        outline: none;
        color: $ink;

        & + svg {
          fill: $ink;
        }
      }
    }
  }
  @media screen and (min-width: $mainbp) {
    .search-group > input {
      max-width: 250px;
    }
  }

  .dark {
    background-color: #202221;
  }
</style>
