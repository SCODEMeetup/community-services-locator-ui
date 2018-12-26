import { expect } from 'chai';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { show } from 'redux-modules/layout/toast/paths';

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
      const { payload } = actions[0];
      expect(payload.show).to.deep.equal(true);
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
      expect(actions).to.have.lengthOf(1);
      expect(actions[0].payload).to.deep.equal(false);
      expect(actions[0].meta).to.deep.equal(show);
    });
  });
});
