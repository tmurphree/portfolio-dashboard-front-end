<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h1>Graph</h1>
        <small class="col-12 pl-0">
          Prices are updated once a minute.  A word on <router-link to="/about">rounding</router-link>.
        </small>
      </div>
    </div>
    <div class="row"> 
      <div class="col-12">
        <canvas id="current-portfolio"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

</style>