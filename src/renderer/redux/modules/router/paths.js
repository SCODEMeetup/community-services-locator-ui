export const router = ['router'];

export const route = [...router, 'route'];
export const routeName = [...route, 'name'];
export const routeParams = [...route, 'params'];

export const previousRoute = [...router, 'previousRoute'];
export const previousRouteName = [...previousRoute, 'name'];
export const previousRouteParams = [...previousRoute, 'params'];

export const lastMainRoute = [...router, 'lastMainRoute'];
export const lastMainRouteName = [...router, 'lastMainRoute', 'name'];

export default {
  lastMainRoute,
  lastMainRouteName,
  previousRoute,
  previousRouteName,
  previousRouteParams,
  route,
  router,
  routeName,
  routeParams,
};
