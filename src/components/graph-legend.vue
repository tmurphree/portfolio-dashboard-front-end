<template>
  <div class="row">
    <div class="col-md-6" v-for="chartDataPoint in chartData" :key="chartDataPoint.label">
      <div class="color-box mr-1" :style="{ backgroundColor: chartDataPoint.backgroundColor }"></div>
      <span>{{ chartDataPoint.label }}</span>
    </div>
  </div> <!-- class="row" -->
</template>

<script>
export default {
  props: {
    chartData: Array,
  },
  data() {
    return {};
  },
  name: 'graph-legend'
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