<template>
  <div> 
    <nav class="bg-dark fixed-top navbar navbar-dark p-0 shadow" data-cy-top-bar>
      <span class="col-12 col-md-auto navbar-brand" @click="goHome">Portfolio Dashboard</span>
      <div class="d-flex d-md-none justify-content-around w-100">
        <router-link to="/" class="nav-link top-nav-link d-md-none" data-cy-home exact>Home</router-link>
        <router-link to="/graph" class="nav-link top-nav-link d-md-none" data-cy-graph>Graph</router-link>
        <router-link to="/about" class="nav-link top-nav-link" data-cy-about>About</router-link>
        <router-link to="/help" class="nav-link top-nav-link" data-cy-help>Help</router-link>
      </div>
      <div class="d-none d-md-flex justify-content-end">
        <router-link to="/about" class="nav-link top-nav-link" data-cy-about>About</router-link>
        <router-link to="/help" class="nav-link top-nav-link" data-cy-help>Help</router-link>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <nav class="bg-light col-md-2 d-md-block d-none sidebar" data-cy-sidebar-md role="navigation">
          <div class="px-xl-3 sidebar-sticky">
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Current assets</span>
            </h6>
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link to="/" class="nav-link active">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-home">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  Home<span class="sr-only">(current)</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/current-graph" class="nav-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-bar-chart-2">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                  Graph view
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/monitored" class="nav-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-users">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Monitored securities
                </router-link>
              </li>
            </ul>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>What-if analysis</span>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link to="/trade-simulator" class="nav-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-shopping-cart">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Trade simulator
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
        <main class="col-md-9 col-lg-10 ml-sm-auto mt-4 mt-md-1 mt-lg-3" id="main-element">
          <div class="disclaimer" data-cy-disclaimer>
            <p>
              Do NOT base actual trades on the data from this site.  <router-link to="/about">Find out why.</router-link>
            </p>
          </div>
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {
      goHome() {
        this.$router.push('/');
      },
    },
    mounted() {
      this.$getPrices();
    }
  };
</script>

<style lang="scss">
  .disclaimer {
    color: rgba(255, 0, 0, 1);
    margin-top: 5rem;
  }

  .navbar-brand {
    cursor: pointer;
  }

  // make the sidebar go all the way down
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 48px 0 0;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  }

  .sidebar-sticky {
    position: sticky;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto;
  }

  // add extra top margin on iPhone SE so content isn't cut off
  @media screen and (max-width: 320px) {
    #main-element {
      margin-top: 3rem !important;
    }
  }

  // fix ipad styling
  @media screen and (min-width: 768px) {
    #main-element {
      margin-left: 17% !important;
    }

    .disclaimer {
      margin-top: 3rem;
    }
  }

  .top-nav-link {
    color: rgba(85, 178, 170, 1);
  }

  [data-cy-top-bar] {
    a:hover, .router-link-exact-active {
      color: rgba(255, 244, 58, 1);
    }
  }

  [data-cy-sidebar-md] {
    .router-link-exact-active {
      border: 1px solid;
    }
  }
</style>