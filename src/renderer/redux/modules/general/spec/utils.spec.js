import { expect } from 'chai';

import {
  shouldBeAnObject,
  shouldBeFalse,
  shouldBeTrue,
  testIfExists,
} from 'how-the-test-was-won';

import {
  hasValue,
  mapIndexed,
  normalizeApiUrl,
} from 'redux-modules/general/utils';

describe('General Module - Utilities (redux-modules/general/utils.js)', () => {
  describe('hasValue()', () => {
    describe('given an invalid value', () => {
      const result = hasValue('');
      it('should return false', () => {
        shouldBeFalse(result);
      });
    });
    describe('given an valid value', () => {
      const result = hasValue(0);
      it('should return true', () => {
        shouldBeTrue(result);
      });
    });
  });

  describe('mapIndexed()', () => {
    describe('given a test object', () => {
      const data = {
        a: null,
        b: null,
      };

      const expected = {
        a: 0,
        b: 1,
      };

      const result = mapIndexed((x, i) => i, data);

      testIfExists(result);
      shouldBeAnObject(result);

      it('should return the updated object with indexes', () => {
        expect(result).to.deep.equal(expected);
      });
    });
  });

  describe('normalizeApiUrl', () => {
    global.window = { location: { origin: 'fake-origin' } };
    process.env.REACT_APP_API_BASE_PATH = '/fake-api-base-path';

    describe('given an absolute URL', () => {
      const url = 'https://test.com/stuff';
      const actual = normalizeApiUrl(url);
      it('should return the original url', () => {
        expect(actual).to.equal(url);
      });
    });
    describe('given a relative URL', () => {
      const actual = normalizeApiUrl('/stuff');
      it('should return the adjusted url', () => {
        console.log('actual', actual);
        expect(actual).to.equal('fake-origin/fake-api-base-path/stuff');
      });
    });
  });
});
