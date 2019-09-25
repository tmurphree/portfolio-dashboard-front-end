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
    <section class="d-flex justify-content-center justify-content-lg-start row" id="graph-section">
      <monitored-security-graph
        v-for="element in monitoredSecurities"
        :chartData="element"
        :key="element.symbol"
      ></monitored-security-graph>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import MonitoredSecurityGraph from '@/components/monitored-security-graph';

export default {
  components: {
    MonitoredSecurityGraph,
  },
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
            pctOfPortfolio: el.pctOfPortfolio,
            symbol: el.symbol,
            upperBound: el.monitoredUpperBound,
          }
        })
        .sort((el) => el.symbol);
    },
    ...mapState(['portfolio']),
  },
  name: 'monitored'
}
</script>

<style lang="scss">
 #graph-section>div {
   max-width: 90%;
 }
</style>