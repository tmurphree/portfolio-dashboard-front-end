const initialData = [];

initialData.push({
  assetClasses: {
    bondDomestic: 0,
    bondInternational: 0,
    stockDomesticLarge: 77,
    stockDomesticMid: 18,
    stockDomesticSmall: 6,
    stockInternationalLarge: 0,
    stockInternationalMid: 0,
    stockInternationalSmall: 0,
  },
  friendlyName: 'iShares Core S&P Total US Stock Mkt ETF',
  monitored: false,
  monitoredUpperBound: 0,
  monitoredLowerBound: 0,
  numShares: 100,
  pctOfPortfolio: 0,
  symbol: 'ITOT',
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
  monitored: false,
  monitoredUpperBound: 0,
  monitoredLowerBound: 0,
  numShares: 100,
  pctOfPortfolio: 0,
  symbol: 'IJR',
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
  monitored: false,
  monitoredUpperBound: 0,
  monitoredLowerBound: 0,
  numShares: 100,
  pctOfPortfolio: 0,
  symbol: 'BND',
});

module.exports = { initialData };
