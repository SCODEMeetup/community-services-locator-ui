import { expect } from 'chai';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  shouldBeAnObject,
  shouldBeFalse,
  shouldBeTrue,
  shouldNotBeEmpty,
} from 'how-the-test-was-won';

import { resetToast, showToast } from 'redux-modules/layout/toast/thunks';

import { clone } from 'ramda';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Layout/Toast Module - Thunks (redux-modules/layout/toast/thunks.js)', () => {
  describe('showToast()', () => {
    const initialState = {
      layout: {
        toast: { show: false },
      },
    };

    it('should dispatch Redux state needed to show the toast', () => {
      const store = mockStore(clone(initialState));
      const callback = () => 42;
      store.dispatch(
        showToast('Toast content.', {
          buttonText: 'Button Text.',
          buttonType: 'buttonType',
          callback,
          timeout: 1000,
        })
      );
      const actions = store.getActions();
      const payload = actions[0].payload;
      shouldNotBeEmpty(payload);
      shouldBeAnObject(payload);
      shouldBeTrue(payload.show);
      shouldBeAnObject(payload.undoData);
      expect(payload.content).to.deep.equal('Toast content.');
      expect(payload.buttonText).to.deep.equal('Button Text.');
      expect(payload.buttonType).to.deep.equal('buttonType');
      expect(payload.undoData.callback).to.deep.equal(callback);
      expect(payload.timeout).to.deep.equal(1000);
    });
  });

  describe('resetToast()', () => {
    const initialState = {
      layout: {
        toast: { show: true },
      },
    };

    it('should dispatch Redux state needed to reset the toast', () => {
      const store = mockStore(clone(initialState));
      store.dispatch(resetToast());
      const actions = store.getActions();
      const payload = actions[0].payload;
      shouldBeFalse(payload);
    });
  });
});
