export const bugToast = method =>
  `ERROR: Something went wrong in ${method}, please save and notify the Scos team`;
export const componentErrorToast = component =>
  `COMPONENT ERROR: Something went wrong loading ${component}, please notify the Scos team`;

export default {
  bugToast,
  componentErrorToast,
};
