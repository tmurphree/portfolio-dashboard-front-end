import Vue from 'vue';
import Router from 'vue-router';

import About from './views/about.vue';
import AssetAllocation from './views/asset-allocation.vue';
import CurrentGraph from './views/graph.vue';
import Help from './views/help.vue';
import Monitored from './views/monitored.vue';
import TradeSimulator from './views/trade-simulator.vue';
import Home from './views/home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/asset-allocation',
      name: 'asset-allocation',
      component: AssetAllocation,
    },
    {
      path: '/graph',
      name: 'graph',
      component: CurrentGraph,
    },
    {
      path: '/help',
      name: 'help',
      component: Help,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/monitored',
      name: 'monitored',
      component: Monitored,
    },
    {
      path: '/trade-simulator',
      name: 'trade-simulator',
      component: TradeSimulator,
    },
  ],
});
