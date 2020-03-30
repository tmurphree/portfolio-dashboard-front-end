import {
  isObjectLike,
  isPopulatedString,
} from '@tmurphree/validation-predicates';

import securityFactory from '../securityFactory';

const displayAssetClasses = {
  classesObject: (x) => isObjectLike(x, securityFactory().assetClasses, { checkType: true }),
};

const removeSecurity = {
  symbol: (x) => isPopulatedString(x),
};

export {
  displayAssetClasses,
  removeSecurity,
};
