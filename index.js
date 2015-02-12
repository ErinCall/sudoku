/* jshint node:true */
'use strict';

var _ = require('lodash');

function draw(board) {
  var matrix = generateMatrix(board);
  var drawing = _.reduce(matrix, function(drawing, row, rowNum){
    row = _.map(row, function(x) {
      if (x === null) {
        return ' ';
      } else {
        return x.toString();
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
      result[rowNum].push(null);
    } else {
      result[rowNum].push(parseInt(val));
    }
    return result;
  }, []);
}

module.exports = {
  generateMatrix: generateMatrix,
  draw: draw
};
