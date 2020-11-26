<template>
  <main class="todolist">
    <todo v-for="t in todos" :key="t.uid" v-bind="t" />
  </main>
</template>

<script>
import Todo from '@/components/Todo'

export default {
  name: 'Home',

  components: {
    Todo
  },

  beforeMount () {
    this.$store.dispatch('loadStore')
  },

  computed: {
    todos () {
      return this.$store.getters.todos
    }
  }
}
</script>

<style lang="scss">
  @media screen and (min-width: $mainbp) {
    .todolist {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
</style>
