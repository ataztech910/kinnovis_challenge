import Vue from "vue";
import Vuex from "vuex";
import { inventory } from "@/store/modules/Inventory";
import { tickets } from "@/store/modules/Tickets";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    inventory,
    tickets,
  },
});

export default store;
