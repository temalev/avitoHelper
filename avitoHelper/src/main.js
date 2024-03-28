import './assets/main.css'
import './assets/common.scss'
import 'virtual:uno.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(PrimeVue);
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Dialog', Dialog);

app.mount('#app')
