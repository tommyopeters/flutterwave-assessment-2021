import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Flutterwave from "vue-flutterwave";

Vue.use(Flutterwave, { publicKey: "YOUR CONNECT PUBLIC KEY" });

Vue.config.productionTip = false;

// focus-on-input directive
Vue.directive("focus", {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus();
  },
});

router.beforeEach(async (to, from, next) => {
  // Redirect to only working page everytime
  if (to.path != "/send") {
    next("/send");
  }
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
