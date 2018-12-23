import {
  LOGIN,
  SEDOKU,
} from 'redux-modules/router/constants';

import Login from './login';
import Sedoku from './sedoku';

export default {
  [LOGIN]: Login,
  [SEDOKU]: Sedoku,
};
