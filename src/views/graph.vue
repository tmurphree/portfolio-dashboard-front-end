<template>
  <div>
    <div class="row"> 
      <div class="col-12">
       <h1>By security</h1>
        <small class="col-12 pl-0">
          Prices are updated once a minute.  A word on <router-link to="/about">rounding</router-link>.
        </small>
        <canvas id="by-security"></canvas>
      </div>
    </div>
    <div class="row"> 
      <div class="col-12">
       <h1>By asset class</h1>
        <small class="col-12 pl-0">
          Prices are updated once a minute.  A word on <router-link to="/about">rounding</router-link>.
        </small>
        <canvas id="by-asset-class"></canvas>
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
        .map((el => {
          return {
            backgroundColor: 'rgba(255, 99, 132, 1)',
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
              // backgroundColor: [
          //   // red
          //   'rgba(255, 99, 132, 1)',
          //   // blue
          //   'rgba(54, 162, 235, 1)',
          //   // yellow
          //   'rgba(255, 206, 86, 1)',
          //   // green
          //   'rgba(75, 192, 192, 1)',
          //   // purple
          //   'rgba(153, 102, 255, 1)',
          //   // orange
          //   'rgba(255, 159, 64, 1)'
          // ],
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