<template>
  <div id="home">
    <div class="alert alert-warning" :class="alertClasses" role="alert">
      Some prices didn't update because of API throttling.  Retrying in 1 minute.
      <router-link to="/help">See details.</router-link>
    </div>
    <section class="collapsable row" id="welcome" v-if="this.showHomeViewWelcome">
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
    <section class="row" id="current-portfolio">
      <h2>Current portfolio</h2>
      <p class="d-sm-none">
        Scroll the table to the right or turn the phone on its side if you can't see action buttons.
      </p>
      <small class="col-12 pl-0">
        Prices are updated once a minute.  A word on <router-link to="/about">rounding</router-link>.
        This is a demo site, so at most 5 securities are supported.
      </small>
      <table class="table table-bordered table-hover table-responsive-md table-striped" data-cy="portfolio-table">
          <thead class="thead-dark">
            <th class="d-md-table-cell d-none" scope="col">Symbol</th>
            <th scope="col">Friendly name <span class="d-md-none">(symbol)</span></th>
            <th class="d-md-table-cell d-none" scope="col">Num shares</th>
            <th class="d-md-table-cell d-none" scope="col">Value ($)</th>
            <th scope="col">% of portfolio</th>
            <th scope="col">Asset class(es)</th>
            <th scope="col">Actions</th>
          </thead>
          <tbody>
            <tr v-for="item in this.portfolio">
                <td class="d-md-table-cell d-none">{{ item.symbol }}</td>
                <td>{{ item.friendlyName }} <span class="d-md-none">({{ item.symbol }})</span></td>
                <td class="d-md-table-cell d-none" :data-cy-num-shares-cell="item.symbol">{{ item.numShares }}</td>
                <td class="d-md-table-cell d-none" data-cy="value-cell">
                  {{ item.value.toLocaleString('en-US', { style: 'decimal' }) }}
                </td>
                <td data-cy="pct-of-portfolio-cell">{{ item.pctOfPortfolio }}</td>
                <td>
                  <ul class="m-0 p-0">
                    <li v-for="asset in displayAssetClasses(item.assetClasses)" class="asset-li">
                      {{ asset.toLowerCase() }}
                    </li>
                  </ul>
                </td>
                <td>
                  <template>
                    <button 
                      type="button"
                      class="mr-1"
                      @click="populateEditedSecurity"
                      :data-cy-edit="item.symbol"
                    >
                      Edit
                    </button>
                    <button type="button" @click="removeSecurity(item.symbol)">Remove</button>
                  </template>
                </td>
            </tr>
          </tbody>
        </table>
    </section>
    <section class="row" id="clear-portfolio">
      <button type="button" class="btn btn-danger mr-2 mb-1" data-cy-clear-port @click="clearPortfolio">
        Clear current portfolio
      </button>
    </section>
    <section class="mt-4 row" id="data-entry" v-if="this.showForm">
      <form @submit="handleSubmit">
        <div class="d-flex mx-1 row">
          <div class="col-md-5" id="name-qty">
            <h4>Basic info</h4>
            <div class="form-group form-row">
              <label for="symbol">Symbol <span class="text-red">(required)</span>:</label>
              <input v-model="editedSecurity.symbol" class="form-control" id="symbol" name="symbol" type="text">
            </div>
            <div class="form-group form-row">
              <label for="num-shares"># of shares <span class="text-red">(required)</span>:</label>
              <input v-model.number="editedSecurity.numShares" class="form-control" id="num-shares" name="num-shares" type="number">
            </div>
            <div class="form-group form-row">
              <label for="friendly-name">Friendly name (optional):</label>
              <input v-model="editedSecurity.friendlyName" class="form-control" id="friendly-name" name="friendly-name" type="text">
            </div>
            <div class="form-group form-row">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="checkbox" v-model="editedSecurity.monitored">
                <label for="checkbox" class="form-check-label">This security needs extra monitoring</label>
              </div>
            </div>
            <div class="form-group form-row">
              <small>
                Neither minimum threshold nor maximum threshold can be blank.  Minimum threshold must 
                be &gt;= 0.  Minimum threshold must be &lt;= maximum threshold.  Maximum threshold must
                be &lt;= 100.  You can't save if any of these are false.
              </small>
            </div>
            <div class="form-group form-row">
              <label for="monitored-minimum-pct">Minimum % of portfolio</label>
              <input v-model.number="editedSecurity.monitoredLowerBound" class="form-control" id="monitored-minimum-pct" name="monitored-minimum-pct" type="number"
                :disabled="!(editedSecurity.monitored)"
              >
            </div>
            <div class="form-group form-row">
              <label for="monitored-maximum-pct">Maximum % of portfolio</label>
              <input v-model.number="editedSecurity.monitoredUpperBound" class="form-control" id="monitored-maximum-pct" name="monitored-maximum-pct" type="number"
                :disabled="!(editedSecurity.monitored)"
              >
            </div>
          </div>
          <div class="col-md-5" id="asset-classes">
            <div class="row">
              <h4 class="w-100">Asset classes (%)</h4>
              <p><small>These must add to 100 before you can save.</small></p>
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
        </div> <!-- end div that lets the form move to the side on md -->
        <div class="mx-1 row">
          <button
            class="btn btn-success btn-lg mr-2 mb-1"
            @click="addSecurity"
            data-cy-add-security
            :disabled="disableAddButton"
            type="submit"
          >
            Add security
          </button>
        </div>
      </form>
    </section>
    <section class="mt-2 row" id="api-key-limit-warning" v-else>
      <p>
        API key limitations make five the maximum number of items in the portfolio.  Any more and we'll get 
        API key throttling errors on the back end.
      </p>
      <p>
        The easiest solution is for me to pay for a higher tier of API access to the prices API, but since this
        is a demo site the budget is limited.
      </p>
      <p>
        Please remove one or more securities if you want to add different securities to the portfolio.
      </p>
    </section>
    <link rel="prefetch" href="edit-remove-buttons.png">
  </div>
</template>

<script>
import { mapState } from 'vuex';

import * as isValid from '@/lib/validations/home.validations.js';
import securityFactory from '@/lib/securityFactory';
import expandAssetClassShorthand from '@/mixins/expandAssetClassShorthand.mixin';

const toggle = function toggle(value) {
  return !value;
};

export default {
  mixins: [expandAssetClassShorthand],
  props: { callFrequencyDetected: Boolean },
  data: function data() {
    return {
      alertClasses: {
        'd-none': true,
        fadeInDown: false,
        fadeOutUp: false,
      },
      editedSecurity: { ...securityFactory() },
      showForm: true,
    };
  },
  computed: {
    disableAddButton() {
      const monitoringThresholdsAreValid = (function monitoringThresholdsAreValid(editedSecurity) {
        const lower = editedSecurity.monitoredLowerBound;
        const upper = editedSecurity.monitoredUpperBound;
        
        if (!editedSecurity.monitored) { return true; }

        return lower !== '' &&
          upper !== '' &&
          lower >= 0 &&
          lower <= upper &&
          upper <= 100;
      })(this.editedSecurity);

      const assetClassesSum = Object.values(this.editedSecurity.assetClasses)
        .map(el => isNaN(parseFloat(el)) ? 0 : parseFloat(el))
        .reduce((sum, current) => sum + current, 0);

      const numSharesToFloat = this.editedSecurity.numShares === '' ? 0 : this.editedSecurity.numShares;

      return this.editedSecurity.symbol.length <= 0 ||
        numSharesToFloat <= 0 ||
        assetClassesSum !== 100 ||
        !(monitoringThresholdsAreValid);
    },
    ...mapState(['portfolio', 'showHomeViewWelcome']),
  },
  methods: {
    addEventListeners: function addEventListeners() {
      document.querySelectorAll('form input')
        .forEach(el => {
          el.addEventListener('click', event => {
            // select the text in the input
            event.target.select();
          });
        });

      return this;
    },
    addSecurity: function addSecurity() {
      const isNewSecurity = (function isNewSecurity(portfolio, currentSymbol) {
        return (!(portfolio
          .map((el) => el.symbol)
          .includes(currentSymbol)));
      })(this.portfolio, this.editedSecurity.symbol);

      this.editedSecurity.symbol = this.editedSecurity.symbol.toUpperCase();

      // convert '' to 0 in assetClasses (which can happen if a user just erases
      // the zero)
      Object.keys(this.editedSecurity.assetClasses)
        .forEach((element) => {
          if (this.editedSecurity.assetClasses[element] === '') {
            this.editedSecurity.assetClasses[element] = 0;
          }
        });

      if (this.portfolio.length === 5 && isNewSecurity) {
        this.showForm = false;

        setTimeout(() => {
          this.resetEditedSecurity();
          this.showForm = true;
        }, 15000);
      } else {
        this
          .$store.commit('addToPortfolio', this.editedSecurity);

        setTimeout(() => {
          this.resetEditedSecurity();
          document.querySelector('#symbol').focus();
        }, 100);
      }
    },
    clearPortfolio: function clearPortfolio() {
      this.$store.commit('clearPortfolio');
    },
    displayAssetClasses: function displayAssetClasses(classesObject) {
      if (!(isValid.displayAssetClasses.classesObject(classesObject))) {
        throw new Error('classesObject is not valid');
      }

      return Object.keys(classesObject)
        .filter(el => classesObject[el] !== 0)
        .map(el => `${classesObject[el]}% ${this.expandAssetClassShorthand(el)}`);
    },
    handleSubmit(event) {
      // Do nothing -- the submit button ("Add Security") fires before this.
      // Also, this does not run if the submit button is disabled.
      event.preventDefault();
    },
    hideWelcome: function hideWelcome() {
      const pause = function pause(seconds) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, seconds * 1000);
        });
      }

      if (this.showHomeViewWelcome) {
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
    populateEditedSecurity: function populateEditedSecurity(event) {
      const symbol = event.target.dataset.cyEdit;
      const security = this.portfolio.find((el) => el.symbol === symbol);

      // Can't just this.editedSecurity = { ...security } because that leaves this.editedSecurity.assetClasses
      // pointing to the store, and if we change any prop of this.editedSecurity.assetClasses we change the
      // store immediately.  So we have to go the long way.

      Object.keys(security)
        .forEach((element) => {
          if  (element !== 'assetClasses') {
            this.editedSecurity[element] = security[element];
          }
        });

      Object.keys(security.assetClasses)
        .forEach((element) => {
          this.editedSecurity.assetClasses[element] = security.assetClasses[element];
        });

      this.scrollToForm();
    },
    removeSecurity: function removeSecurity(symbol) {
      if (!(isValid.removeSecurity.symbol(symbol))) {
        throw new Error('symbol is not valid');
      }

      this.$store.commit('trimPortfolio', symbol);
    },
    resetEditedSecurity: function resetEditedSecurity() {
      this.editedSecurity = { ...securityFactory() };
    },
    scrollToForm() {
      const form = document.querySelector('#name-qty');
      const yCoordinate = form.getBoundingClientRect().top + window.pageYOffset - 50;

      window.scrollTo({
        top: yCoordinate,
        behavior: 'smooth'
      });
    }
  },
  watch: {
    callFrequencyDetected: {
      handler() {
        if (this.callFrequencyDetected) {
          // fade in alert div
          this.alertClasses['d-none'] = false;
          this.alertClasses.fadeInDown = true;
  
          setTimeout(() => {
            // fade out alert div
            this.alertClasses.fadeOutUp = true;
            this.alertClasses.fadeInDown = false;
            

            setTimeout(() => {
              // clean up
              this.alertClasses['d-none'] = true;
              this.alertClasses.fadeInDown = false;
              this.alertClasses.fadeOutUp = false;
            }, 6000);
          }, 7000);
        }
      },
    },
  },
  mounted() {
    this
      .addEventListeners()
      .hideWelcome();
  },
  name: 'home'
};
</script>

<style lang="scss">
  // welcome
  .collapsable {
    overflow: hidden;
    transition: max-height 4s ease-out;
    height: auto;
    max-height: 600px;
  }

  .collapsable.collapsed {
    max-height: 0;
  }

  // alert
  // fadeInDown from https://github.com/daneden/animate.css
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .fadeInDown {
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: fadeInDown;
  }

  @keyframes fadeOutUp {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
  }

  .fadeOutUp {
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: fadeOutUp;
  }

  [role="alert"] {
    left: 40px;
    max-width: 70%;
    position: absolute;
    top: 40px;
    z-index: 1050;
  }

  @media (min-width: 768px) {
    [role="alert"] {
      max-width: inherit;
    }
  }

  .text-red {
    color: red;
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

  .asset-li {
    list-style-type: none;
    margin-bottom: 0.5rem;
  }
</style>