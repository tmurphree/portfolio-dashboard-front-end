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
const drawChart = function drawChart() {
  const context = document.querySelector('#current-portfolio').getContext('2d');
  const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

  const pieChart = new Chart(
    context,
    {
      type: 'bar',
      data,
      options: {},
    }
  );
};

export default {
  data: function data() {
    return {};
  },
  mounted() {
    drawChart();
  },
  name: 'graph'
}
</script>

<style lang="scss">

</style>