/* eslint-disable no-extend-native,func-names */
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};
