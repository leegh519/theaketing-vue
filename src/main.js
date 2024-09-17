import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router/index.js";
import axios from "axios";
import { createPinia } from "pinia";
import VCalendar from "v-calendar";
import "v-calendar/style.css";

const app = createApp(App);
const pinia = createPinia();
const apiUrl = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;
app.config.globalProperties.$axios = axios;

app.use(VCalendar, {});
app.use(pinia);
app.use(router);
app.mount("#app");
