import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    currencies: [
      {
        code: "ngn",
        html: "&#8358;",
        rate: 0,
      },
      {
        code: "kes",
        html: "KSH",
        rate: 0,
      },
      {
        code: "ghs",
        html: "&#8373;",
        rate: 0,
      },
      {
        code: "gbp",
        html: "&#163;",
        rate: 0,
      },
      {
        code: "usd",
        html: "&#36;",
        rate: 0,
      },
    ],
    flutterwave: {
      public_key: "FLWPUBK_TEST-1f01ba459ef3990ca28099908238e205-X",
      secret_key: "FLWSECK_TEST-5d5bbe76832316acbb247f088b59b569-X",
      encryption: "FLWSECK_TEST5204b2a57538",
    },
  },

  mutations: {
    SET_CURRENCIES: function (state, currencies) {
      state.currencies = currencies;
    },
    SET_LOADING: function (state, bool) {
      state.loading = bool;
    },
  },
  actions: {
    fetchCurrenies: async function ({ commit, state }, baseCurrency) {
      commit("SET_LOADING", true);
      const options = {
        method: "GET",
        headers: { Accept: "application/json" },
      };
      // let rates = {};
      // from=USD&to=NGN%2CKES%2CGHS

      let query = "from=" + baseCurrency.code.toUpperCase() + "&to=";

      state.currencies.forEach((currency, index) => {
        if (index == 0) {
          query += currency.code.toUpperCase();
        } else {
          query += "%2C" + currency.code.toUpperCase();
        }
      });

      fetch(
        "https://api.fastforex.io/fetch-multi?" +
          query +
          "&api_key=5a4943d641-859885868e-r1ze8y",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          let currencies = state.currencies;
          state.currencies.forEach((currency) => {
            currency.rate = response.results[currency.code.toUpperCase()];
          });
          console.log(currencies);
          commit("SET_CURRENCIES", currencies);
          setTimeout(() => {
            commit("SET_LOADING", false);
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            commit("SET_LOADING", false);
          }, 1000);
        });
    },
  },
  modules: {},
});
