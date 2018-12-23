import { root } from '../paths';

export const drawer = [...root, 'drawer'];
export const openDrawers = [...drawer, 'openDrawers'];
export const sidesByRoute = [...drawer, 'sidesByRoute'];

export default {
  drawer,
  openDrawers,
  sidesByRoute,
};
