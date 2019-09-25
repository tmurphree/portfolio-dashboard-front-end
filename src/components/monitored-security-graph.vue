<template>
  <div class="border col-md-6"  :class="borderClass">
    <canvas
        aria-label="Monitored security chart"
        :id="chartId"
        role="img"
      >
      </canvas>
      <p>
        {{ chartData.symbol }} is {{ chartData.pctOfPortfolio }}% of the portfolio.  This is 
        <span :class="comparisonWordClass">{{ comparisonWord }}</span> the target range of 
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
    borderClass() {
      return { 'border-danger': this.comparisonWord !== 'within' };
    },
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
    comparisonWordClass() {
      return {
        'text-danger': this.comparisonWord !== 'within',
      }
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

      const computedBackgroundColor = this.comparisonWord !== 'within' ?
        'rgba(255, 99, 132, 1)' :
        'rgba(20, 255, 91, 1)';

      const context = document.querySelector(selector).getContext('2d');

      const data = {
        labels: [chartInfo.symbol],
        datasets: [{
          backgroundColor: computedBackgroundColor,
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

</style>