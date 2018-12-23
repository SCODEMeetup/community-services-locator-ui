// request options
export const DELETE = 'DELETE';
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';

export const POSITIVE_INTEGER_PATTERN = '^[0-9]*$';
export const TIME_DAY_OF_WEEK_PATTERN = '^[1-7]?$';
export const TIME_HOURS_PATTERN = '^([01]?\\d|2[0-3])$';
export const TIME_MINUTES_PATTERN = '^[0-5]?\\d$';
export const ZIP_CODE_PATTERN = '(^\\d{5}$)';

export default {
  DELETE,
  GET,
  POST,
  PUT,
  POSITIVE_INTEGER_PATTERN,
  TIME_HOURS_PATTERN,
  TIME_MINUTES_PATTERN,
  ZIP_CODE_PATTERN,
};
