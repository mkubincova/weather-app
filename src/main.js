import './assets/tailwind.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.config.globalProperties.sunIcons = ['01d', '02d'];
app.config.globalProperties.cloudIcons = ['03d', '04d', '50d'];
app.config.globalProperties.rainIcons = ['09d', '10d', '11d', '13d'];

app.mount('#app');
