/* jshint node:true, jasmine:true */
'use strict';

var sudoku = require('../index.js');
var simpleBoard = '158 2  6 ' +
                  '2   8  9 ' +
                  ' 3  7 8 2' +
                  ' 6 74    ' +
                  '  4 6 7  ' +
                  '    19 5 ' +
                  '4 9 3  2 ' +
                  ' 2  5   8' +
                  ' 7  9 413';

var simpleMatrix = [
  [1, 5, 8,          null, 2, null,    null, 6, null   ],
  [2, null, null,    null, 8, null,    null, 9, null   ],
  [null, 3, null,    null, 7, null,    8, null, 2      ],
  [null, 6, null,    7, 4, null,       null, null, null],
  [null, null, 4,    null, 6, null,    7, null, null   ],
  [null, null, null, null, 1, 9,       null, 5, null   ],
  [4, null, 9,       null, 3, null,    null, 2, null   ],
  [null, 2, null,    null, 5, null,    null, null, 8   ],
  [null, 7, null,    null, 9, null,    4, 1, 3         ]
];

var simpleDrawn = '+-------+-------+-------+\n' +
                  '| 1 5 8 |   2   |   6   |\n' +
                  '| 2     |   8   |   9   |\n' +
                  '|   3   |   7   | 8   2 |\n' +
                  '+-------+-------+-------+\n' +
                  '|   6   | 7 4   |       |\n' +
                  '|     4 |   6   | 7     |\n' +
                  '|       |   1 9 |   5   |\n' +
                  '+-------+-------+-------+\n' +
                  '| 4   9 |   3   |   2   |\n' +
                  '|   2   |   5   |     8 |\n' +
                  '|   7   |   9   | 4 1 3 |\n' +
                  '+-------+-------+-------+';

describe('draw a puzzle', function() {
  it('draws the puzzle correctly', function() {
    expect(sudoku.draw(simpleBoard)).toEqual(simpleDrawn);
  });
});

describe('generateMatrix', function() {
  it('splits a string into a 3x3 matrix of 3x3 matrices', function() {
    expect(sudoku.generateMatrix(simpleBoard)).toEqual(simpleMatrix);
  });
});
