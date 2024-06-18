import './assets/main.css'
import './assets/common.scss'
import './assets/primary-ui.scss'
import 'virtual:uno.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'highlight.js/styles/monokai.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import { vLoading } from './directives/loading/v-loading';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice';

import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

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
import FileUpload from 'primevue/fileupload';
import Textarea from 'primevue/textarea';
import RadioButton from 'primevue/radiobutton';
import TheTabs from '@/ui/TheTabs.vue';
import Calendar from '@/ui/Calendar.vue';
import Slider from 'primevue/slider';
import Markdown from 'vue3-markdown-it';
import Message from 'primevue/message';
import Toast from 'primevue/toast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';  

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.directive('loading', vLoading);

app.use(PrimeVue);
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(VueChartkick)
app.use(Markdown)
app.use(ToastService);
app.use(VCalendar, {})

app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('TheTabs', TheTabs);
app.component('Calendar', Calendar);
app.component('Toast', Toast);
app.component('Message', Message);
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
app.component('FileUpload', FileUpload);
app.component('Textarea', Textarea);
app.component('RadioButton', RadioButton);
app.component('Slider', Slider);
app.component('Markdown', Markdown);


app.mount('#app')

export default app
