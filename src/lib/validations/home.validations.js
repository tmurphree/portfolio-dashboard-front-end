import {
  isObjectLike,
  isPopulatedString,
} from '@tmurphree/validation-predicates';

import securityFactory from '../securityFactory';

const displayAssetClasses = {
  classesObject: (x) => isObjectLike(x, securityFactory().assetClasses),
};

const removeSecurity = {
  symbol: (x) => isPopulatedString(x),
};

export {
  displayAssetClasses,
  removeSecurity,
};
