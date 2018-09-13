import Vue from "vue";
import App from "../../src/App.vue";

describe('App.vue', function() {
  it('has the expected top-level properties', function() {
    expect(App).toHaveProperty('data');
    expect(typeof App.data).toBe('object');
  });
});