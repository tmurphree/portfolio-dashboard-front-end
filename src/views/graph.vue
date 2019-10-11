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

import byAssetClassPieChartMixin from '@/mixins/byAssetClassPieChart.mixin';

export default {
  components: { PieChartLegend },
  mixins: [byAssetClassPieChartMixin],
  data: function data() {
    return {
      bySecurityChart: {},
      byAssetClassChart: {},
    };
  },
  computed: {
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