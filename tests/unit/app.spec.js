/* eslint no-undef:'off', no-unused-vars:'off' */

import Vue from 'vue';
import App from '../../src/App.vue';

describe('App.vue', () => {
  it('has the expected top-level properties', () => {
    expect(App).toHaveProperty('data');
    expect(typeof App.data).toBe('function');
  });
});
