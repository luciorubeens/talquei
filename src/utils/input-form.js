export default (ctx, options, model) => {
  if (!['text', 'select'].includes(options.tag)) {
    throw new Error('[talquei] Invalid input type')
  }

  if (options.tag === 'select') {
    if (!options.options) {
      throw new Error('[talquei] You must pass some items to select')
    }
  }

  const emit = value => {
    ctx.$_next()
    ctx.$emit(model.event, value)
  }

  return {
    name: 'InputForm',
    directives: {
      focus: {
        inserted: (el) => el.focus(),
      },
    },

    render (h) {
      let inputEl

      const sendIcon = h('svg', {
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 512 512',
          width: '16px',
          height: '16px',
          fill: 'currentColor',
        },
      }, [h('path', {
        attrs: {
          d: 'M277.375 427V167.296l119.702 119.702L427 256 256 85 85 256l29.924 29.922 119.701-118.626V427h42.75z',
        },
      })])

      const submitButton = cb => h('button', {
        class: 'talquei-form__submit',
        attrs: {
          type: 'submit',
        },
        on: {
          click: () => emit(cb()),
        },
      }, ctx.$_submitSlot ? ctx.$_submitSlot : [sendIcon])

      if (options.tag === 'text') {
        const { tag, ...attributes } = options

        inputEl = [
          h('input', {
            class: ['talquei-form__text'],
            attrs: {
              type: 'text',
              ...attributes,
            },
            ref: 'text',
            directives: [{ name: 'focus' }],
          }),
          submitButton(() => this.$refs.text.value),
        ]
      } else if (options.tag === 'select') {
        const itemsKeys = Object.keys(options.options)
        inputEl = [h('div', {
          class: ['talquei-form__select'],
        },
        itemsKeys.map((key, index) =>
          h('button', {
            attrs: {
              type: 'button',
            },
            class: 'talquei-form__select__item',
            on: {
              click: () => emit(options.options[key]),
            },
            directives: [index === 0 ? { name: 'focus' } : {}], // focus first item
          }, options.options[key])
        )
        )]
      }

      return h('form', {
        class: 'talquei-form',
        on: {
          submit: (evt) => {
            evt.preventDefault()
            evt.stopPropagation()
          },
        },
      }, inputEl)
    },
  }
}
