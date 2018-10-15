import Vue from 'vue';
import Vuex from 'vuex';

const templates = require('./services/object-templates.service');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showHomeViewWelcome: true,
    portfolio: [],
  },
  mutations: {
    showHomeViewWelcome(state, payload) {
      if (typeof payload !== 'boolean') {
        throw new Error(`Non-boolean received in showHomeViewWelcome mutation.`);
      }

      this.showHomeViewWelcome = payload;
    },
    /**
     * @description Update the portfolio. 
     * @param {object} data Expect two sorts of objects: one to clear the portfolio 
     *  ({ action: 'clear' }) and one to add data to the portfolio (looks like 
     *  templates.security).
     * @returns {undefined}
    */
    portfolio(state, payload) {
      if (typeof payload !== 'object') {
        throw new Error(`Non-object received in portfolio mutation.`);
      }

      if (payload.action) {
        if (payload.action === 'clear') {
          this.portfolio = [];
          return;
        } else {
          throw new Error(`Only one valid action in portfolio mutation: 'clear'.`);
        }
      }

      Object
        .keys(templates.security)
        .forEach((el) => {
          if (!Object.keys(payload).includes(el)) {
            throw new Error(`Missing expected property: ${el}`);
          }
        });
      
      setTimeout(() => {
        this.portfolio.push(payload);
      }, 0);
    }
  },
  actions: {

  }
});