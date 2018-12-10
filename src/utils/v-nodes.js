export default {
  functional: true,

  props: {
    vnodes: {
      type: [Array, Object],
      required: true,
    },
  },

  render: (h, { props }) => {
    const nodes = props.vnodes
    if (Array.isArray(nodes)) {
      return nodes
    }
    return h(nodes)
  },
}
