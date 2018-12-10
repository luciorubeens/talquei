export default (ctx, options, model) => {
  if (!['text', 'select'].includes(options.type)) {
    throw new Error('[talquei] Invalid input type')
  }

  if (options.type === 'select') {
    if (!options.items) {
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
      'focus': {
        inserted: (el) => el.focus()
      }
    },

    render (h) {
      let inputEl

      const submitButton = cb => h('button', {
        class: 'talquei-form__submit',
        attrs: {
          type: 'submit'
        },
        on: {
          click: () => emit(cb())
        }
      }, 'Ok')

      if (options.type === 'text') {
        inputEl = [
          h('input', {
            class: ['talquei-form__text'],
            attrs: options,
            ref: 'text',
            directives: [{ name: 'focus' }]
          }),
          submitButton(() => this.$refs.text.value)
        ]
      } else if (options.type === 'select') {
        const itemsKeys = Object.keys(options.items)
        inputEl = [h('div', {
          class: ['talquei-form__select']
        },
          itemsKeys.map((key, index) =>
            h('button', {
              attrs: {
                type: 'submit'
              },
              class: 'talquei-form__select__item',
              on: {
                click: () => emit(options.items[key]),
              },
              directives: [index === 0 ? { name: 'focus'} : {}] // focus first item
            }, options.items[key])
          )
        )]
      }

      return h('form', {
        class: 'talquei-form',
        on: {
          submit: (evt) => {
            evt.preventDefault();
          }
        }
      }, inputEl)
    }
  }
}
