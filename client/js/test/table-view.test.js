const fs = require('fs');

const TableModel = require('../table-model');
const TableView = require('../table-view');
const fixturePath = './client/js/test/fixtures/sheet-container.html';
describe('table-view', () => {
  beforeEach(() => {
    // load HTML from disk and parse into DOM
    const html = fs.readFileSync(fixturePath, 'utf-8');
    document.documentElement.innerHTML = html;
  });

  describe('table-header', () => {
    it('has valid number of Cols', () => {
    //set-up initial state
      const numOfCols = 5;
      const numOfRows = 10;
      const model = new TableModel(numOfCols, numOfRows);
      const view = new TableView(model);
      view.init();
      // inspect initial state
      let tHeaders = document.querySelectorAll('THEAD TH');
      expect(tHeaders.length).toBe(numOfCols);
      let colLabels = Array.from(tHeaders).map(th => th.textContent);
      expect(colLabels).toEqual(['A', 'B', 'C', 'D', 'E']);
  });
  }); 

  describe('table-foot', () => {

    it('it displays the sum of column values in the table footer', () => {
      //set up initial state
      const numOfCols = 5;
      const numOfRows = 10;
      const model = new TableModel(numOfCols, numOfRows);
      const view = new TableView(model);
      model.setValue({ col:3, row:2 }, '5');
      model.setValue({ col:3, row:3 }, '5');
      model.setValue({ col:3, row:4 }, '45');
      view.init();
      tfoot = document.querySelector('TFOOT');
      expect(tfoot.rows[0].cells[3].textContent).toBe('55');
    });

    it('it displays the correct sum when column includes negative input', () => {
      const model = new TableModel(5, 10);
      const view = new TableView(model);
      model.setValue({ col:3, row:2}, '-5');
      model.setValue({ col:3, row:3 }, '5');
      model.setValue({ col:3, row:4 }, '-1');
      view.init();
      let tfoot = document.querySelector('TFOOT');
      expect(tfoot.rows[0].cells[3].textContent).toBe('-1');
    });

    it('it displays the correct sum when column includes non-number input', () => {
      const model = new TableModel(5, 10);
      const view = new TableView(model);
      model.setValue({ col:3, row:2}, 'non-num');
      model.setValue({ col:3, row:3}, '5');
      model.setValue({ col:3, row:4}, '1');
      view.init();
      let tfoot = document.querySelector('TFOOT');
      expect(tfoot.rows[0].cells[3].textContent).toBe('6');
    });

    it('it highlights the table footer', () => {
      const model = new TableModel(5, 10);
      const view = new TableView(model);
      view.init();
    });
  });

  describe('formula-bar', () => {

    it('makes changes to the value of the current cell', () => {
      // set up initial state
      const model = new TableModel(6, 10);
      const view = new TableView(model);
      view.init();
      // inspect initial state
      let trs = document.querySelectorAll('TBODY TR');
      let td = trs[2].cells[3];
      expect(td.textContent).toBe('');
      // simulate user action
      document.querySelector('#formula-bar').value = '100';
      view.currentCellLocation = { col:3, row:2 };
      view.handleFormulaBarUpdate();
      // inspect final state
      trs = document.querySelectorAll('TBODY TR');
      td = trs[2].cells[3];
      expect(td.textContent).toBe('100');
    });

    it('updates value from the current cell', () => {
      // set up the initial state
      const model = new TableModel(6, 10);
      const view = new TableView(model);
      model.setValue({ col:3, row:2 }, '45');
      view.init();
      // inspect the initial state
      const formulaBarEl = document.querySelector('#formula-bar');
      expect(formulaBarEl.value).toBe('');
      //simulate user action
      trs = document.querySelectorAll('TBODY TR');
      trs[2].cells[3].click();
      //inspect the resulting action
      expect(formulaBarEl.value).toBe('45');
    });
  });

  describe('table-body', () => {

    it('highlights the current cell when clicked', () => {
      // set up the initial state
      const model = new TableModel(6, 10);
      const view = new TableView(model);
      view.init();
      // inspect the initial state
      let trs = document.querySelectorAll('TBODY TR');
      let td = trs[2].cells[3];
      expect(td.className).toBe('');
      //simulate user click
      td.click();
      trs = document.querySelectorAll('TBODY TR');
      td = trs[2].cells[3];
      expect(td.className).not.toBe('');
    });

    it('has the right number of columns', () => {
      //set-up initial state
      const numOfCols = 6;
      const numOfRows = 10;
      const model = new TableModel(numOfCols, numOfRows);
      const view = new TableView(model);
      view.init();
      // inspect initial state
      let ths = document.querySelectorAll('THEAD TH');
      expect(ths.length).toBe(numOfCols);
    });

    it('fills in values from the model', () => {
      //set-up initial state
      const numOfCols = 6;
      const numOfRows = 10;
      const model = new TableModel(numOfCols, numOfRows);
      const view = new TableView(model);
      model.setValue({ col:3, row:2 }, '45');
      view.init();
      //inspect the initial state
      const trs = document.querySelectorAll('TBODY TR');
      expect(trs[2].cells[3].textContent).toBe('45');
    });
  });
});