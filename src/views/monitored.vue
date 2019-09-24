<template>
  <div class="row">
    <section class="col-12" id="welcome-text">

      <h1>Monitored securities</h1>
      <p>
        Some securities are riskier than others.   You can tag a security as needing monitoring and set
        thresholds for it on the Home screen (it's an option when you Edit or add a security).This page
        shows you where the value of the security is compared to those thresholds.
      </p>
    </section>
    <section class="col-12" id="graph-section">
      <canvas
        aria-label="Monitored security chart"
        id="monitored-securities"
        role="img"
      >
      </canvas>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: function data() {
    return {};
  },
  computed: {
    monitoredSecurities() {
      return this.portfolio
        .filter((el) => el.monitored)
        .map((el) => { 
          return {
            lowerBound: el.monitoredLowerBound,
            upperBound: el.monitoredUpperBound,
            symbol: el.symbol,
          }
        });
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
    drawBarChart(selector='canvas', chartInfo) {
      const context = document.querySelector(selector).getContext('2d');
      console.log(context);
      const data = {
        labels: ['test bar chart'],
        datasets: [{
          backgroundColor: 'rgba(255, 99, 132, 1)',
          data: [12],
          borderWidth: 1
        }]
      };

      return new Chart(
        context,
        {
          type: 'bar',
          data,
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  stepSize: 1,
                  min: 0,
                  // TODO: set suggestedMax to monitoredUpperBound
                  suggestedMax: 9,
                }
              }],
            },
            legend: {
              display: false
            },
          },
        }
      );
    }
  },
  mounted() {
    this.drawBarChart();
  },
  name: 'monitored'
}
</script>

<style lang="scss">

</style>