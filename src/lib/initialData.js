const initialData = [];

initialData.push({
  assetClasses: {
    bondDomestic: 0,
    bondInternational: 0,
    stockDomesticLarge: 77,
    stockDomesticMid: 18,
    stockDomesticSmall: 5,
    stockInternationalLarge: 0,
    stockInternationalMid: 0,
    stockInternationalSmall: 0,
  },
  friendlyName: 'iShares Core S&P Total US Stock Mkt ETF',
  lastRefreshed: 'never',
  price: 0,
  monitored: false,
  monitoredUpperBound: 0,
  monitoredLowerBound: 0,
  numShares: 100,
  pctOfPortfolio: 0,
  symbol: 'ITOT',
  value: 0,
});

initialData.push({
  assetClasses: {
    bondDomestic: 0,
    bondInternational: 0,
    stockDomesticLarge: 100,
    stockDomesticMid: 0,
    stockDomesticSmall: 0,
    stockInternationalLarge: 0,
    stockInternationalMid: 0,
    stockInternationalSmall: 0,
  },
  friendlyName: 'Direxion Daily S&P 500 3x ETF',
  lastRefreshed: 'never',
  price: 0,
  monitored: true,
  monitoredUpperBound: 8,
  monitoredLowerBound: 0,
  numShares: 40,
  pctOfPortfolio: 0,
  symbol: 'SPXL',
  value: 0,
});

initialData.push({
  assetClasses: {
    bondDomestic: 0,
    bondInternational: 0,
    stockDomesticLarge: 0,
    stockDomesticMid: 12,
    stockDomesticSmall: 88,
    stockInternationalLarge: 0,
    stockInternationalMid: 0,
    stockInternationalSmall: 0,
  },
  friendlyName: 'iShares Core S&P Small-Cap ETF',
  lastRefreshed: 'never',
  price: 0,
  monitored: false,
  monitoredUpperBound: 0,
  monitoredLowerBound: 0,
  numShares: 100,
  pctOfPortfolio: 0,
  symbol: 'IJR',
  value: 0,
});

initialData.push({
  assetClasses: {
    bondDomestic: 100,
    bondInternational: 0,
    stockDomesticLarge: 0,
    stockDomesticMid: 0,
    stockDomesticSmall: 0,
    stockInternationalLarge: 0,
    stockInternationalMid: 0,
    stockInternationalSmall: 0,
  },
  friendlyName: 'Vanguard Total Bond Market Index Fund ETF Shares',
  lastRefreshed: 'never',
  price: 0,
  monitored: true,
  monitoredUpperBound: 25,
  monitoredLowerBound: 18,
  numShares: 50,
  pctOfPortfolio: 0,
  symbol: 'BND',
  value: 0,
});

export default initialData;
