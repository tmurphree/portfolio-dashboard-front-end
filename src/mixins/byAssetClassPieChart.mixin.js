/* eslint import/no-unresolved:'off', no-param-reassign:'off', no-undef:'off' */

import expandAssetClassShorthand from '@/mixins/expandAssetClassShorthand.mixin';
import roundToPrecision from '@/lib/roundToPrecision';
import securityFactory from '@/lib/securityFactory';
import * as isValid from '@/lib/validations/byAssetClassPieChart.validations';


export default {
  mixins: [expandAssetClassShorthand],
  data() {
    return {};
  },
  computed: {
    /**
     * @description Calculates data for the 'by-asset-class' chart.
     * @returns {object[]}
     * [
     *  {
     *    backgroundColor: 'rgba(something)',
     *    data: 42,
     *    label: 'Large cap domestic stock'
     *  },
     *  etc.
     * ]
    */
    byAssetClassChartData() {
    /**
     * @returns {object}
     * {
     *  bondDomestic: 54.98,
     *  bondInternational: 0,
     *  stockDomesticLarge: 34.66,
     *  stockDomesticMid: 8.10,
     *  stockDomesticSmall: 2.25,
     *  stockInternationalLarge: 0,
     *  stockInternationalMid: 0,
     *  stockInternationalSmall: 0
     * }
    */
      // eslint-disable-next-line func-names
      const aggregateWeightedAssetClassPercentages = (function (portfolio) {
        const assetClassKeys = Object.keys(securityFactory().assetClasses);

        const grabRelevantProps = function grabRelevantProps(el) {
          return {
            pctOfPortfolio: parseFloat(el.pctOfPortfolio),
            ...el.assetClasses,
          };
        };

        const calculatePerSecurityContribution = function calculatePerSecurityContribution(el) {
          const result = {};

          assetClassKeys.forEach((key) => {
            result[key] = (el[key] * el.pctOfPortfolio) / 100;
          });

          return result;
        };

        const addThePercentages = function addThePercentages(result, current) {
          assetClassKeys.forEach((key) => {
            result[key] += current[key];
          });

          return result;
        };

        return portfolio
          .map(grabRelevantProps)
          .map(calculatePerSecurityContribution)
          .reduce(addThePercentages, { ...securityFactory().assetClasses });
      }(this.portfolio));

      const calculateBackgroundColor = function calculateBackgroundColor(shorthand) {
        const translations = {
          bondDomestic: 'rgba(75, 192, 192, 1)',
          bondInternational: 'rgba(75, 192, 192, 0.5)',
          stockDomesticLarge: 'rgba(29, 39, 255, 1)',
          stockDomesticMid: 'rgba(29, 39, 255, 0.6)',
          stockDomesticSmall: 'rgba(29, 39, 255, 0.2)',
          stockInternationalLarge: 'rgba(255, 182, 0, 1)',
          stockInternationalMid: 'rgba(255, 182, 0, 0.6)',
          stockInternationalSmall: 'rgba(255, 182, 0, 0.2)',
        };
        return translations[shorthand];
      };

      const chartInfoFactory = (shorthand) => ({
        backgroundColor: calculateBackgroundColor(shorthand),
        data: roundToPrecision(aggregateWeightedAssetClassPercentages[shorthand], 0.01)
          .toFixed(2),
        label: this.expandAssetClassShorthand(shorthand),
      });

      return Object.keys(securityFactory().assetClasses)
        .map((el) => chartInfoFactory(el));
    },
  },
  methods: {
    /**
     * @description Draw a chart.
     * @param {string} selector Query selector specific to the <canvas> you want to draw
     *    the chart on.
     * @param {ChartInfo[]} chartInfo Data to chart.
     * @returns {undefined}
     *
     * @typedef ChartInfo
     * @prop {string} backgroundColor 'rgba(255, 99, 132, 1)'
     * @prop {number} data The data you want to show in the chart.
     * @prop {string} label The label for the data point.
    */
    drawChart(selector, chartInfo) {
      if (!(isValid.drawChart.selector(selector))) {
        throw new Error('selector is invalid');
      }

      if (!(isValid.drawChart.chartInfo(chartInfo))) {
        throw new Error('chartInfo is invalid');
      }

      let context;

      try {
        context = document.querySelector(selector).getContext('2d');
      } catch (e) {
        console.error(e);
        return;
      }

      const data = {
        labels: chartInfo.map((el) => el.label),
        datasets: [{
          backgroundColor: chartInfo.map((el) => el.backgroundColor),
          data: chartInfo.map((el) => el.data),
          borderWidth: 1,
        }],
      };

      // eslint-disable-next-line consistent-return
      return new Chart(
        context,
        {
          type: 'pie',
          data,
          options: {
            legend: {
              display: false,
            },
          },
        },
      );
    },
    /**
     * @description Update a chart.
     * @param {string} selector Query selector specific to the <canvas> you want to draw
     *    the chart on.
     * @param {ChartInfo[]} newChartInfo Data to chart.
     * @returns {undefined}
     *
     * @typedef ChartInfo
     * @prop {string} backgroundColor 'rgba(255, 99, 132, 1)'
     * @prop {number} data The data you want to show in the chart.
     * @prop {string} label The label for the data point.
    */
    updateChart(chart, newChartInfo) {
      if (!(isValid.updateChart.chart(chart))) {
        throw new Error('chart is invalid');
      }

      if (!(isValid.updateChart.newChartInfo(newChartInfo))) {
        throw new Error('newChartInfo is invalid');
      }

      chart.data.labels = [];
      chart.data.labels = newChartInfo.map((el) => el.label);

      chart.data.datasets.forEach((dataset) => {
        dataset.backgroundColor = [];
        dataset.backgroundColor = newChartInfo.map((el) => el.backgroundColor);

        dataset.data = [];
        dataset.data = newChartInfo.map((el) => el.data);

        dataset.borderWidth = 1;
      });

      chart.update();
    },
  },
};
