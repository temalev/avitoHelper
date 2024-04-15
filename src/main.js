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
import Password from 'primevue/password';
import Card from 'primevue/card';
import Editor from 'primevue/editor';
import InputNumber from 'primevue/inputnumber';
import Panel from 'primevue/panel';
import Tree from 'primevue/tree';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import Avatar from 'primevue/avatar';
import OverlayPanel from 'primevue/overlaypanel';
import InlineMessage from 'primevue/inlinemessage';

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
app.component('Password', Password);
app.component('Card', Card);
app.component('Editor', Editor);
app.component('InputNumber', InputNumber);
app.component('Panel', Panel);
app.component('Tree', Tree);
app.component('Checkbox', Checkbox);
app.component('Dropdown', Dropdown);
app.component('Avatar', Avatar);
app.component('OverlayPanel', OverlayPanel);
app.component('InlineMessage', InlineMessage);

app.mount('#app')
