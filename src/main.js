import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router/index.js";
import { createPinia } from "pinia";
import VCalendar from "v-calendar";
import "v-calendar/style.css";
import Swal from "sweetalert2";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./config/axios";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(VCalendar, {});
app.use(pinia);
app.use(router);

app.mount("#app");
