import {
  isArray,
  isBoolean,
  isObjectLike,
  isObjectWithExpectedProps,
  isNotNullOrUndefined,
  isString,
} from '@tmurphree/validation-predicates';

import securityFactory from '../securityFactory';

const state = (x) => isNotNullOrUndefined(x);

const addToPortfolio = {
  state,
  payload: (x) => isObjectLike(x, securityFactory()),
};

const clearPortfolio = {
  state,
};

const showHomeViewWelcome = {
  state,
  payload: (x) => isBoolean(x),
};

const trimPortfolio = {
  state,
  payload: (x) => isString(x),
};

const updatePriceValuePercentage = {
  state,
  payload: (x) => {
    const testApiResponse = function testApiResponse(el) {
      const errorResponseProps = ['error', 'errorMessage', 'symbol'];
      const successResponseProps = [
        'error',
        'lastRefreshed',
        'price',
        'symbol',
      ];

      return isObjectWithExpectedProps(el, errorResponseProps) ||
        isObjectWithExpectedProps(el, successResponseProps);
    };

    return isArray(x) ? x.every(testApiResponse) : testApiResponse(x);
  },
};

export {
  addToPortfolio,
  clearPortfolio,
  showHomeViewWelcome,
  trimPortfolio,
  updatePriceValuePercentage,
};
