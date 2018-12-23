import { expect } from 'chai';

import {
  shouldBeABoolean,
  shouldBeAFunction,
  shouldBeAnObject,
  shouldBeFalse,
  shouldBeTrue,
  shouldNotBeNull,
  shouldNotBeUndefined,
  testIfExists,
} from 'how-the-test-was-won';

import { map } from 'ramda';

import {
  actionTypeIncludes,
  generalActionsMap,
  SETSTATE,
  setstate,
  setHandler,
  setPath,
} from '../index';

// This  tests a few things:
//
// We make sure that the fetchError and fetchSuccess functions are indeed
// creating the action type we are expecting. actionTest(creator, type) assures this
//
// We are checking that state is not being updated - as long as no other reducer piece
// uses the '@@fetchSuccess/...' or '@fetchError/..' strings, we know that our overall
// state will not be modified.
//
// actionTest also checks that fetchError is indeed creating an error message

describe('Users Redux Module (redux-modules/general/index.js)', () => {
  describe('setPath()', () => {
    describe('given the function was called without params', () => {
      const result = setPath();

      testIfExists(result);
      shouldBeAnObject(result);

      it('should return an undefined object', () => {
        expect(result).to.deep.equal({ undefined });
      });
    });

    describe('given the function was called with params', () => {
      const expected = {
        otherState: {
          data: false,
        },
        parent: {
          payload: {
            data: true,
          },
        },
      };
      const result = setPath(
        ['parent'],
        {
          otherState: {
            data: false,
          },
        },
        expected.parent
      );

      testIfExists(result);
      shouldBeAnObject(result);

      it('should return an undefined object', () => {
        expect(result).to.deep.equal(expected);
      });
    });
  });

  describe('actionTypeIncludes()', () => {
    describe('given the function is called with action and test string that should be accepted', () => {
      const result = actionTypeIncludes(
        {
          type: 'actionType',
        },
        'actionType'
      );

      testIfExists(result);
      shouldBeABoolean(result);
      shouldBeTrue(result);
    });

    describe('given the function is called with action and test string that should be rejected', () => {
      const result = actionTypeIncludes(
        {
          type: 'actionType',
        },
        'aDifferentStringToTestWith'
      );

      shouldNotBeNull(result);
      shouldNotBeUndefined(result);
      shouldBeABoolean(result);
      shouldBeFalse(result);
    });

    describe('given the function is called with no action type', () => {
      const result = actionTypeIncludes(
        {
          objectHasNo: 'aString',
        },
        'actionTye'
      );

      shouldNotBeNull(result);
      shouldNotBeUndefined(result);
      shouldBeABoolean(result);
      shouldBeFalse(result);
    });
  });

  describe('set', () => {
    describe('should return a createAction function', () => {
      testIfExists(setstate);
      shouldBeAFunction(setstate);
    });
  });

  describe('setHandler()', () => {
    describe('given the proper params', () => {
      testIfExists(setHandler);
      shouldBeAFunction(setHandler);

      const expected = {
        a: {
          path: {
            data: true,
          },
        },
      };

      const result = setHandler(
        {},
        {
          payload: {
            data: true,
          },
          meta: {
            path: ['a', 'path'],
          },
        }
      );

      it('should set the values in the passed state', () => {
        expect(result).to.deep.equal(expected);
      });
    });

    describe('given no path, but meta is path array', () => {
      testIfExists(setHandler);
      shouldBeAFunction(setHandler);

      const expected = {
        a: {
          path: {
            data: true,
          },
        },
      };

      const result = setHandler(
        {},
        {
          payload: {
            data: true,
          },
          meta: ['a', 'path'],
        }
      );

      it('should set the values in the passed state', () => {
        expect(result).to.deep.equal(expected);
      });
    });
  });

  describe('generalActionsMap', () => {
    describe('should return an object of action handlers', () => {
      testIfExists(generalActionsMap);
      shouldBeAnObject(generalActionsMap);
      map(x => {
        shouldBeAFunction(x);
      }, generalActionsMap);
    });
  });

  describe('setPath()', () => {
    describe('given the function was called without params', () => {
      const result = setPath();

      testIfExists(result);
      shouldBeAnObject(result);

      it('should return an undefined object', () => {
        expect(result).to.deep.equal({ undefined });
      });
    });

    describe('given the function was called with params', () => {
      const expected = {
        otherState: {
          data: false,
        },
        parent: {
          payload: {
            data: true,
          },
        },
      };
      const result = setPath(
        ['parent'],
        {
          otherState: {
            data: false,
          },
        },
        expected.parent
      );

      testIfExists(result);
      shouldBeAnObject(result);

      it('should return an undefined object', () => {
        expect(result).to.deep.equal(expected);
      });
    });
  });

  describe('SET', () => {
    const result = setPath();

    testIfExists(SETSTATE);
    shouldNotBeUndefined(SETSTATE);
    shouldBeAnObject(result);

    it('should return an undefined object', () => {
      expect(result).to.deep.equal({ undefined });
    });
  });
});
