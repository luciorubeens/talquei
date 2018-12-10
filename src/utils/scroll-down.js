/**
* Based from theomessin/vue-chat-scroll with some changes
* MIT - Theodore Messinezis <theo@theomessin.com>
*/

const scrollToBottom = (el, smooth) => {
  if (typeof el.scroll === "function") {
    el.scroll({
      top: el.scrollHeight,
      behavior: smooth ? 'smooth' : 'instant'
    })
  } else {
    el.scrollTop = el.scrollHeight
  }
}

export default {
  bind: (el, binding) => {
    let scrolled = false

    if (el.addEventListener) {
      el.addEventListener('scroll', () => {
        scrolled = el.scrollTop + el.clientHeight + 1 < el.scrollHeight
      })
    }

    (new MutationObserver(e => {
      let config = binding.value || {}
      let pause = config.always === false && scrolled
      if (pause || e[e.length - 1].addedNodes.length != 1) return
      scrollToBottom(el, config.smooth)
    })).observe(el, { childList: true, subtree: true })
  },

  inserted: scrollToBottom
}

export {
  scrollToBottom
}
