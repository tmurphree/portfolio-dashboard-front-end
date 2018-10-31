'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import securityTemplate from '@/assets/services/object-templates.service';

const { initialData } = require('@/assets/services/initial-data.service');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showHomeViewWelcome: true,
    portfolio: [...initialData],
  },
  mutations: {
    addToPortfolio: function addToPortfolio(state, payload) {
      if (typeof payload !== 'object') {
        throw new Error(`Non-object received in portfolio mutation.`);
      }

      Object
        .keys(securityTemplate)
        .forEach((el) => {
          if (!Object.keys(payload).includes(el)) {
            throw new Error(`Missing expected property: ${el}`);
          }
        });

      state.portfolio.push(payload);
    },
    clearPortfolio: function clearPortfolio(state, payload) {
      state.portfolio = [];
    },
    showHomeViewWelcome: function showHomeViewWelcome(state, payload) {
      if (typeof payload !== 'boolean') {
        throw new Error(`Non-boolean received in showHomeViewWelcome mutation.`);
      }

      state.showHomeViewWelcome = payload;
    },
    trimPortfolio: function trimPortfolio(state, payload) {
      //This doesn't work: state.portfolio.splice(payload,0); -- the state doesn't update.

      if (typeof payload !== 'number') {
        throw new Error('Invalid payload value in trimPortfolio');
      }

      let newPort = [];

      for (let index = 0; index < state.portfolio.length; index++) {
        if (index !== payload) {
          newPort.push(state.portfolio[index]);
        }
      }

      state.portfolio = [ ...newPort ];
    }
  },
  actions: {

  },
  strict: process.env.NODE_ENV !== 'production'
});