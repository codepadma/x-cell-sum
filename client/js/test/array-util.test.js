const { getRange, getLetterRange } = require('../array-util');

describe('array-util', () => {

  describe('getRange', () => {
    it('produces a valid range with 0', () => {
      expect(getRange(0, 6)).toEqual([0, 1, 2, 3, 4, 5]);
    });
  
    it('produces a valid range with 1', () => {
      expect(getRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('produces a valid negative range', () => {
      expect(getRange(-10, 4)).toEqual([-10, -9, -8, -7]);
    });
  });

  describe('getLetterRange', () => {
    it('produces single letter starting at G', () => {
      expect(getLetterRange('G', 1)).toEqual(['G']);
    })

    it('produces letter range starting at A', () => {
      expect(getLetterRange('A', 5)).toEqual(['A', 'B', 'C', 'D', 'E']);
    });

    it('produces letter range starting at letter D', () => {
      expect(getLetterRange('D', 3)).toEqual(['D', 'E', 'F']);
    });
  });
})