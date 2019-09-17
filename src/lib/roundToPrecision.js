
/**
 * @description Round to a specific presision.
 * @param {number} x The value to round.
 * @param {number} precision The precison to round to in
 * @returns {undefined}
 * @example
 * // round to the nearest 10th
 * // 3.14
 * roundToPrecision(3.14159, 0.01);
*/
const roundToPrecision = function roundToPrecision(x, precision) {
  const y = +x + (precision === undefined ? 0.5 : precision / 2);
  return y - (y % (precision === undefined ? 1 : +precision));
};

export default roundToPrecision;
