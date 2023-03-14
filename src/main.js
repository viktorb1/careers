import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'

import '@/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
library.add(faSearch)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
