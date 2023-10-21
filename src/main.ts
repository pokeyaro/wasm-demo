import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import { InitWasm } from '../wasm';

InitWasm().then(() => {
    const app = createApp(App);
    app.use(ArcoVue);
    app.mount('#app');
})
