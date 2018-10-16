const templates = require('./object-templates.service');

let initialData = [];

initialData.push({
  assetClasses: [ 
    { class: 'largeCapDomestic', pct: 77 },
    { class: 'midCapDomestic', pct: 18 },
    { class: 'smallCapDomestic', pct: 6 },
  ],
  friendlyName: 'iShares Core S&P Total US Stock Mkt ETF',
  monitored: false,
  monitoredUpperBound: 0,
  monitoredLowerBound: 0,
  numShares: 100,
  pctOfPortfolio: 0,
  symbol: 'ITOT',
});

initialData.push({
  assetClasses: [ 
    { class: 'midCapDomestic', pct: 12 },
    { class: 'smallCapDomestic', pct: 88 },
  ],
  friendlyName: 'iShares Core S&P Small-Cap ETF',
  monitored: false,
  monitoredUpperBound: 0,
  monitoredLowerBound: 0,
  numShares: 100,
  pctOfPortfolio: 0,
  symbol: 'IJR',
});

initialData.push({
  assetClasses: [ 
    { class: 'domesticBond', pct: 100 },
  ],
  friendlyName: 'Vanguard Total Bond Market Index Fund ETF Shares',
  monitored: false,
  monitoredUpperBound: 0,
  monitoredLowerBound: 0,
  numShares: 100,
  pctOfPortfolio: 0,
  symbol: 'BND',
});

module.exports = { initialData };
