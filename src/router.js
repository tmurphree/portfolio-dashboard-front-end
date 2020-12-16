import Vue from 'vue';
import Router from 'vue-router';
import About from './views/about.vue';
import CurrentGraph from './views/graph.vue';
import Help from './views/help.vue';
import Monitored from './views/monitored.vue';
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
  ],
});
