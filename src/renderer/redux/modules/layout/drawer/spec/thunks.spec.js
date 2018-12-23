import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  shouldBeAnArray,
  shouldBeAnObject,
  shouldBeTrue,
  shouldNotBeEmpty,
} from 'how-the-test-was-won';

import { updateOpenDrawers } from 'redux-modules/layout/drawer/thunks';

import { clone } from 'ramda';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Layout/Drawer Module - Thunks (redux-modules/layout/drawer/thunks.js)', () => {
  describe('updateOpenDrawers()', () => {
    const errorState = {
      layout: {
        drawer: { panelErrors: { workflow: { left: true } } },
        toast: { show: false },
      },
      router: { route: { name: 'workflow' } },
    };

    describe('when the drawer has errors', () => {
      const store = mockStore(clone(errorState));
      store.dispatch(updateOpenDrawers(true, 'left'));
      it('should dispatch Redux state for showing a toast', () => {
        const actions = store.getActions();
        const payload = actions[0].payload;
        const meta = actions[0].meta;

        shouldNotBeEmpty(payload);
        shouldBeAnObject(payload);
        shouldBeTrue(payload.show);
        shouldNotBeEmpty(meta);
        shouldBeAnArray(meta);
      });
    });
  });
});
