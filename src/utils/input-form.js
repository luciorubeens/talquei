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
    ctx.next()
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

      const submitButton = cb => h('button', {
        class: 'talquei-form__submit',
        attrs: {
          type: 'submit',
        },
        on: {
          click: () => emit(cb()),
        },
      }, 'Ok')

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
              type: 'submit',
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
          },
        },
      }, inputEl)
    },
  }
}
