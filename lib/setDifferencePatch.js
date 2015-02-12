/* jshint node:true, -W079 */
'use strict';

var Set = require('set');
var _ = require('lodash');

Set.prototype.difference = function(other) {
  return _.reduce(this.get(), function(accum, element) {
    if (!other.contains(element)) {
      accum.add(element);
    }
    return accum;
  }, new Set([]));
};
