<template>
  <!-- layout partially borrowed from https://getbootstrap.com/docs/4.1/examples/dashboard/  -->
  <div id="app">
      <nav class="navbar navbar-dark bg-dark 
        flex-md-nowrap justify-content-start 
        p-0 shadow"
      >
        <div class="navbar-brand col-sm-3">Portfolio Dashboard</div>
        <router-link class="nav-link" to="/save" data-cy-save>Save</router-link>
        <router-link class="nav-link" to="/about" data-cy-about>About</router-link>
        <router-link class="nav-link" to="/help" data-cy-help>Help</router-link>
      </nav>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
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

</style>