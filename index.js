/* jshint node:true, -W079 */
'use strict';

var Set = require('set');
require('./lib/setDifferencePatch')
var _ = require('lodash');

function any() {
  return new Set([1,2,3,4,5,6,7,8,9]);
}

function draw(board) {
  var matrix;
  if (typeof board === 'string') {
    matrix = generateMatrix(board);
  } else {
    matrix = board;
  }
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

function columns(matrix) {
  var emptyMatrix = [[],[],[], [],[],[], [],[],[],];
  return _.reduce(matrix, function(newMatrix, row, rowNum) {
    row.forEach(function(cell, column) {
      newMatrix[column][rowNum] = cell;
    });
    return newMatrix;
  }, emptyMatrix);
}

function groups(matrix) {
  var groupMatrix = [[],[],[], [],[],[], [],[],[],];
  var groupPosition;
  for (var group = 0; group < 9; group++) {
    var startRow = Math.floor(group/3) * 3;
    groupPosition = 0;
    for (var row = startRow; row < startRow + 3; row++) {
      var startColumn = (group % 3) * 3;
      for (var column = startColumn; column < startColumn + 3; column++) {
        groupMatrix[group][groupPosition] = matrix[row][column];
        groupPosition++;
      }
    }
  }

  return groupMatrix;
}

function applyRestrictions(row) {
  var isNum = function(x) {return typeof x === 'number';};
  var restrictions = new Set(_.filter(row, isNum));
  return row.map(function(cell) {
    if (isNum(cell)) {
      return cell;
    } else {
      var updated = cell.difference(restrictions);
      if (updated.size() === 1) {
        return parseInt(updated.get()[0]);
      } else {
        return updated;
      }
    }
  });
}

function matricesEqual(left, right) {
  var cellsEqual,
      leftCell,
      rightCell;
  for (var row = 0; row < left.length; row++) {
    for (var col = 0; col < left[row].length; col++) {
      leftCell = left[row][col],
      rightCell = right[row][col];

      if (typeof leftCell === 'number') {
        cellsEqual = leftCell === rightCell;
      } else if (typeof rightCell === 'number') {
        cellsEqual = false;
      } else {
        leftCell = leftCell.get();
        leftCell.sort();
        rightCell = rightCell.get();
        rightCell.sort();
        cellsEqual = _.isEqual(leftCell, rightCell);
      }

      if (! cellsEqual) {
        return false;
      }
    }
  }

  return true;
}

function solve(matrix) {
  var changedAnything = true;
  while(changedAnything) {
    var updated;
    changedAnything = false;

    updated = matrix.map(applyRestrictions);
    updated = columns(columns(updated).map(applyRestrictions));
    updated = groups(groups(updated).map(applyRestrictions));

    if (! matricesEqual(matrix, updated)) {
      changedAnything = true;
    }
    matrix = updated;
  }
  return matrix;
}

module.exports = {
  solve: solve,
  generateMatrix: generateMatrix,
  applyRestrictions: applyRestrictions,
  columns: columns,
  groups: groups,
  matricesEqual: matricesEqual,
  draw: draw
};
