<template>
  <article :class="[{ done }, 'todo shadow-sm']">
    <div class="todo__header">
      <checkbox
        size="20px"
        :done="done"
        @click="hndChange(!done, 'done')"
        @keydown.space="hndChange(!done, 'done')"
      />

      <input
        type="text"
        ref="titleEditField"
        name="edit-title"
        autocomplete="off"
        placeholder="Add a title..."
        :value="title"
        :disabled="done"
        @blur="hndChange(arguments[0], 'title')"
        @keydown.enter="hndChange(arguments[0], 'title')"
        @keydown.esc="arguments[0].target.value = title"
      >

      <button class="todo__delete" @click="removeTodo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24" width="24"
          viewBox="0 0 24 24"
        >
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"/>
        </svg>
      </button>
    </div>

    <b-form-datepicker
      hide-header
      :dark="darkMode"
      label-no-date-selected=""
      size="sm"
      value-as-date
      :min="minDate"
      :value="date"
      :disabled="done"
      @input="hndChange(arguments[0], 'date')"
    />

    <textarea
      v-text="description"
      placeholder="Add a description..."
      :disabled="done"
      @blur="hndChange(arguments[0], 'description')"
    ></textarea>
  </article>
</template>

<script>
import { BFormDatepicker } from 'bootstrap-vue'
import Checkbox from '@/components/Checkbox'

export default {
  name: 'Todo',
  props: {
    done: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    date: Date,
    uid: {
      type: String,
      required: true
    }
  },

  components: {
    Checkbox,
    BFormDatepicker
  },

  beforeMount () {
    this.minDate = new Date()
  },

  computed: {
    darkMode () {
      return this.$store.getters['Settings/darkMode']
    }
  },

  data: function () {
    return {
      minDate: null
    }
  },

  methods: {
    removeTodo () {
      this.$store.dispatch('removeTodo', this.uid)
    },
    hndChange (ev, key) {
      // otherwise save the new data to the respective key
      const savePayload = {
        done: this.done,
        title: this.title,
        description: this.description,
        date: this.date,
        uid: this.uid
      }

      const newValue = ['date', 'done'].includes(key) ? ev : ev.target.value
      savePayload[key] = newValue
      this.$store.dispatch('updateTodo', savePayload)
    }
  }

}
</script>

<style lang="scss">
  .todo {
    margin: 10px;
    background-color: #f0f0f0;
    border-radius: 8px;
    padding: 4px;
    transition: background-color 0.2s;

    &.done {
      opacity: 0.4;
    }

    input {
      flex: 1;
    }

    textarea {
      resize: none;
      width: 100%;
      margin-top: 4px;
      padding: 4px 8px;
    }

    input,
    textarea {
      border: none;
      background-color: transparent;
      border-radius: $input-radius;
      transition: background-color 0.2s;

      &:focus,
      &:active {
        outline: none;
        background-color: #d6d6d6;
      }
    }

    a, button {
      &:focus path,
      &:active path {
        fill: $primary;
      }
    }

    .checkbox {
      margin: 0 6px;
    }
  }

  .b-form-btn-label-control.form-control[aria-disabled="true"] {
    background-color: initial;
  }

  .todo__header {
    display: flex;
    flex-direction: row;
    align-items: center;

    button,
    a {
      outline: none;
    }
  }

  .todo__delete {
    float: right;
    background-color: inherit;
    border: none;
    width: 30px;
    height: 30px;
    padding: 0;
  }

  .b-form-btn-label-control.form-control {
    background-color: inherit;
    border: none;
  }

  @media screen and (min-width: $mainbp) {
    .todo {
      width: 300px;
    }
  }

  // dark theme
  .dark {
    .todo {
      background-color: #313533;

      svg path {
        fill: $nav-fill;
      }

      input,
      textarea {
        &:focus,
        &:active {
          background-color: #404542;
        }
      }
    }

    input,
    textarea,
    .b-form-datepicker > label {
      color: $nav-fill;
    }
  }
</style>
