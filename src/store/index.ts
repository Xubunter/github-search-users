import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import VueCompositionAPI from "@vue/composition-api";

Vue.use(PiniaVuePlugin);
Vue.use(VueCompositionAPI);

export const pinia = createPinia();
