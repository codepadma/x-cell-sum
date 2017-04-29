const { removeChildren, createTH } = require('./dom-util');
const { getLetterRange } = require('./array-util');

class TableView {
  constructor(model) {
    this.model = model;
  }

  init() {
  	this.initDomReferences();
  	this.renderTable();
  }

  initDomReferences() {
  	this.headerRowEle = document.querySelector('THEAD TR');
  }

  renderTable() {
  	this.renderTableHeader();
  	//this.renderTableBody();
  }

  renderTableHeader() {
    removeChildren(this.headerRowEle);
    getLetterRange('A', this.model.numOfCols)
      .map(colLabel => createTH(colLabel))
      .forEach(th => this.headerRowEle.appendChild(th));
  }
}

module.exports = TableView;