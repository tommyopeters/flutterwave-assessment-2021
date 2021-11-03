import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// focus-on-input directive
Vue.directive("focus", {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus();
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
