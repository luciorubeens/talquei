
<template>
  <section class="talquei">
    <div
      ref="terminal"
      class="talquei-terminal"
      v-scroll-down
    >
      <slot />
    </div>

    <div
      v-if="inputNode"
      class="talquei-inputbar"
    >
      <VNodes :vnodes="inputNode" />
    </div>
  </section>
</template>

<script>
import TalqueiMessage from './TalqueiMessage.vue'
import VNodes from '../utils/v-nodes'
import scrollDown, { scrollToBottom } from '../utils/scroll-down'

export default {
  name: 'Talquei',

  directives: {
    'scroll-down': scrollDown
  },

  provide () {
    return {
      next: this.next,
      showInput: this.showInput
    }
  },

  props: {
    autoRun: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  components: {
    VNodes
  },

  data: () => ({
    step: null,
    inputNode: null,
    messages: []
  }),

  computed: {
    totalSteps () {
      return this.messages.length
    }
  },

  watch: {
    step (val) {
      this.inputNode = null
      this.runMessage(this.messages[val])
    }
  },

  mounted () {
    if (this.autoRun) {
      this.init()
    }
  },

  updated () {
    scrollToBottom(this.$refs.terminal)
  },

  methods: {
    init () {
      this.collectMessages()
      this.step = 0
    },

    next () {
      this.inputNode = null
      this.collectMessages()
      const nextStep = this.step + 1
      if (nextStep < this.totalSteps) {
        this.step = nextStep
      } else {
        this.emitComplete()
      }
    },

    emitComplete () {
      this.$emit('complete')
    },

    showInput (vnode) {
      this.inputNode = vnode
    },

    collectMessages () {
      this.messages = this.$children.filter(node => node.$options.name === TalqueiMessage.name)
    },

    runMessage (message) {
      message.run()
    }
  }
}
</script>
