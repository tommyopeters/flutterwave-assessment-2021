import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
      public_key: "FLWPUBK_TEST-113196e30dd4b26f1c7e04039c0cd080-X",
      secret_key: "FLWSECK_TEST-09de4259bb5d884883c68c0ae9a450fb-X",
      encryption: "FLWSECK_TESTe177bf3cf19b",
    },
  },

  mutations: {
    SET_CURRENCIES: function (state, currencies) {
      state.currencies = currencies;
    },
  },
  actions: {
    fetchCurrenies: async function ({ commit, state }, baseCurrency) {
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
        })
        .catch((err) => console.error(err));
    },
  },
  modules: {},
});
