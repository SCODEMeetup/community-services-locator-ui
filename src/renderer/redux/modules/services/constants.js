export const API_BASE = process.env.API_BASE || 'https://mofb-api.appspot.com';
export const API_PREFIX = '/api/v2';
export const API_URL = API_BASE + API_PREFIX;

export const FOOD_CAT_ID = '11';
export const TRANSPORTATION_CAT_ID = '139';
export const HOUSING_CAT_ID = '30';

export const CATEGORY_LABELS = {
  [FOOD_CAT_ID]: 'Food',
  [TRANSPORTATION_CAT_ID]: 'Transportation',
  [HOUSING_CAT_ID]: 'Housing',
};
