const securityFactory = function securityFactory() {
  return {
    assetClasses: {
      bondDomestic: 0,
      bondInternational: 0,
      stockDomesticLarge: 0,
      stockDomesticMid: 0,
      stockDomesticSmall: 0,
      stockInternationalLarge: 0,
      stockInternationalMid: 0,
      stockInternationalSmall: 0,
    },
    friendlyName: '',
    lastRefreshed: 'never',
    price: 0,
    monitored: false,
    monitoredUpperBound: 0,
    monitoredLowerBound: 0,
    numShares: 0,
    pctOfPortfolio: 0,
    symbol: '',
    value: 0,
  };
};

export default securityFactory;
