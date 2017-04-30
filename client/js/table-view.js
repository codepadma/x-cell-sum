const { removeChildren, createTH, createTR, createTD } = require('./dom-util');
const { getLetterRange } = require('./array-util');

class TableView {
  constructor(model) {
    this.model = model;
  }

  init() {
  	this.initDomReferences();
    this.initCurrentCell();
  	this.renderTable();
    this.attachEventHandlers();

  }

  initDomReferences() {
  	this.headerRowEle = document.querySelector('THEAD TR');
    this.bodyEle = document.querySelector('TBODY');
    this.formulaBarEle = document.querySelector('#formula-bar');
  }

  renderTable() {
  	this.renderTableHeader();
  	this.renderTableBody();
  }

  initCurrentCell() {
    this.currentCellLocation = { col:0, row:0 };
    this.renderFormulaBar();
  }

  normalizeValueForRendering(value) {
    return value || '';
  }

  renderFormulaBar() {
    const currCellValue = this.model.getValue(this.currentCellLocation);
    this.formulaBarEle.value = this.normalizeValueForRendering(currCellValue);
    this.formulaBarEle.focus(); 
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
        const position = {col:col, row:row};
        const value = this.model.getValue(position);
        const td = createTD(value);
        if(this.isCurrentCell(col, row)) {
          td.className = 'current-cell';
        }
        tr.appendChild(td);
      }
      docFragment.appendChild(tr);
    }
    removeChildren(this.bodyEle);
    this.bodyEle.appendChild(docFragment);
  }

  attachEventHandlers() {
    this.bodyEle.addEventListener('click', this.handleSheetClick.bind(this));
    this.formulaBarEle.addEventListener('keyup', this.handleFormulaBarUpdate.bind(this));
  }

  isCurrentCell(col, row) {
    return this.currentCellLocation.col === col &&
           this.currentCellLocation.row === row;
  }

  changeCellColor(evt) {
    Array.from(document.getElementsByClassName('current-cell'))
      .forEach((td) => td.className = '');
    evt.target.className = 'current-cell';
  }

  handleSheetClick(evt) {
    const col = evt.target.cellIndex;
    const row = evt.target.parentElement.rowIndex -1;
    this.currentCellLocation = { col:col, row:row };
    this.changeCellColor(evt);
    this.renderFormulaBar();
  }

  handleFormulaBarUpdate(evt) {
    console.log(this.currentCellLocation);
    this.model.setValue(this.currentCellLocation, this.formulaBarEle.value);
    this.renderTableBody();
  }
}

module.exports = TableView;