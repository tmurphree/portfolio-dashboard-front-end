<template>
  <div>
    <div class="row">
      <div class="col-12" id="welcome-text">
          <h1>Monitored securities</h1>
          <p>
            Some securities are riskier than others.   You can tag a security as needing extra monitoring and set
            thresholds for it on the Home screen (it's the "This security needs extra monitoring" option when
            you edit or add a security).  This page shows you where the value of the security is compared to
            those thresholds.
          </p>
      </div>
    </div>
    <div class="row" id="graph-section">
      <monitored-security-graph
        v-for="element in monitoredSecurities"
        :chartData="element"
        :key="element.symbol"
      ></monitored-security-graph>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import MonitoredSecurityGraph from '@/components/monitored-security-graph';

const sortBySymbol = function sortBySymbol(a,b) {
  if (a.symbol < b.symbol) { return -1; }
  if (a.symbol > b.symbol) { return 1; }
  return 0;
};

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
        .sort(sortBySymbol);
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