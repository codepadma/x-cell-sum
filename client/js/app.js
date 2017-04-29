const TableModel = require('./table-model');
const TableView = require('./table-view');

const model = new TableModel();
const view = new TableView(model);
view.init();