import { router5Reducer } from 'redux-router5';
import {
  always,
  clone,
  cond,
  compose,
  equals,
  merge,
  mergeAll,
  nthArg,
  propOr,
  T,
  type,
} from 'ramda';

import { generalActionsMap } from './modules/general';
import connectState from './modules/state';

const getPropOrEmptyString = propOr('');
const emptyObject = always({});
const getPropOrEmptyObjectFunction = propOr(emptyObject);
const secondArgument = nthArg(1);

const typeIs = typeName =>
  compose(
    equals(typeName),
    type,
    nthArg(0)
  );
const applyHandlerByType = cond([
  [typeIs('Object'), merge],
  [T, secondArgument],
]);
export function createReducer(defaultState, ...actionMaps) {
  const actionMap = mergeAll(actionMaps);

  return (state = defaultState, action) => {
    const actionType = getPropOrEmptyString('type', action);
    const actionTypeHandler = getPropOrEmptyObjectFunction(
      actionType,
      actionMap
    );

    return applyHandlerByType(state, actionTypeHandler(state, action));
  };
}

export function reduceReducers(...reducers) {
  return (previous, current) =>
    reducers.reduce((p, r) => r(p, current), previous);
}

// all maps can see our state
const app = createReducer(clone(connectState), {
  ...generalActionsMap,
});

// all of the power of 'combineReducers', without state tree structure side effects
// great for importing reducers from outside our app without messing with our default state
const delegateReducer = (slice, reducer) => (state, action) => {
  state[slice] = reducer(state[slice], action);
  return state;
};

export default reduceReducers(app, delegateReducer('router', router5Reducer));
