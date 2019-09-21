<template>
  <div class="row">
    <section class="col-12" id="welcome-text">

      <h1>Monitored securities</h1>
      <p>
        Some securities are riskier than others.   In a future implementation of the site you can 
        tag a security as needing monitoring and set thresholds for it.  This page shows you where
        the value of the security is compared to those thresholds.
      </p>
    </section>
    <section class="col-12" id="graph-section">
      <canvas
        aria-label="Monitored security chard"
        id="monitored-securities"
        role="img"
      >
      </canvas>
    </section>
  </div>
</template>

<script>
export default {
  data: function data() {
    return {};
  },
  name: 'monitored'
}
</script>

<style lang="scss">

</style>