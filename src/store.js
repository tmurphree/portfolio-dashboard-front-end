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
    showHomeViewWelcome: function showHomeViewWelcome(state, payload) {
      if (typeof payload !== 'boolean') {
        throw new Error(`Non-boolean received in showHomeViewWelcome mutation.`);
      }

      state.showHomeViewWelcome = payload;
    },
    /**
     * @description Update the portfolio. 
     * @param {object} data Expect two sorts of objects: one to clear the portfolio 
     *  ({ action: 'clear' }) and one to add data to the portfolio (looks like 
     *  securityTemplate).
     * @returns {undefined}
    */
    portfolio: function portfolio(state, payload) {
      if (typeof payload !== 'object') {
        throw new Error(`Non-object received in portfolio mutation.`);
      }

      if (payload.action) {
        if (payload.action === 'clear') {
          state.portfolio = [];
          return;
        } else {
          throw new Error(`Only one valid action in portfolio mutation: 'clear'.`);
        }
      }

      Object
        .keys(securityTemplate)
        .forEach((el) => {
          if (!Object.keys(payload).includes(el)) {
            throw new Error(`Missing expected property: ${el}`);
          }
        });
      
    
      state.portfolio.push(payload);

      return this;
    }
  },
  actions: {

  },
  strict: process.env.NODE_ENV !== 'production'
});