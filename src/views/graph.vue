<template>
  <div class="row">
    <section class="col-12 col-lg-6">
      <h1>By asset class</h1>
      <small class="col-12 pl-0">
        Prices are updated once a minute.  A word on <router-link to="/about">rounding</router-link>.
      </small>
      <canvas
        aria-label="Chart by asset class"
        class="chart-canvas"
        id="by-asset-class"
        role="img"
      >
      </canvas>
      <graph-legend :chart-data="byAssetClassChartData" data-legend-for="by-asset-class"></graph-legend>
    </section>
    <section class="align-items-center col-12 col-lg-6">
      <div class="col-12">
      <h1>By security</h1>
        <small class="col-12 pl-0">
          Prices are updated once a minute.  A word on <router-link to="/about">rounding</router-link>.
        </small>
        <canvas
          aria-label="Chart by security"
          class="chart-canvas"
          id="by-security"
          role="img"
        >
        </canvas>
      </div>
      <graph-legend :chart-data="bySecurityChartData" data-legend-for="by-security"></graph-legend>
    </section>
  </div><!-- immediate child of template element -->
</template>

<script>
import { mapState } from 'vuex';

import GraphLegend from '@/components/graph-legend';

import roundToPrecision from '@/lib/roundToPrecision';
import expandAssetClassShorthand from '@/mixins/expandAssetClassShorthand.mixin';
import securityFactory from '@/lib/securityFactory';

export default {
  components: { GraphLegend },
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
        
        // make object with appriate keys set to 0
        const makeInitialObject = function makeInitialObject() {
          const result = {};

          assetClassKeys.forEach((key) => {
            result[key] = 0;
          });

          return result;
        };

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
          .reduce(addThePercentages, makeInitialObject());
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
    f() {
      console.log(`hi from f ${window.innerWidth}`);
      this.windowWidth = window.innerWidth;
    },
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
      const context = document.querySelector(selector).getContext('2d');
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
    updateAllCharts() {
        this.updateChart(this.byAssetClassChart, this.byAssetClassChartData);
        this.updateChart(this.bySecurityChart, this.bySecurityChartData);
    },
    updateChart(chart, newChartInfo) {
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