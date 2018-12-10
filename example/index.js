import App from './App'
import Vue from 'vue'
import VTalquei from '../src'

Vue.use(VTalquei)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
})
