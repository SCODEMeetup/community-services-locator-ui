export const API_BASE = process.env.API_BASE || 'https://mofb-api.appspot.com';
export const API_PREFIX = '/api';
export const API_URL = API_BASE + API_PREFIX;

// This is all categories in our current dataset
export const CATEGORY_LABELS = {
  566: {
    name: 'Housing and Utility Assistance',
    topBar: 'HOUSING AND UTILITY ASSISTANCE SERVICES',
  },
  565: { name: 'Health Care Services', topBar: 'HEALTH CARE SERVICES' },
  // 561: 'Where to Donate',
  // 832: 'Advocacy, Planning and Professional Development',
  563: {
    name: 'Emergency Food, Clothing, Furniture and Disaster Services',
    topBar: 'EMERGENCY FOOD, CLOTHING, FURNITURE AND DISASTER SERVICES',
  },
  // 562: 'Arts, Education, Employment and Income Support',
  // 560: 'Adult Care and Youth Programs',
  // 568: 'Mental Health and Counseling Resources',
  // 569: 'Seasonal Services',
  // 570: 'Substance Use Disorder and Addiction Issues',
};
