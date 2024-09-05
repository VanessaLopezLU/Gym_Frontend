/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

// Composables
import { createApp } from 'vue'
import store from './store'


const app = createApp(App)
app.use(VueAxios, axios)
app.use(store),
app.use(router);
registerPlugins(app)

app.mount('#app')
