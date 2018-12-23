import React from 'react';
import { RouterProvider } from 'react-router5';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import Layout from 'containers/layout';

import './fonts/ProximaNova/stylesheet.scss';
import './fonts/MaterialIcons/stylesheet.scss';

export default (store, router) => (
  <AppContainer>
    <Provider store={store}>
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
    </Provider>
  </AppContainer>
);
