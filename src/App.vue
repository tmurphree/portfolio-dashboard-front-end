<template>
  <!-- layout partially borrowed from https://getbootstrap.com/docs/4.1/examples/dashboard/  -->
  <div id="app">
      <nav class="navbar navbar-dark bg-dark 
        flex-md-nowrap justify-content-start 
        p-0 shadow"
        data-cy-top-bar
      >
        <div class="navbar-brand col-sm-3">Portfolio Dashboard</div>
        <router-link to="/save" class="nav-link top-nav-link" data-cy-save>Save</router-link>
        <router-link to="/about" class="nav-link top-nav-link" data-cy-about>About</router-link>
        <router-link to="/help" class="nav-link top-nav-link" data-cy-help>Help</router-link>
        <div class="disclaimer" data-cy-disclaimer>Do NOT base actual trades on the data from this site.  This site is UNFIT to be the basis for any real-world trading.</div>
      </nav>

      <div class="container-fluid">
        <div class="row">
          <nav class="col-md-3 d-md-block bg-light sidebar" data-cy-sidebar role="navigation">
            <div class="sidebar-sticky">
                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>Current assets</span>
                </h6>
              <ul class="nav flex-column">
                <li class="nav-item">
                  <router-link to="/upload-or-edit" class="nav-link active">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    Upload or edit current assets <span class="sr-only">(current)</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/current-graph" class="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                    Graph view
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/current-table" class="nav-link"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    Table view
                  </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/monitored" class="nav-link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    Trade simulator
                  </router-link>
                </li>
              </ul>
            </div>
          </nav>
          <div class="col-md-8">
            <router-view/>
          </div>
        </div>
      </div>
    
  </div>


</template>

<script>
  export default {
    data() {
      return {

      };
    }
  };
</script>

<style lang="scss">
  .disclaimer {
    color:rgb(255, 0, 0);
  }

  .top-nav-link {
    color: #12ead6;
  }

  .sidebar {
    overflow: hidden;
  }

  @media (min-width: 768px) { 
    .sidebar {
      height: calc(100vh - 40px);
    }
  }
</style>