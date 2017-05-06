const { removeChildren,
        createTR,
        createTH,
        createTD } = require('../dom-util');

describe('dom-util', () => {

  describe('DOM create functions', () => {
    describe('createTH', () => {
      it('produces valid TH element', () => {
        const el = createTH();
        expect(el.tagName).toBe('TH');
      });

      it('sets the text of TH element', () => {
        const text = 'Table Header';
        const el = createTH(text);
        expect(el.textContent).toBe(text);
      });
    });

    describe('createTR', () => {
      it('produces valid TR element', () => {
        const el = createTR();
        expect(el.tagName).toBe('TR');
      });

      it('sets the text of TR element', () => {
        const text = 'Table Row';
        const el = createTR(text);
        expect(el.textContent).toBe(text);
      });
    });

    describe('createTD', () => {
      it('produces valid TD element', () => {
        const el = createTD();
        expect(el.tagName).toBe('TD');
      });

      it('sets the text of TD element', () => {
        const text = 'Table Data';
        const el = createTD(text);
        expect(el.textContent).toBe(text);
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