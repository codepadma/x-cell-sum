const removeChildren = function(parentEl) {
  while(parentEl.firstChild) {
    parentEl.removeChild(parentEl.firstChild);
  }
};

const createEl = function(tagName) {
  return function(text) {
    const el = document.createElement(tagName);
    if (text) {
      el.textContent = text;
    }
    return el;
  }
};

const getTableRows = function() {
  return Array.from(document.querySelectorAll('TBODY TR'));
}

const createTR = createEl('TR');
const createTH = createEl('TH');
const createTD = createEl('TD');

module.exports = {
  removeChildren: removeChildren,
  createTR: createTR,
  createTH: createTH,
  createTD: createTD,
  getTableRows: getRowsFromTable
}