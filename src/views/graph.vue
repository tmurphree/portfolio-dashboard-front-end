<template>
  <div>
    <div class="row"> 
      <div class="col-12">
       <h1>By asset class</h1>
        <small class="col-12 pl-0">
          Prices are updated once a minute.  A word on <router-link to="/about">rounding</router-link>.
        </small>
        <canvas id="by-asset-class"></canvas>
      </div>
    </div>
    <div class="row"> 
      <div class="col-12">
       <h1>By security</h1>
        <small class="col-12 pl-0">
          Prices are updated once a minute.  A word on <router-link to="/about">rounding</router-link>.
        </small>
        <canvas id="by-security"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: function data() {
    return {
      bySecurityChart: {},
      byAssetClassChart: {},
    };
  },
  computed: {
    bySecurityChartData() {
      return this.portfolio
        .map(((el, index) => {
          return {
            backgroundColor: this.alternateBackgroundColors(index),
            data: el.pctOfPortfolio,
            label: el.symbol,
          }
        }));
    },
    ...mapState(['portfolio']),
  },
  methods: {
    alternateBackgroundColors(index) {
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
    },
    applyAssetClassColor(shorthand) {
      const translations = {
        bondDomestic: 'rgba(75, 192, 192, 1)',
        bondInternational: 'rgba(75, 192, 192, 0.5)',
        stockDomesticLarge: 'rgba(255, 21, 21, 1)',
        stockDomesticMid: 'rgba(255, 21, 21, 0.6)',
        stockDomesticSmall: 'rgba(255, 21, 21, 0.2)',
        stockInternationalLarge: 'rgba(54, 162, 235, 1)',
        stockInternationalMid: 'rgba(54, 162, 235, 0.6)',
        stockInternationalSmall: 'rgba(54, 162, 235, 0.2)',
      };
      return translations[shorthand];
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
              position: 'bottom'
            },
          },
        }
      );
    },
    updateCharts() {
      this.bySecurityChart.data.labels = [];
      this.bySecurityChart.data.labels = this.bySecurityChartData.map((el) => el.label);

      this.bySecurityChart.data.datasets.forEach((dataset) => {
        dataset.backgroundColor = [];
        dataset.backgroundColor = this.bySecurityChartData.map((el) => el.backgroundColor);

        dataset.data = [];
        dataset.data = this.bySecurityChartData.map((el) => el.data);

        dataset.borderWidth = 1;
      });
      this.bySecurityChart.update();
    },
  },
  watch: {
    portfolio: {
      deep: true,
      handler() {
        this.updateCharts();
      },
    },
  },
  mounted() {
              
    const chartData = [
      {
        backgroundColor: 'rgba(255, 99, 132, 1)',
        data: 12,
        label: 'Red',
      },
      {
        backgroundColor: 'rgba(255, 99, 132, 1)',
        data: 19,
        label: 'Blue',
      },
      {
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        data: 3,
        label: 'Yellow',
      },
      {
        backgroundColor: 'rgba(255, 99, 132, 1)',
        data: 5,
        label: 'Red',
      },
      {
        backgroundColor: 'rgba(255, 99, 132, 1)',
        data: 2,
        label: 'Red',
      },
      {
        backgroundColor: 'rgba(255, 99, 132, 1)',
        data: 3,
        label: 'Red',
      },
    ];
    this.bySecurityChart = this.drawChart('#by-security', this.bySecurityChartData);
    this.byAssetClassChart = this.drawChart('#by-asset-class', chartData);
  },
  name: 'graph'
}
</script>

<style lang="scss">

</style>