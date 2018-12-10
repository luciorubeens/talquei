<template>
  <div
    v-if="!isPending"
    :class="isUser ? 'talquei-message--user' : 'talquei-message--app'"
    class="talquei-message"
  >
    <div class="talquei-message__avatar">
      <span v-if="!isUser">🤖</span>
    </div>

    <div class="talquei-message__text">
      <span v-if="isUser">
        {{ text }}
      </span>

      <VueTypedJs
        v-else
        :show-cursor="false"
        :strings="[text]"
        :loop="false"
        @onComplete="onCompleteTyping"
      >
        <span class="typing" />
      </VueTypedJS>
    </div>
  </div>
</template>

<script>
import VueTypedJs from 'vue-typed-js/src/components/VueTypedJs.vue'
import InputForm from '../utils/input-form'

export default {
  name: 'TalqueiMessage',

  inject: ['next', 'showInput'],

  model: {
    prop: 'value',
    event: 'input'
  },

  components: {
    VueTypedJs
  },

  props: {
    isUser: {
      type: Boolean,
      required: false,
      default: false
    },
    text: {
      type: String,
      required: true,
      default: ''
    },
    input: {
      type: Object,
      required: false,
      default: null
    },
    value: {
      type: String,
      required: false,
      default: null
    }
  },

  data: () => ({
    isPending: true
  }),

  watch: {
    isPending (val) {
      if (!val && this.isUser) {
        setTimeout(() => this.next(), 1000)
      }
    }
  },

  methods: {
    onCompleteTyping () {
      if (this.$slots.default) {
        this.showInput(this.$slots.default)
      } else if (!!this.input) {
        const inputComponent = InputForm(this, this.input, this.$options.model)
        this.showInput(inputComponent)
      } else {
        this.next()
      }
    },

    run () {
      this.isPending = false
    }
  }
}
</script>
