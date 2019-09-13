export default {
  data() {
    return {};
  },
  methods: {
    expandAssetClassShorthand(shorthand) {
      const translations = {
        bondDomestic: 'domestic bonds',
        bondInternational: 'international bonds',
        stockDomesticLarge: 'domestic large-cap stocks',
        stockDomesticMid: 'domestic mid-cap stocks',
        stockDomesticSmall: 'domestic small-cap stocks',
        stockInternationalLarge: 'international large-cap stocks',
        stockInternationalMid: 'international mid-cap stocks',
        stockInternationalSmall: 'international small-cap stocks',
      };
      return translations[shorthand];
    },
  },
};
