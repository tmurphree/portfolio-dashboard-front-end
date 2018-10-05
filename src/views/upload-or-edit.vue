<template>
  <div class="upload-or-edit">
    <section>
      <h1>Welcome to the portfolio dashboard</h1>
      <p>
        I'm assuming you want to dive right in with little to no preamble, but if you want some 
        hand-holding there are pages with <router-link to="/help">instructions</router-link> and 
        <router-link to="/about">overviews</router-link>.
      </p>
      <p>
        Remember: 1) Sell high!  2) Buy low! and 3) Don't invest money you can't afford to lose!
      </p>
    </section>
    <section>
      <h2>Current portfolio:</h2>
      <table class="table table-striped" cy-portfolio-table>
          <thead class="thead-dark">
            <th scope="col">Symbol</th>
            <th scope="col">Friendly name</th>
            <th scope="col">Num shares</th>
            <th scope="col">Value</th>
            <th scope="col">Asset class(es)</th>
          </thead>
          <tbody>
            <tr>
              <td>1111</td>
              <td>2222</td>
              <td>3333</td>
              <td>4444</td>
              <td>5555</td>
            </tr>
            <tr>
              <td>1111</td>
              <td>2222</td>
              <td>3333</td>
              <td>4444</td>
              <td>5555</td>
            </tr>
          </tbody>
        </table>
    </section>
    <section>
      <h2>Upload</h2>

    </section>
    <section>
      <h2>Edit</h2>
      <button class="btn btn-success mr-2 mb-1" data-cy-add-security>Add security</button>
      <button class="btn btn-danger mr-2 mb-1">Clear current portfolio</button>
    </section>
  </div>
</template>