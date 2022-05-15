import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { pinia } from "./store";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";
import "boxicons";

Vue.use(Vuesax, {});

Vue.config.productionTip = false;

new Vue({
  router,
  pinia,

  // pinia,
  render: (h) => h(App),
}).$mount("#app");
