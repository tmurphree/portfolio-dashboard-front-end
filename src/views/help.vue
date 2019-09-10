<template>
  <div id="help">
    <div class="row">
      <h1>Help</h1>
    </div>
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Adding a security</h5>
      </div>
      <div class="card-body">
        <p class="card-text">
          Fill out the required fields on the Home screen and click "Add Security" towards the bottom
          of the page.
        </p>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Editing or removing a security</h5>
      </div>
      <div class="card-body">
        <p class="card-text">
          Click "Edit" or "Delete", as appropriate, on the table on the home screen. 
        </p>
        <img src="edit-remove-buttons.png" alt="Edit and remove buttons">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  // top margin for all cards except first
  .card + .card {
    margin-top: 1rem;
  }
  
  // bottom margin for last card
  .card:last-of-type {
    margin-bottom: 1rem;
  }
</style>
