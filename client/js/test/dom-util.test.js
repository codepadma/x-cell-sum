const { removeChildren } = require('../dom-util');

describe('dom-util', () => {
  
  it('removes one child', () => {
    const parent = document.createElement('DIV');
    const child = document.createElement('STRONG');

    parent.appendChild(child);

    expect(parent.childNodes.length).toBe(1);
    expect(parent.childNodes[0]).toBe(child);

    removeChildren(parent);
    
    expect(parent.childNodes.length).toBe(0);
  });
});