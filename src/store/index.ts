import Vue from "vue";
import Vuex from "vuex";
import { inventory } from "@/store/modules/Inventory";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    inventory,
  },
});

export default store;
