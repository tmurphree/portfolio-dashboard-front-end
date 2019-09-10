import Vue from 'vue';
import App from './App.vue';
import getPrices from './plugins/getPrices.plugin';
import router from './router';
import store from './store';

Vue.use(getPrices);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
