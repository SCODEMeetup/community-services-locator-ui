import ReactDOM from 'react-dom';

import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import analyticsPlugin from 'src/analytics/analyticsRouterPlugin';
import routes from 'scenes/routes';

import { ROUTE_CHOOSE_CATEGORY } from 'redux-modules/router/constants';

import App from 'containers/app';

import configureStore from './redux/configureStore';

export const router = createRouter(routes, {
  defaultRoute: ROUTE_CHOOSE_CATEGORY,
});

router.usePlugin(browserPlugin());
router.usePlugin(analyticsPlugin);

export const store = configureStore(router);

const render = Component => {
  router.start(() => {
    ReactDOM.render(Component(store, router), document.getElementById('root'));
  });
};

render(App);

if (module.hot) {
  module.hot.accept('containers/app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('containers/app').default;
    render(NextApp);
  });
}

export default {
  store,
};
