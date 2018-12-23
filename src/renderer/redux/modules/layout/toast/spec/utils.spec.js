import { expect } from 'chai';

import { shouldBeAString } from 'how-the-test-was-won';

import {
  bugToast,
  componentErrorToast,
} from 'redux-modules/layout/toast/utils';

describe('Layout/Toast Module - Utilities (redux-modules/layout/toast/utils.js)', () => {
  describe('bugToast()', () => {
    it('should return an error message', () => {
      const expected =
        'ERROR: Something went wrong in createWorkflow, please save and notify the Mimic team';

      const result = bugToast('createWorkflow');

      shouldBeAString(result);
      expect(result).to.deep.equal(expected);
    });
  });

  describe('componentErrorToast()', () => {
    it('should return an error message', () => {
      const expected =
        'COMPONENT ERROR: Something went wrong loading CodeEditor, please notify the Mimic team';

      const result = componentErrorToast('CodeEditor');

      shouldBeAString(result);
      expect(result).to.deep.equal(expected);
    });
  });
});
