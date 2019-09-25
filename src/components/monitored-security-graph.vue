<template>
  <div class="col-md-6 col-xl-5">
    <canvas
        aria-label="Monitored security chart"
        :id="chartId"
        role="img"
      >
      </canvas>
  </div> <!-- class="col-md-6" -->
</template>

<script>
export default {
  props: {
    chartData: Object,
  },
  data() {
    return {};
  },
  computed: {
    chartId() {
      return `${this.chartData.symbol.toLowerCase()}-chart`
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
    drawBarChart(selector, chartInfo) {
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
    console.log(this.chartId);
    this.drawBarChart(`#${this.chartId}`, 'foo');
  },
  name: 'monitored-security-graph'
};
</script>

<style lang="scss">
  .color-box {
    display: inline-block;
    height: 10px;
    width: 20px;
  }

  // style data-legend-for down here so I can use scss nesting
  @media (min-width: 768px) {
    [data-legend-for="by-asset-class"] {
      margin-left: 10%;
    }

    [data-legend-for="by-security"] {
      margin-left: 26%;
    } 
  }
</style>