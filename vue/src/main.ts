import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';

import App from './App.vue'
import router from './router'
import '@/assets/main.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(createPinia())

app.use(ToastService);
app.use(PrimeVue, {
    theme: {
        preset: Material,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
});

app.use(router)

app.mount('#app')

