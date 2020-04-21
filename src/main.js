import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import modalMixin from './mixins/modal_confirmation_mixin'
import simpleVAlidationMixin from './mixins/simple_validation_mixin'
import StoreStateMixin from './mixins/store_state_mixin'

Vue.config.productionTip = false

Vue.mixin(modalMixin)
Vue.mixin(simpleVAlidationMixin)
Vue.mixin(StoreStateMixin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
