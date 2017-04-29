const { removeChildren, createTH, createTR, createTD } = require('./dom-util');
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
    this.bodyEle = document.querySelector('TBODY');
  }

  renderTable() {
  	this.renderTableHeader();
  	this.renderTableBody();
  }

  renderTableHeader() {
    removeChildren(this.headerRowEle);
    getLetterRange('A', this.model.numOfCols)
      .map(colLabel => createTH(colLabel))
      .forEach(th => this.headerRowEle.appendChild(th));
  }

  renderTableBody() {
    const docFragment = document.createDocumentFragment();
    for(let row = 0; row < this.model.numOfRows; row++) {
      const tr = createTR();
      for(let col = 0; col < this.model.numOfCols; col++) {
        const td = createTD();
        tr.appendChild(td);
      }
      docFragment.appendChild(tr);
    }
    removeChildren(this.bodyEle);
    this.bodyEle.appendChild(docFragment);
  }
}

module.exports = TableView;