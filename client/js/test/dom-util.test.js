const { removeChildren,
        createTR,
        createTH,
        createTD } = require('../dom-util');

describe('dom-util', () => {

  describe('DOM create functions', () => {
  	describe('createTH', () => {
      it('produces valid TH element', () => {
        const ele = createTH();
        expect(ele.tagName).toBe('TH');
      });

      it('sets the text of TH element', () => {
      	const text = 'Table Header';
      	const ele = createTH(text);
      	expect(ele.textContent).toBe(text);
      });
    });

    describe('createTR', () => {
      it('produces valid TR element', () => {
        const ele = createTR();
        expect(ele.tagName).toBe('TR');
      });

      it('sets the text of TR element', () => {
      	const text = 'Table Row';
      	const ele = createTR(text);
      	expect(ele.textContent).toBe(text);
      });
    });

    describe('createTD', () => {
      it('produces valid TD element', () => {
        const ele = createTD();
        expect(ele.tagName).toBe('TD');
      });

      it('sets the text of TD element', () => {
      	const text = 'Table Data';
      	const ele = createTD(text);
      	expect(ele.textContent).toBe(text);
      });
    });

  });
  
  describe('remove children', () => {
  
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
});