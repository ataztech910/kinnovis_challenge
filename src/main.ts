import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Amplify from "aws-amplify";
import awsmobile from "../aws/src/aws-exports.js";

Amplify.configure(awsmobile);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
