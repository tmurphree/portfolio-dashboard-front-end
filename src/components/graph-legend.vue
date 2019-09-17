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
  data() {
    return {};
  },
  props: {
    chartData: Array,
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
</style>