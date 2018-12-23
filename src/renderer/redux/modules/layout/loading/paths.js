import { root } from '../paths';

export const loading = [...root, 'loading'];
export const fetchLoadingCount = [...loading, 'fetchLoadingCount'];
export const fetchUrl = [...loading, 'fetchUrl'];
export const loadingType = [...loading, 'loadingType'];
export const showLoading = [...loading, 'showLoading'];

export default {
  fetchLoadingCount,
  fetchUrl,
  loading,
  loadingType,
  showLoading,
};
