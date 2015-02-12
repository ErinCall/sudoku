/* jshint node:true, -W079 */
'use strict';

var Set = require('set');
var _ = require('lodash');

function draw(board) {
  var matrix = generateMatrix(board);
  var drawing = _.reduce(matrix, function(drawing, row, rowNum){
    row = _.map(row, function(x) {
      if (typeof x === "number") {
        return x.toString();
      } else {
        return ' ';
      }
    });
    for (var i = 0; i <= 12; i+=4) {
      row.splice(i, 0, '|');
    }
    drawing.push(row.join(' '));
    return drawing;
  }, []);

  for (var i = 0; i <= 12; i += 4) {
    drawing.splice(i, 0, '+-------+-------+-------+');
  }

  return drawing.join('\n');
}

function generateMatrix(board) {
  var vals = board.split('');

  return _.reduce(vals, function(result, val, index) {
    var rowNum = Math.floor(index / 9);
    if (result[rowNum] === undefined) {
      result[rowNum] = [];
    }
    if (val === ' ') {
      result[rowNum].push(any());
    } else {
      result[rowNum].push(parseInt(val));
    }
    return result;
  }, []);
}

function any() {
  return new Set([1,2,3,4,5,6,7,8,9]);
}

module.exports = {
  generateMatrix: generateMatrix,
  draw: draw
};
