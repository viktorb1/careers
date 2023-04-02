import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from '@/router'

import '@/index.css'

library.add(faSearch)
library.add(faAngleDown)
library.add(faAngleUp)

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
