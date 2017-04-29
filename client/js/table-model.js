class TableModel {
  constructor(numOfCols, numOfRows) {
    this.numOfCols = numOfCols;
    this.numOfRows = numOfRows;
    this.data = {};
  }

  getCellId(location) {
    return `${location.col}:${location.row}`;
  }

  getValue(location) {
    return this.data[this.getCellId(location)];
  }

  setValue(location, value) {
    this.data[this.getCellId(location)] = value;
  }
}

module.exports = TableModel;