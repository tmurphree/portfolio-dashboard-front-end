import axios from 'axios';

/**
 * @description Get prices for one or more symbols.
 * @param {array|string} symbol Array of symbols or a single string symbol.
 * @returns {promise}
 * @example
 * getPrices(Vue, ['bac', 'csco']);
 * @example
 * getPrices(Vue, 'jpm');
*/
const getPrices = function getPrices(Vue, userInput) {
  const doTheWork = (symbol = userInput) => {
    const baseUrl = process.env.NODE_ENV === 'production' ?
      'https://tm-portfolio-dashboard.herokuapp.com' :
      'http://127.0.0.1:3000';

    const url = `${baseUrl}/prices/${Array.isArray(symbol) ? 'many' : 'one'}`;

    return axios.post(url, { symbol });
  };

  // add the method to the Vue instance as $getPrices
  Object.defineProperty(
    // object to extend
    Vue.prototype,
    // key name
    '$getPrices',
    // options
    // eslint-disable-next-line
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
    { configurable: false, value: doTheWork, writable: false },
  );
};

export default {
  install: getPrices,
};
