/* const getRange = function(fromNum, toNum) {
  return Array.from({length: toNum - fromNum + 1},
  	(unused, i) => fromNum + i);
}; */

const getRange = function(fromNum, length) {
  return Array.from({length: length}, 
  	(unused, i) => i + fromNum);
};

const getLetterRange = function(firstLetter = 'A', noOfLetters) {
  const rangeStart = firstLetter.charCodeAt(0);
  return getRange(rangeStart, noOfLetters)
    .map(charCode => String.fromCharCode(charCode));
};

module.exports = {
  getRange: getRange,
  getLetterRange: getLetterRange
};