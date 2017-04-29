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
});