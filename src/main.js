import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Icon from './directives/icon'
import VeeValidatePlugin from './includes/validation'
import { auth } from './includes/firebase'

import './assets/css/base.css'
import './assets/css/main.css'
let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidatePlugin)
    app.directive('icon',Icon)

    app.mount('#app')
  }
})
