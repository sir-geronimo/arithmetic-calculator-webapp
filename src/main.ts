import '@/assets/main.css'
import { createApp, type ComponentPublicInstance } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueQueryPlugin)

app.config.errorHandler = (err: any) => {
  console.error(err)

  if (err.code === 401 && router.currentRoute.value.name !== 'login') {
    router.push({ name: 'login' })
  }
}

app.mount('#app')
