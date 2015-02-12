/* jshint node:true, jasmine:true, -W079 */
'use strict';

var Set = require('set');
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

var any = new Set([1,2,3,4,5,6,7,8,9]);

var simpleMatrix = [
  [1, 5, 8,       any, 2, any,  any, 6, any  ],
  [2, any, any,   any, 8, any,  any, 9, any  ],
  [any, 3, any,   any, 7, any,  8, any, 2    ],

  [any, 6, any,   7, 4, any,    any, any, any],
  [any, any, 4,   any, 6, any,  7, any, any  ],
  [any, any, any, any, 1, 9,    any, 5, any  ],

  [4, any, 9,     any, 3, any,  any, 2, any  ],
  [any, 2, any,   any, 5, any,  any, any, 8  ],
  [any, 7, any,   any, 9, any,  4, 1, 3      ]
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
