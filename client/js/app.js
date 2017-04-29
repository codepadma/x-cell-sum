const TableModel = require('./table-model');
const TableView = require('./table-view');

const model = new TableModel(5, 10);
const view = new TableView(model);
view.init();