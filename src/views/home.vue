<template>
  <div id="home">
    <section v-if="this.$store.state.showHomeViewWelcome" id="welcome" class="collapsable row">
      <div>
        <h2>Welcome to the portfolio dashboard</h2>
      </div>
      <div class="col-xl-12 p-0">
        <p>
          I'm assuming you want to dive right in.  Go ahead!  There's a 
          <router-link to="/help">help page</router-link> if you need it.
        </p>
      </div>
    </section>
    <section class="row">
      <h2>Current portfolio:</h2>
      <p class="d-sm-none">Scroll the table to the right or turn the phone on its side if you can't see action buttons.</p>
      <table class="table table-bordered table-hover table-responsive-md table-striped" cy-portfolio-table>
          <thead class="thead-dark">
            <th class="d-md-table-cell d-none" scope="col">Symbol</th>
            <th scope="col">Friendly name <span class="d-md-none">(symbol)</span></th>
            <th class="d-md-table-cell d-none" scope="col">Num shares</th>
            <th class="d-md-table-cell d-none" scope="col">Value</th>
            <th scope="col">% of portfolio</th>
            <th scope="col">Asset class(es)</th>
            <th scope="col">Actions</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in this.$store.state.portfolio">
                <td class="d-md-table-cell d-none">{{ item.symbol }}</td>
                <td>{{ item.friendlyName }} <span class="d-md-none">({{ item.symbol }})</span></td>
                <td>{{ item.numShares }}</td>
                <td class="d-md-table-cell d-none">{{ item.numShares }}</td>
                <td class="d-md-table-cell d-none">{{ item.numShares }}</td>
                <td>TODO: pretty print this</td>
                <td>
                  <template>
                    <button type="button" class="mr-1">Edit</button>
                    <button type="button" @click="removeSecurity(index)">Remove</button>
                  </template>
                </td>
            </tr>
          </tbody>
        </table>
    </section>
    <section>
      <h2 class="sr-only">Edit</h2>
      <button type="button" class="btn btn-danger mr-2 mb-1" data-cy-clear-port @click="clearPortfolio">
        Clear current portfolio
      </button>
    </section>
    <section id="data-entry" class="mt-4 row">
      <form class="col-lg-5">
        <div class="row">
          <h4>Basic info</h4>
        </div>
        <div class="form-group form-row">
          <label for="symbol">Symbol:</label>
          <input v-model="editedSecurity.symbol" class="form-control" id="symbol" name="symbol" type="text">
        </div>
        <div class="form-group form-row">
          <label for="num-shares"># of shares:</label>
          <input v-model="editedSecurity.friendlyName" class="form-control" id="friendly-name" name="friendly-name" type="text">
        </div>
        <div class="form-group form-row">
          <label for="friendly-name">Friendly name (optional):</label>
          <input v-model.number="editedSecurity.numShares" class="form-control" id="num-shares" name="num-shares" type="number">
        </div>
      </form>
      <div class="col-lg-5" id="asset-classes">
        <div class="row">
          <h4>Asset classes (%)</h4>
        </div>
          <p>Stocks</p>
          <div class="form-group form-row">
            <label for="pct-stock-domestic-large">Large-cap domestic:</label>
            <input v-model.number="editedSecurity.assetClasses.stockDomesticLarge" class="form-control" id="pct-stock-domestic-large" name="pct-stock-domestic-large" type="number"><span class="d-none d-md-inlines">%</span>
          </div>
          <div class="form-group form-row">
            <label for="pct-stock-domestic-mid">Mid-cap domestic:</label>
            <input v-model.number="editedSecurity.assetClasses.stockDomesticMid" class="form-control" id="pct-stock-domestic-mid" name="pct-stock-domestic-mid" type="number"><span class="d-none d-md-inlines">%</span>
          </div>
          <div class="form-group form-row">
            <label for="pct-stock-domestic-small">Small-cap domestic:</label>
            <input v-model.number="editedSecurity.assetClasses.stockDomesticSmall" class="form-control" id="pct-stock-domestic-small" name="pct-stock-domestic-small" type="number"><span class="d-none d-md-inlines">%</span>
          </div>
          <div class="form-group form-row">
            <label for="pct-stock-international-large">Large-cap international:</label>
            <input v-model.number="editedSecurity.assetClasses.stockInternationalLarge" class="form-control" id="pct-stock-international-large" name="pct-stock-international-large" type="number"><span class="d-none d-md-inlines">%</span>
          </div>
          <div class="form-group form-row">
            <label for="pct-stock-international-mid">Mid-cap international:</label>
            <input v-model.number="editedSecurity.assetClasses.stockInternationalMid" class="form-control" id="pct-stock-international-mid" name="pct-stock-international-mid" type="number"><span class="d-none d-md-inlines">%</span>
          </div>
          <div class="form-group form-row">
            <label for="pct-stock-international-small">Small-cap international:</label>
            <input v-model.number="editedSecurity.assetClasses.stockInternationalSmall" class="form-control" id="pct-stock-international-small" name="pct-stock-international-small" type="number"><span class="d-none d-md-inlines">%</span>
          </div>
          <p>Bonds</p>
          <div class="form-group form-row">
            <label for="pct-bond-domestic">Domestic bond:</label>
            <input v-model.number="editedSecurity.assetClasses.bondDomestic" class="form-control" id="pct-bond-domestic" name="pct-bond-domestic" type="number"><span class="d-none d-md-inlines">%</span>
          </div>
          <div class="form-group form-row">
            <label for="pct-bond-international">International bond:</label>
            <input v-model.number="editedSecurity.assetClasses.bondInternational" class="form-control" id="pct-bond-international" name="pct-bond-international" type="number"><span class="d-none d-md-inlines">%</span>
          </div>
      </div>
      <div class="col-12">
        <button type="button" class="btn btn-success btn-lg mr-2 mb-1" data-cy-add-security @click="addSecurity">
          Add security
        </button>
      </div>
    </section>
    <link rel="prefetch" href="edit-remove-buttons.png">
  </div>
</template>

<script>

import securityTemplate from '@/assets/services/object-templates.service';

export default {
  data: function data() {
    return {
      editedSecurity: { ...securityTemplate },
    };
  },
  computed: {
  },
  methods: {
    addEventListeners: function addEventListeners() {
      document.querySelectorAll('#asset-classes input')
        .forEach(el => {
          el.addEventListener('keyup', event => {
            if (event.keyCode === 13) {
              this.addSecurity();
            }
          });
        });

      return this;
    },
    addSecurity: function addSecurity() {
      const self = this;

      this.editedSecurity.symbol = this.editedSecurity.symbol.toUpperCase();
      
      this
        .fillValues()
        .validateNewSecurity()
        .$store.commit('addToPortfolio', this.editedSecurity);

      setTimeout(() => {
        self.resetEditedSecurity();
      }, 100);
    },
    clearPortfolio: function clearPortfolio() {
      this.$store.commit('clearPortfolio');
    },
    /**
     * @description The decision was made to default assetClasses props to ''.  This makes it
     *    easier for the user to enter data (he doesn't have to keep deleting zeroes before
     *    entering the relevant data).  But that introduces string math to the mix: 
     *    5 + '' + 12 === '512' because the first operation coerces the 5 to '5'.  The workaround
     *    is to convert all '' to 0 before doing anything serious with it.
     * @returns {object} this
    */
    fillValues: function ensureAllAssetClassesHaveNonStingValues() {
      for (const key in this.editedSecurity.assetClasses) {
        if (this.editedSecurity.assetClasses.hasOwnProperty(key) && 
          this.editedSecurity.assetClasses[key] === ''
        ) {
          this.editedSecurity.assetClasses[key] = 0;
        }
      }

      return this;
    },
    hideWelcome: function hideWelcome() {
      function pause(seconds) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, seconds * 1000);
        });
      }

      if (this.$store.state.showHomeViewWelcome) {
        pause(15)
          .then(() => {
            const welcomeSection = document.querySelector('#welcome');

            if (welcomeSection) {
              welcomeSection.classList.add('collapsed');
            }

            return pause(5);
          })
          .then(() => {
            this.$store.commit('showHomeViewWelcome', false);
          })
          .catch((err) => {
            console.error(`${err}`);
          });        
      }

      return this;
    },
    removeSecurity: function removeSecurity(index) {
      this.$store.commit('trimPortfolio', index);
    },
    resetEditedSecurity: function resetEditedSecurity() {
      this.editedSecurity = { ...securityTemplate };

      for (const key in this.editedSecurity.assetClasses) {
        if (this.editedSecurity.assetClasses.hasOwnProperty(key)) {
          this.editedSecurity.assetClasses[key] = '';
        }
      }
    },
    validateNewSecurity: function validateNewSecurityProps() {
      console.error('TODO: flesh out validateNewSecurity');

      return this;
    },
  },
  mounted() {
    this
      .addEventListeners()
      .hideWelcome();
  }
};
</script>

<style lang="scss">
  .collapsable {
    overflow: hidden;
    transition: max-height 4s ease-out;
    height: auto;
    max-height: 600px;
  }

  .collapsable.collapsed {
    max-height: 0;
  }

  #symbol {
    text-transform: uppercase;
  }

  // enforce no x scrollbar and whitespace around table
  @media (min-width: 1024px) {
    body {
      overflow-x: hidden;
    }

    #home {
      max-width: calc(100% - 15px);
    }
  }

  .table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(85, 193, 143, 1);
  }

  .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
    background-color: rgba(255, 255, 4, 1);
  }
</style>