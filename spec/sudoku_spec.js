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
var solvedMatrix = [
  [1, 5, 8,  9, 2, 4,  3, 6, 7 ],
  [2, 4, 7,  6, 8, 3,  1, 9, 5 ],
  [9, 3, 6,  1, 7, 5,  8, 4, 2 ],

  [5, 6, 1,  7, 4, 8,  2, 3, 9 ],
  [3, 9, 4,  5, 6, 2,  7, 8, 1 ],
  [7, 8, 2,  3, 1, 9,  6, 5, 4 ],

  [4, 1, 9,  8, 3, 7,  5, 2, 6 ],
  [6, 2, 3,  4, 5, 1,  9, 7, 8 ],
  [8, 7, 5,  2, 9, 6,  4, 1, 3 ]
];

var simpleMatrix = [
  [1, 5, 8,       any, 2, any,    any, 6, any  ],
  [2, any, any,   any, 8, any,    any, 9, any  ],
  [any, 3, any,   any, 7, any,    8, any, 2    ],

  [any, 6, any,   7, 4, any,      any, any, any],
  [any, any, 4,   any, 6, any,    7, any, any  ],
  [any, any, any, any, 1, 9,      any, 5, any  ],

  [4, any, 9,     any, 3, any,    any, 2, any  ],
  [any, 2, any,   any, 5, any,    any, any, 8  ],
  [any, 7, any,   any, 9, any,    4, 1, 3      ]
];

var simpleColumns = [
  [1, 2, any,     any, any, any,  4, any, any  ],
  [5, any, 3,     6, any, any,    any, 2, 7    ],
  [8, any, any,   any, 4, any,    9, any, any  ],

  [any, any, any, 7, any, any,    any, any, any],
  [2, 8, 7,       4, 6, 1,        3, 5, 9      ],
  [any, any, any, any, any, 9,    any, any, any],

  [any, any, 8,   any, 7, any,    any, any, 4  ],
  [6, 9, any,     any, any, 5,    2, any, 1    ],
  [any, any, 2,   any, any, any,  any, 8, 3    ]
];

var simpleGroups = [
  [1, 5, 8,        2, any, any,  any, 3, any   ],
  [any, 2, any,    any, 8, any,  any, 7, any   ],
  [any, 6, any,    any, 9, any,  8, any, 2     ],

  [any, 6, any,    any, any, 4,  any, any, any ],
  [7, 4, any,      any, 6, any,  any, 1, 9     ],
  [any, any, any,  7, any, any,  any, 5, any   ],

  [4, any, 9,      any, 2, any,  any, 7, any   ],
  [any, 3, any,    any, 5, any,  any, 9, any   ],
  [any, 2, any,    any, any, 8,  4, 1, 3       ]
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
  it('draws a string representation', function() {
    expect(sudoku.draw(simpleBoard)).toEqual(simpleDrawn);
  });

  it('draws a matrix representation', function() {
    expect(sudoku.draw(simpleMatrix)).toEqual(simpleDrawn);
  });
});

describe('generateMatrix', function() {
  it('splits a string into a 3x3 matrix of 3x3 matrices', function() {
    expect(sudoku.generateMatrix(simpleBoard)).toEqual(simpleMatrix);
  });
});

describe('solve', function() {
  it('solves the board', function() {
    expect(sudoku.draw(sudoku.solve(simpleMatrix))).toEqual(sudoku.draw(solvedMatrix));
  });
});

describe('applyRestrictions', function() {
  it('reduces the options available', function() {
    var row = [1, 5, 8, any, 2, any, any, 6, any],
        restrictedOptions = new Set([3, 4, 7, 9]),
        restrictedRow = [
          1,
          5,
          8,
          restrictedOptions,
          2,
          restrictedOptions,
          restrictedOptions,
          6,
          restrictedOptions
        ];

    expect(sudoku.applyRestrictions(row)).toEqual(restrictedRow);
  });

  it('turns single-element sets into raw numbers', function() {
    var row = [
                1,               5, 8,
                new Set([7, 8]), 2, new Set([6, 4]),
                new Set([6, 3]), 6, new Set([1, 8, 9])
              ];
    expect(sudoku.applyRestrictions(row)).toEqual([
                1, 5, 8,
                7, 2, 4,
                3, 6, 9
              ]);
  })
});

describe('columns', function() {
  it('rotates the matrix 90 degrees', function() {
    expect(sudoku.columns(simpleMatrix)).toEqual(simpleColumns);
  });

  it('reverses itself', function() {
    expect(sudoku.columns(simpleColumns)).toEqual(simpleMatrix);
  });
});

describe('groups', function() {
  it('finds the sub-squares of the matrix', function() {
    expect(sudoku.draw(sudoku.groups(simpleMatrix))).toEqual(sudoku.draw(simpleGroups));
  });

  it('reverses itself', function() {
    expect(sudoku.groups(simpleGroups)).toEqual(simpleMatrix);
  });
});

describe('matricesEqual', function() {
  it('identifies identical matrices', function() {
    expect(sudoku.matricesEqual(simpleMatrix, simpleMatrix)).toBe(true);
  });

  it('detects changing a set to a number', function() {
    var otherMatrix = simpleMatrix.map(function(row) {return row.slice(0);});
    otherMatrix[2][0] = 9;
    expect(sudoku.matricesEqual(otherMatrix, simpleMatrix)).toBe(false);
  });

  it('detects changing the contents of a set', function() {
    var otherMatrix = simpleMatrix.map(function(row) {return row.slice(0);});
    otherMatrix[2][0] = new Set([6,9]);
    expect(sudoku.matricesEqual(otherMatrix, simpleMatrix)).toBe(false);
  });
});
