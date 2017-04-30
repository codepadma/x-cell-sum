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