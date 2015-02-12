/* jshint node:true, jasmine:true, -W079 */
'use strict';

var Set = require('set');
require('../lib/setDifferencePatch');

describe('set difference', function() {
  it('is a left-hand difference', function() {
    var left = new Set([1,2,3]),
        right = new Set([3,4,5]);

    expect(left.difference(right)).toEqual(new Set([1,2]));
  })
})
