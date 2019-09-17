/* eslint no-param-reassign:'off' */

// no-param-reassign is off because eslint flags reassigning a prop of state
// in the mutations e.g. showHomeViewWelcome = payload would get flagged and the
// point of the mutation is to change things


import Vue from 'vue';
import Vuex from 'vuex';

import initialData from './lib/initialData';
import roundToPrecision from './lib/roundToPrecision';
import securityFactory from './lib/securityFactory';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showHomeViewWelcome: true,
    portfolio: [...initialData],
  },
  mutations: {
    addToPortfolio: function addToPortfolio(state, payload) {
      if (typeof payload !== 'object') {
        throw new Error('Non-object received in portfolio mutation.');
      }

      Object
        .keys(securityFactory())
        .forEach((el) => {
          if (!Object.keys(payload).includes(el)) {
            throw new Error(`Missing expected property: ${el}`);
          }
        });

      state.portfolio.push(payload);
    },
    clearPortfolio: function clearPortfolio(state) {
      state.portfolio = [];
    },
    showHomeViewWelcome: function showHomeViewWelcome(state, payload) {
      if (typeof payload !== 'boolean') {
        throw new Error('Non-boolean received in showHomeViewWelcome mutation.');
      }

      state.showHomeViewWelcome = payload;
    },
    trimPortfolio: function trimPortfolio(state, payload) {
      state.portfolio.splice(
        state.portfolio.findIndex((el) => el.symbol === payload),
        1,
      );
    },
    updatePriceValuePercentage: function updatePriceValuePercentage(state, payload) {
      const standardInput = Array.isArray(payload) ? [...payload] : [payload];
      let totalValue = 0;

      // update price and value
      standardInput
        .filter((el) => el.error === false)
        .forEach((el) => {
          const relevantSecurity = state.portfolio.find((innerEl) => el.symbol === innerEl.symbol);

          relevantSecurity.lastRefreshed = el.lastRefreshed;
          relevantSecurity.price = el.price;
          relevantSecurity.value = Math.round(relevantSecurity.price * relevantSecurity.numShares);
        });

      // recalculate percentages
      totalValue = state.portfolio
        .map((el) => el.value)
        .reduce((sum, current) => sum + current, 0);

      if (totalValue > 0) {
        state.portfolio
          .forEach((el) => {
            el.pctOfPortfolio = roundToPrecision((el.value * 100) / totalValue, 0.01)
              .toFixed(2);
          });
      }
    },
  },
  strict: process.env.NODE_ENV !== 'production',
});
