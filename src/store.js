/* eslint no-param-reassign:'off' */

// no-param-reassign is off because eslint flags reassigning a prop of state
// in the mutations e.g. showHomeViewWelcome = payload would get flagged and the
// point of the mutation is to change things


import Vue from 'vue';
import Vuex from 'vuex';
import * as isValid from './lib/validations/store.validations';

import initialData from './lib/initialData';
import roundToPrecision from './lib/roundToPrecision';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showHomeViewWelcome: true,
    portfolio: [...initialData],
  },
  mutations: {
    addToPortfolio: function addToPortfolio(state, payload) {
      if (!(isValid.addToPortfolio.state(state))) {
        throw new Error('state is not valid');
      }

      if (!(isValid.addToPortfolio.payload(payload))) {
        throw new Error('payload is not valid');
      }

      const existingRow = state.portfolio
        .find((el) => el.symbol === payload.symbol);

      if (existingRow !== undefined) {
        ['friendlyName', 'numShares', 'monitored', 'monitoredLowerBound', 'monitoredUpperBound']
          // here we want to reassign the value
          // eslint-disable-next-line no-return-assign
          .forEach((el) => existingRow[el] = payload[el]);


        Object.keys(payload.assetClasses)
          // here we want to reassign the value
          // eslint-disable-next-line no-return-assign
          .forEach((el) => existingRow.assetClasses[el] = payload.assetClasses[el]);
      } else {
        state.portfolio.push(payload);
      }
    },
    clearPortfolio: function clearPortfolio(state) {
      if (!(isValid.clearPortfolio.state(state))) {
        throw new Error('state is not valid');
      }

      state.portfolio = [];
    },
    showHomeViewWelcome: function showHomeViewWelcome(state, payload) {
      if (!(isValid.showHomeViewWelcome.state(state))) {
        throw new Error('state is not valid');
      }

      if (!(isValid.showHomeViewWelcome.payload(payload))) {
        throw new Error('payload is not valid');
      }

      state.showHomeViewWelcome = payload;
    },
    trimPortfolio: function trimPortfolio(state, payload) {
      if (!(isValid.trimPortfolio.state(state))) {
        throw new Error('state is not valid');
      }

      if (!(isValid.trimPortfolio.payload(payload))) {
        throw new Error('payload is not valid');
      }

      state.portfolio.splice(
        state.portfolio.findIndex((el) => el.symbol === payload),
        1,
      );
    },
    updatePriceValuePercentage: function updatePriceValuePercentage(state, payload) {
      if (!(isValid.updatePriceValuePercentage.state(state))) {
        throw new Error('state is not valid');
      }

      if (!(isValid.updatePriceValuePercentage.payload(payload))) {
        throw new Error('payload is not valid');
      }

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
            el.pctOfPortfolio = parseFloat(roundToPrecision((el.value * 100) / totalValue, 0.01)
              .toFixed(2));
          });
      }
    },
  },
  strict: process.env.NODE_ENV !== 'production',
});
