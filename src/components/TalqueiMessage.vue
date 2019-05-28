<template>
  <Transition>
    <div
      v-if="isEnabled"
      :class="isUser ? 'talquei-message--user' : 'talquei-message--app'"
      class="talquei-message"
    >
      <div class="talquei-message__avatar">
        <div v-if="!isUser">
          <VNodes
            v-if="$_avatarSlot"
            :vnodes="$_avatarSlot"
          />
          <span v-else>
            🤖
          </span>
        </div>
      </div>

      <div class="talquei-message__text">
        <Transition
          name="talquei--fade"
          mode="out-in"
          :duration="isUser ? 50 : 600"
        >
          <span
            v-if="isPending"
            key="pending"
            class="talquei--blink talquei-message__text__pending"
          >
            …
          </span>
          <span
            v-else
            key="text"
          >
            {{ formattedText }}
          </span>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script>
import VNodes from '../utils/v-nodes'
import InputForm from '../utils/input-form'

export default {
  name: 'TalqueiMessage',

  components: {
    VNodes,
  },

  inject: {
    $_next: 'next',
    $_showInput: 'showInput',
    $_avatarSlot: 'avatarSlot',
    $_submitSlot: 'submitSlot',
  },

  model: {
    prop: 'text',
    event: 'input',
  },

  props: {
    input: {
      type: Object,
      required: false,
      default: undefined,
    },
    isUser: {
      type: Boolean,
      required: false,
      default: false,
    },
    text: {
      type: String,
      required: false,
      default: undefined,
    },
    template: {
      type: String,
      required: false,
      default: '{text}',
    },
  },

  data: () => ({
    isEnabled: false,
    isPending: true,
  }),

  computed: {
    hasInput () {
      return !!this.$slots.default || !!this.input
    },

    formattedText: {
      cache: false,
      get () {
        return this.template.replace('{text}', this.text)
      },
    },
  },

  watch: {
    isEnabled (val) {
      if (val) {
        this.renderInput()

        if (!this.isUser) {
          this.showText()
        }
      }
    },
    text: {
      handler (val) {
        if (val && this.isEnabled) {
          this.showText()
        }
      },
      immediate: true,
    },
    isPending (val) {
      if (!val && this.isEnabled && !this.hasInput) {
        setTimeout(() => this.$_next(), 1500)
      }
    },
  },

  methods: {
    renderInput () {
      setTimeout(() => {
        if (this.$slots.default) {
          this.$_showInput(this.$slots.default)
        } else if (this.input) {
          const inputComponent = InputForm(this, this.input, this.$options.model)
          this.$_showInput(inputComponent)
        }
      }, 500)
    },

    showText () {
      if (this.isUser) {
        this.isPending = false
      } else {
        setTimeout(() => this.isPending = false, 500)
      }
    },

    run () {
      this.isEnabled = true
    },
  },
}
</script>
