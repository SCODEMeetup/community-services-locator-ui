import {
  compose,
  defaultTo,
  ifElse,
  isEmpty,
  lensPath,
  of,
  set,
  view,
} from 'ramda';

export const getLens = ifElse(
  Array.isArray,
  lensPath,
  compose(
    lensPath,
    of
  )
);
export const createSetter = compose(
  set,
  getLens
);
export const createHandler = key => (state, { payload }) =>
  createSetter(key)(payload, state);

export const createSelector = compose(
  view,
  getLens
);
export const select = (path, state) => createSelector(path)(state);
export const setPath = (path, state, payload) =>
  createHandler(path)(state, { payload });

export const actionTypeIncludes = (action, str) => {
  const type = select('type', action);
  return type ? type.includes(str) : false;
};
const orEmptyObject = defaultTo({});

export const returnActionResult = (
  actionType,
  payload = {},
  meta = {},
  debug = ''
) => ({
  type: actionType,
  payload: orEmptyObject(payload),
  meta: orEmptyObject(meta),
  ...(!isEmpty(debug) ? { debug } : {}),
});

export const createAction = actionType => (payload, meta, debug) =>
  returnActionResult(actionType, payload, meta, debug);

/*
 * -----------------------------------------------------------------------------
 * Reset patients state
 * -----------------------------------------------------------------------------
 * Handles resetting patients to the default state
 */
export const SETSTATE = '@@Set';
export const setstate = createAction(SETSTATE);
export function setHandler(state, { payload, meta }) {
  return setPath(meta.path || meta, state, payload);
}

export const generalActionsMap = {
  [SETSTATE]: setHandler,
};
