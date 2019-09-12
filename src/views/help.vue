<template>
  <div id="help">
    <div class="row">
      <h1>Help</h1>
    </div>
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">
          Values and percentages don't update.
        </h5>
      </div>
      <div class="card-body">
        <p class="card-text" data-cy="help-text">
          Probably, someone else is looking at the site.  This is causing the app to exceed the rate limit
          on the pricing API.  Adding UX for this is already in the backlog.
        </p>
        <p class="card-text" data-cy="help-text">
          This is a demo application, and as such I have a limited budget for it.  I'm using the free tier
          of the API that provides prices, and that limits me to 5 prices / minute.  Everything will 
          update after a while.
        </p>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">
          After editing a security, my values and percentages didn't automatically update.  I had to wait for that to happen.
        </h5>
      </div>
      <div class="card-body">
        <p class="card-text" data-cy="help-text">
          Ideally the value of a holding would update on edit.  But this is a demo application, and as
          such I have a limited budget for it.  I'm using the free tier of the API that provides prices, and
          that limits me to 5 prices / minute.  Everything will update after a while.
        </p>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Adding a security</h5>
      </div>
      <div class="card-body">
        <p class="card-text" data-cy="help-text">
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
        <p class="card-text" data-cy="help-text">
          Click "Edit" or "Delete", as appropriate, on the table on the home screen. 
        </p>
        <img src="edit-remove-buttons.png" alt="Edit and remove buttons">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function data() {
    return {};
  },
  name: 'help'
}
</script>

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
