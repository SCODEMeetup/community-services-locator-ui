import { root } from '../paths';

export const toast = [...root, 'toast'];
export const content = [...toast, 'content'];
export const data = [...toast, 'actionData'];
export const show = [...toast, 'show'];

export default {
  data,
  show,
  toast,
  content,
};
