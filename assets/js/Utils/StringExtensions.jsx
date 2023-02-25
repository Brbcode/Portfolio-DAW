/* eslint-disable no-extend-native,func-names */
String.prototype.randomChar = function () {
  return this[Math.floor(Math.random() * this.length)];
};
