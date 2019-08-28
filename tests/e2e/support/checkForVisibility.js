/* eslint no-undef:'off' */

const checkIsHidden = function checkIsHidden(selector) {
  cy
    .get(selector)
    .should('not.be.visible');
};

const checkIsVisible = function checkIsVisible(selector) {
  cy
    .get(selector)
    .should('be.visible');
};

module.exports = {
  checkIsHidden,
  checkIsVisible,
};
