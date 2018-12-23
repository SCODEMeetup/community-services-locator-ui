import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { router5Middleware } from 'redux-router5';

import customMiddlewares from './middleware';
import rootReducer from './reducer';

const isDev = process.env.NODE_ENV === 'development';

export default function configureStore(router) {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(
        ...[...customMiddlewares, thunk],
        router5Middleware(router)
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (isDev && module.hot) {
    module.hot.accept('./reducer', () => store.replaceReducer(rootReducer));
  }

  return store;
}
