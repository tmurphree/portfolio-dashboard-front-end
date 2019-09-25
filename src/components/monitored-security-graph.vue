<template>
  <div class="border border-dark col-md-6 col-xl-5">
    <canvas
        aria-label="Monitored security chart"
        :id="chartId"
        role="img"
      >
      </canvas>
      <p>
        {{ chartData.symbol }} is {{ chartData.pctOfPortfolio }}% of the portfolio.  This is {{ comparisonWord }} the target range of 
        {{ chartData.lowerBound }}% to {{ chartData.upperBound }}%
      </p>
  </div> <!-- class="col-md-6" -->
</template>

<script>
const selectorIsValid = function selectorIsValid(selector) {
  return typeof selector === 'string' &&
    selector.length > 0;
};

const chartInfoIsValid = function chartInfoIsValid(chartInfo) {
  const hasExpectedProps = function hasExpectedProps() {
    const expectedProps = [
      'lowerBound',
      'pctOfPortfolio',
      'symbol',
      'upperBound',
    ];

    const keys = Object.keys(chartInfo);
    
    return expectedProps.every((el) => keys.includes(el));
  };

  return typeof chartInfo === 'object' &&
    hasExpectedProps() &&
    chartInfo.symbol !== '';
};

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
    comparisonWord() {
      if (this.chartData.pctOfPortfolio < this.chartData.lowerBound) {
        return 'below';
      }

      if (this.chartData.pctOfPortfolio > this.chartData.upperBound) {
        return 'above';
      }

      return 'within';
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
     * @prop {number} lowerBound
     * @prop {number} pctOfPortfolio
     * @prop {string} symbol
     * @prop {number} upperBound
    */
    drawBarChart(selector, chartInfo) {
      if (!selectorIsValid(selector)) {
        throw new Error(`Invalid selector in drawBarChart: ${selector}`);
      }

      if (!chartInfoIsValid(chartInfo)) {
        throw new Error(`Invalid chartInfo in drawBarChart: ${JSON.stringify(chartInfo, null, 2)}`);
      }

      const context = document.querySelector(selector).getContext('2d');

      const data = {
        labels: [chartInfo.symbol],
        datasets: [{
          backgroundColor: 'rgba(255, 99, 132, 1)',
          data: [chartInfo.pctOfPortfolio],
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
                  min: 0,
                  suggestedMax: chartInfo.upperBound,
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
    this.drawBarChart(`#${this.chartId}`, this.chartData);
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