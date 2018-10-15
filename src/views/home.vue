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
              <td>33</td>
              <td>50% large cap domestic, 50% mid cap domestic</td>
              <td><button class="mb-1">Edit</button> <br> <button>Remove</button></td>
            </tr>
            <tr>
              <td>ABCSG</td>
              <td>ABC Corp small cap growth</td>
              <td>3333</td>
              <td>4444</td>
              <td>34</td>
              <td>100% small cap domestic</td>
              <td><button class="mb-1 toggle-vis">Edit</button> <br> <button class="toggle-vis">Remove</button></td>
            </tr>
            <tr>
              <td>ABCWB</td>
              <td>ABC Corp world bond</td>
              <td>3333</td>
              <td>4444</td>
              <td>33</td>
              <td>International bond</td>
              <td><button class="mb-1">Edit</button> <br> <button>Remove</button></td>
            </tr>
          </tbody>
        </table>
    </section>
    <section>
      <h2 class="sr-only">Edit</h2>

      <button class="btn btn-danger mr-2 mb-1" data-cy-clear-port @click="clearPortfolio">
        Clear current portfolio
      </button>
      <input type="file" name="file-input" id="file-input" accept=".csv" class="d-none">
      <button 
        class="btn btn-primary mr-2 mb-1 d-none d-lg-block" 
        data-cy-upload 
        @click="uploadCsvFile"
      >
        Upload a CSV file
      </button>
    </section>
    <section id="data-entry" class="mt-4">
      <section data-cy-add-security-form>
        <form action="">
          <label for="txt-symbol">Symbol:</label>
          <input name="txt-symbol" type="text" required>
          <label for="txt-friendly-name">Friendly name<sup>*</sup>:</label>
          <input name="txt-friendly-name" type="text">
          <label for="num-num-shares">Number of shares:</label>
          <input name="num-num-shares" type="number" required>
          <br>
          <button class="btn btn-success mr-2 mb-1" data-cy-add-security @click="addSecurity">
            Add security
          </button>
          <p><sup>*</sup>optional</p>
        </form>
      </section>
      <section class="d-none d-lg-block">
          <div id="dropzone" class="dropzone" data-cy-dropzone>
            <h2>Drag a CSV file here to upload it</h2>
          </div>
        </section>
    </section>
  </div>
</template>

<script>

/**
 * @description Hide or show an element or elements based on whether or not they
 *    already have the d-none class.
 * @param {string} selector querySelector search string.
 * @returns {undefined}
*/
function hideShowToggle(selector) {
  if (!selector || (typeof selector !== 'string')) {
    throw new Error(`Expecting a string argument in hideShowToggle.`);
  }

  document.querySelectorAll(selector)
    .forEach((el) => { el.classList.toggle('d-none'); });
}

export default {
  data () {
    return {
      dropzone: undefined,
      showHomeViewWelcome: true,
    };
  },
  computed: {
    // showHomeViewWelcome() {
    //   return this.$store.state.showHomeViewWelcome;
    // }
  },
  methods: {
    addSecurity() {
      alert('addSecurity does not work as intended at the moment -- please check back later.');
    },
    clearPortfolio() {
      alert('clearPortfolio does not work as intended at the moment -- please check back later.');
    },
    hideWelcome() {
      document.querySelector('#welcome').classList.add('collapsed');
      // this.showHomeViewWelcome = false;
      // self.$store.commit('showHomeViewWelcome', false);
      // setTimeout(() => {
      // }, 3);

      return this;
    },
    uploadCsvFile() {
      alert('uploadCsvFile does not work as intended at the moment -- please check back later.');
    },
  },
  mounted() {
    this
      .hideWelcome();
  }
};
</script>

<style>
  .collapsable {
    overflow: hidden;
    transition: max-height 4s ease-out 15s;
    height: auto;
    max-height: 600px;
  }

  .collapsable.collapsed {
    max-height: 0;
  }
  
  #data-entry {
    display: inline-flex;
  }

  #data-entry section {
    width: 50%;
  }

  #data-entry section label {
    width: 50%;
  }

  #data-entry section input {
    text-align: right;
    width: 40%;
  }

  .dropzone {
    border: 2px dashed rgba(0, 0, 0, 1);
    height: 100%;
    text-decoration: line-through; 
    color: gray;
  }

  .table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(85, 193, 143, 1);
  }

  .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
    background-color: rgba(255, 255, 4, 1);
  }
</style>