<template>
  <div>
    <div class="row">
      <h1 class="col-12">Trade simulator</h1>
      <p class="col-12" data-cy="instructions">
        Enter in the amount of money you want to move to and from each asset category.      
      </p>
    </div>
    <div class="row">
      <div class="col-md-6">
        <canvas
          aria-label="Current portfolio chart"
          data-cy="current-chart"
          id="current-chart"
          role="img"
        >
      </div>
      <div class="col-md-6" v-if="simulationStarted">
        <canvas
          aria-label="Chart showing simulation"
          data-cy="simulation-chart"
          id="simulation-chart"
          role="img"
        >
      </div>
    </div> 
    <div class="row">
      <div class="col-12">
        <table data-cy="differences-table" id="differences-table" v-if="simulationStarted">
          <tr>
            <td>foo</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="row">
      <form @submit.prevent="handleSubmit" data-cy="change-dollars-form" id="change-dollars-form">

      </form>
      <form @submit.prevent="handleSubmit" data-cy="change-shares-form" id="change-shares-form">

      </form>
    </div> <!-- div.row -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: function data() {
    return {};
  },
  computed: {
    simulationStarted() {
      return false;
    },
    ...mapState(['portfolio']),
  },
  methods: {
    handleSubmit(event) {
      // Do nothing -- the submit button ("Add Security") fires before this.
      // Also, this does not run if the submit button is disabled.
      event.preventDefault();
    },
  },
  name: 'trade-simulator'
}
</script>

<style lang="scss">

</style>