const TableModel = require('../table-model');

describe('table-model', () => {
  it('can set and get the value', () => {
    // set up the initial state
    const model = new TableModel();
    const location = { row: 5, col: 3 };

    // inspect initial state
    expect(model.getValue(location)).toBeUndefined();

    // execute code under test
    model.setValue(location, 10);

    // inspect final state
    expect(model.getValue(location)).toBe(10);
  });
});