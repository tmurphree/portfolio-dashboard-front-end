import Vue from 'vue';
import Router from 'vue-router';

import About from './views/about.vue';
import AssetAllocation from './views/asset-allocation.vue';
import CurrentGraph from './views/current-graph.vue';
import CurrentTable from './views/current-table.vue';
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
      path: '/current-graph',
      name: 'current-graph',
      component: CurrentGraph,
    },
    {
      path: '/current-table',
      name: 'current-table',
      component: CurrentTable,
    },
    {
      path: '/help',
      name: 'help',
      component: Help,
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
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    }
  ]
});
