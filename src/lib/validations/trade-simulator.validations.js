import {
  isObjectWithExpectedProps,
  isPopulatedArray,
  isPopulatedString,
  isNotNullOrUndefined,
} from '@tmurphree/validation-predicates';

const drawChart = {
  selector: (x) => isPopulatedString(x),
  chartInfo: (x) => isPopulatedArray(x) &&
      x.every((el) => isObjectWithExpectedProps(el, ['backgroundColor', 'data', 'label'])),
};

const updateChart = {
  chart: (x) => isNotNullOrUndefined(x),
  newChartInfo: drawChart.chartInfo,
};

export {
  drawChart,
  updateChart,
};