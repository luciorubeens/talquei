import Talquei from './components/Talquei.vue'
import TalqueiMessage from './components/TalqueiMessage.vue'
import './styles/style.css'

function install (Vue) {
  Vue.component(Talquei.name, Talquei)
  Vue.component(TalqueiMessage.name, TalqueiMessage)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default install
export {
  Talquei,
  TalqueiMessage
}
