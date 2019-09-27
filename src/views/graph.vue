<template>
  <div class="row">
    <section class="col-12 col-lg-6">
      <h1>By asset class</h1>
      <small class="col-12 pl-0">
        Prices are updated once a minute.  A word on <router-link to="/about">rounding</router-link>.
      </small>
      <canvas
        aria-label="Chart by asset class"
        id="by-asset-class"
        role="img"
      >
      </canvas>
      <pie-chart-legend :chart-data="byAssetClassChartData" data-legend-for="by-asset-class"></pie-chart-legend>
    </section>
    <section class="align-items-center col-12 col-lg-6">
      <div class="col-12">
      <h1>By security</h1>
        <small class="col-12 pl-0">
          Prices are updated once a minute.  A word on <router-link to="/about">rounding</router-link>.
        </small>
        <canvas
          aria-label="Chart by security"
          id="by-security"
          role="img"
        >
        </canvas>
      </div>
      <pie-chart-legend :chart-data="bySecurityChartData" data-legend-for="by-security"></pie-chart-legend>
    </section>
  </div><!-- immediate child of template element -->
</template>

<script>

import { mapState } from 'vuex';

import PieChartLegend from '@/components/pie-chart-legend';

import expandAssetClassShorthand from '@/mixins/expandAssetClassShorthand.mixin';
import roundToPrecision from '@/lib/roundToPrecision';
import securityFactory from '@/lib/securityFactory';
import * as isValid from '@/lib/validations/graph.validations.js';

export default {
  components: { PieChartLegend },
  mixins: [expandAssetClassShorthand],
  data: function data() {
    return {
      bySecurityChart: {},
      byAssetClassChart: {},
    };
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
      const aggregateWeightedAssetClassPercentages = (function(portfolio) {
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
            result[key] = el[key] * el.pctOfPortfolio / 100;
          });

          return result;
        };

        const addThePercentages = function addThePercentages(result, current) {
          assetClassKeys.forEach((key) => {
            result[key] = result[key] + current[key];
          });

          return result;
        };

        return portfolio
          .map(grabRelevantProps)
          .map(calculatePerSecurityContribution)
          .reduce(addThePercentages, { ...securityFactory().assetClasses });
      })(this.portfolio);

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

      const chartInfoFactory = (shorthand) => {
        return {
          backgroundColor: calculateBackgroundColor(shorthand),
          data: roundToPrecision(aggregateWeightedAssetClassPercentages[shorthand], 0.01)
            .toFixed(2),
          label: this.expandAssetClassShorthand(shorthand),
        };
      };
      
      return Object.keys(securityFactory().assetClasses)
        .map((el) => chartInfoFactory(el));
    },
    /**
     * @description Calculates data for the 'by-security' chart.
     * @returns {object[]}
     * [
     *  { 
     *    backgroundColor: 'rgba(something)',
     *    data: 42,
     *    label: 'JPM'
     *  },
     *  etc.
     * ]
    */
    bySecurityChartData() {
      const alternateBackgroundColors = function alternateBackgroundColors(index) {
        const backgroundColor = [
          // red
          'rgba(255, 21, 21, 1)',
          // orange
          'rgba(255, 131, 0, 1)',
          // yellow
          'rgba(255, 255, 11, 1)',
          // blue
          'rgba(54, 162, 235, 1)',
          // green
          'rgba(75, 192, 192, 1)',
          // purple
          'rgba(153, 102, 255, 1)',
        ];

        return backgroundColor[index];
      };

      return this.portfolio
        .map(((el, index) => {
          return {
            backgroundColor: alternateBackgroundColors(index),
            data: el.pctOfPortfolio,
            label: el.symbol,
          }
        }));
    },
    ...mapState(['portfolio']),
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
      } catch(e) {
        console.error(e);
        return;
      }

      const data = {
        labels: chartInfo.map((el) => el.label),
        datasets: [{
          backgroundColor: chartInfo.map((el) => el.backgroundColor),
          data: chartInfo.map((el) => el.data),
          borderWidth: 1
        }]
      };

      return new Chart(
        context,
        {
          type: 'pie',
          data,
          options: {
            legend: {
              display: false
            },
          },
        }
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
  watch: {
    portfolio: {
      deep: true,
      handler() {
        this.updateChart(this.byAssetClassChart, this.byAssetClassChartData);
        this.updateChart(this.bySecurityChart, this.bySecurityChartData);
      },
    },
  },
  mounted() {
    this.bySecurityChart = this.drawChart('#by-security', this.bySecurityChartData);
    this.byAssetClassChart = this.drawChart('#by-asset-class', this.byAssetClassChartData);
  },
  name: 'graph'
};
</script>

<style lang="scss">
@media (min-width: 992px) {
  canvas {
    margin-bottom: 1rem;
  } 
}
</style>