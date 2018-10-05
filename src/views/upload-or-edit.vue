<template>
  <div class="upload-or-edit">
    <section id="welcome" class="collapsable">
      <h1>Welcome to the portfolio dashboard</h1>
      <p>
        I'm assuming you want to dive right in with little to no preamble, but if you want some 
        hand-holding there are pages with <router-link to="/help">instructions</router-link> and 
        <router-link to="/about">overviews</router-link>.
      </p>
      <p>
        Remember: 1) Sell high!  2) Buy low! and 3) Don't invest money you can't afford to lose!
      </p>
    </section>
    <section>
      <h2>Current portfolio:</h2>
      <table class="table table-bordered table-hover table-striped" cy-portfolio-table>
          <thead class="thead-dark">
            <th scope="col">Symbol</th>
            <th scope="col">Friendly name</th>
            <th scope="col">Num shares</th>
            <th scope="col">Value</th>
            <th scope="col">% of portfolio</th>
            <th scope="col">Asset class(es)</th>
            <th scope="col">Actions</th>
          </thead>
          <tbody>
            <tr>
              <td>ABCLV</td>
              <td>ABC Corp large value</td>
              <td>3333</td>
              <td>4444</td>
              <td>50</td>
              <td>50% large cap domestic, 50% mid cap domestic</td>
              <td><button class="mb-1">Edit</button> <br> <button>Remove</button></td>
            </tr>
            <tr>
              <td>ABCLV</td>
              <td>ABC Corp large value</td>
              <td>3333</td>
              <td>4444</td>
              <td>50</td>
              <td>50% large cap domestic, 50% mid cap domestic</td>
              <td><button class="mb-1">Edit</button> <br> <button>Remove</button></td>
            </tr>
            <tr>
              <td>ABCWB</td>
              <td>ABC Corp world bond</td>
              <td>3333</td>
              <td>4444</td>
              <td>50</td>
              <td>International bond</td>
              <td><button class="mb-1">Edit</button> <br> <button>Remove</button></td>
            </tr>
          </tbody>
        </table>
    </section>
    <section>
      <h2>Upload</h2>

    </section>
    <section>
      <h2>Edit</h2>
      <button class="btn btn-success mr-2 mb-1" data-cy-add-security>Add security</button>
      <button class="btn btn-danger mr-2 mb-1">Clear current portfolio</button>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },
  methods: {
    hideWelcome() {
      document.querySelector('#welcome').classList.add('collapsed');
    }
  },
  mounted() {
    setTimeout(() => {
      this.hideWelcome();
    }, 15000);
  }
};
</script>

<style>
  @keyframes asdf {
    /* from {height: 100%;} */
    to {height: 0;}
  }

  .table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(85, 193, 143, 1);
  }

  .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
    background-color: rgba(255, 255, 4, 1);
  }

  .collapsable {
    overflow: hidden;
    transition: max-height 4s ease-out;
    height: auto;
    max-height: 600px;
  }

  .collapsable.collapsed {
    max-height: 0;
  }
</style>