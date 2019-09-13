export default {
  data() {
    return {};
  },
  methods: {
    expandAssetClassShorthand(shorthand) {
      const translations = {
        bondDomestic: 'Domestic bonds',
        bondInternational: 'International bonds',
        stockDomesticLarge: 'Domestic large-cap stocks',
        stockDomesticMid: 'Domestic mid-cap stocks',
        stockDomesticSmall: 'Domestic small-cap stocks',
        stockInternationalLarge: 'International large-cap stocks',
        stockInternationalMid: 'International mid-cap stocks',
        stockInternationalSmall: 'International small-cap stocks',
      };
      return translations[shorthand];
    },
  },
};
