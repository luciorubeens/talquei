<br />
<p align="center">
  <img src="./.github/banner.png" />
</p>

<p align="center">
  <img src="https://badgen.net/npm/v/talquei" />
  <img src="https://badgen.net/badge/license/MIT/blue" />
</p>

<p align="center">
  <img src="./.github/example.gif" width="35%"/>
</p>

## 🧐 Why?

Forget the boring and non-intuitive forms. With talquei you can quickly build fantastic forms as in the image above.

### [Demo](https://luciorubeens.github.io/talquei/)

## 💻 Install

Install using your package manager:

```bash
$ yarn add talquei
```

Add into your app:

```js
import Vue from 'vue'
import Talquei from 'talquei'

// import the styles 
import 'talquei/dist/talquei.min.css'

Vue.use(Talquei)
```

Or import into your component:

```js
import { Talquei, TalqueiMessage } from 'talquei'

export default {
  components: {
    Talquei,
    TalqueiMessage
  }
}
```

## ⚙️ Usage

The `Talquei` component should wrapper any `TalqueiMessage`:

```vue
<template>
  <Talquei>
    <TalqueiMessage text="Hi! My name is Talquei!" />
    <TalqueiMessage text="I'm a plugin to help you." />
  </Talquei>
</template>
```

### Request user input

You can request a user entry by prop or slot. The prop will basically inject your tag into a form and fill the entry in the `v-model`.

```vue
<template>
  <Talquei>
    <TalqueiMessage
      v-model="name"
      text="What's your name?"
      :input="{ type: 'text' }"
    />
  </Talquei>
</template>

<script>
export default {
  data: () => ({
    name: ''
  })
}
</script>
```

### Predefined answers

If you need predefined answers (such as the `select` or `radio` tag) you can set `input.type = 'select'` and pass your object in the `items` field:

```vue
<template>
  <Talquei>
    <TalqueiMessage
      v-model="name"
      text="Which front-end framework do you prefer?"
      :input="{ type: 'select', items: frameworks }"
    />
  </Talquei>
</template>

<script>
export default {
  data: () => ({
    frameworks: {
      vue: 'Vue.js',
      angular: 'AngularJS',
      ember: 'Ember.js'
    }
  })
}
</script>
```

### Conditional messages

Use when you want the `v-if` attribute to display conditional messages:

```vue
<template>
  <Talquei>
    <TalqueiMessage
      v-model="answer"
      text="Which front-end framework do you prefer?"
      :input="{ type: 'select', items: frameworks }"
    />

    <TalqueiMessage
      v-if="answer === 'vue'"
      v-model="plugin"
      text="What plugins do you usually use in your projects?"
      :input="{ type: 'text', placeholder: 'talquei' }"
    />
  </Talquei>
</template>
</script>
```

### Using slots

If you need to build more complex input (like validations, custom components) you can use slots. After the completion remeber to call the `next()` method from the `Talquei` component.

```vue
<template>
  <Talquei ref="talquei">
    <TalqueiMessage :text="Hello">
      <form @submit.stop="onSubmit">
        <input ref="input" type="text">
        <button>Ok</button>
      </form>
    </TalqueiMessage>
  </Talquei>
</template>

<script>
export default {
  methods: {
    onSubmit () {
      this.name = this.$refs.input.value
      this.$refs.talquei.next()
    }
  }
}
</script>
```

## 🔎   API

Coming soon

## 🕺 Contribute

If you want to contribute to this project, please see our [Contributing Guide](/.github/CONTRIBUTING.md) !
