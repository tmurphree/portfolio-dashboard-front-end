// import axios from 'axios';

const getPrices = function getPrices(Vue) {
  const functionName = () => {
    console.log('haha');
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
    { configurable: false, value: functionName, writable: false },
  );
};

export default {
  install: getPrices,
};
