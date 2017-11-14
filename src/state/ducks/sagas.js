import { all, spawn } from 'redux-saga/effects';

import { authRootSaga } from './auth';
import { newsRootSaga } from './news';
import { bestiaryRootSaga } from './bestiary';

export default function*() {
  yield all([spawn(authRootSaga), spawn(newsRootSaga), spawn(bestiaryRootSaga)]);
}
