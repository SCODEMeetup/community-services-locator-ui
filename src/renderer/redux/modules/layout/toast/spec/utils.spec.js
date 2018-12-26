import { expect } from 'chai';

import {
  bugToast,
  componentErrorToast,
} from 'redux-modules/layout/toast/utils';

describe('Layout/Toast Module - Utilities (redux-modules/layout/toast/utils.js)', () => {
  describe('bugToast()', () => {
    it('should return an error message', () => {
      const expected =
        'ERROR: Something went wrong in Map, please save and notify the Scos team';
      const result = bugToast('Map');
      expect(result).to.deep.equal(expected);
    });
  });

  describe('componentErrorToast()', () => {
    it('should return an error message', () => {
      const expected =
        'COMPONENT ERROR: Something went wrong loading Drawer, please notify the Scos team';
      const result = componentErrorToast('Drawer');
      expect(result).to.deep.equal(expected);
    });
  });
});
