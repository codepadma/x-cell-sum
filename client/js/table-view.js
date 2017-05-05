const { removeChildren, createTH, createTR, createTD, getTableRows } = require('./dom-util');
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
    this.headerRowEl = document.querySelector('THEAD TR');
    this.bodyEl = document.querySelector('TBODY');
    this.formulaBarEl = document.querySelector('#formula-bar');
    this.footEl = document.querySelector('TFOOT');
  }

  renderTable() {
    this.renderTableHeader();
    this.renderTableBody();
    this.renderTableFoot();
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
    this.formulaBarEl.value = this.normalizeValueForRendering(currCellValue);
    this.formulaBarEl.focus(); 
  }

  renderTableHeader() {
    removeChildren(this.headerRowEl);
    getLetterRange('A', this.model.numOfCols)
      .map(colLabel => createTH(colLabel))
      .forEach(th => this.headerRowEl.appendChild(th));
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
    removeChildren(this.bodyEl);
    this.bodyEl.appendChild(docFragment);
  }

  renderTableFoot() {
    removeChildren(this.footEl);
    const docFragment = document.createDocumentFragment();
    const tr = createTR();
    for(let col = 0; col < this.model.numOfCols; col++) {
      const colVals = this.fetchColumnVals.bind(this, col);
      let sum = '';
      if (colVals().length > 0) {
        sum = this.computeColumnSum(colVals()); 
      }
      const td = createTD(sum.toString());
      tr.appendChild(td);
    }
    docFragment.appendChild(tr);
    this.footEl.appendChild(docFragment);
    this.setFootColor();
  }

  fetchColumnVals(colIndex) {
    return getTableRows()
      .map((tr) => {
        const cellVal = parseInt(tr.cells[colIndex].textContent, 10); 
        return this.validateColumnVals(cellVal);
      })
      .filter((cellVal) => cellVal !== '');
  }

  validateColumnVals(cellVal) {
    return (!Number.isNaN(cellVal)) ? cellVal : '';
  }

  computeColumnSum(colVals) {
    return colVals.reduce((sum, cellVal) => sum + cellVal);
  }

  setFootColor() {
    this.footEl.className = 'highlight-foot';
  }

  attachEventHandlers() {
    this.bodyEl.addEventListener('click', this.handleSheetClick.bind(this));
    this.formulaBarEl.addEventListener('keyup', this.handleFormulaBarUpdate.bind(this));
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
    this.model.setValue(this.currentCellLocation, this.formulaBarEl.value);
    this.renderTableBody();
    this.renderTableFoot();
  }
}

module.exports = TableView;