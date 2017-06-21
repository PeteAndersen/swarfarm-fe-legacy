import { fork } from 'redux-saga/effects';
import { authRootSaga } from './auth';

console.log(authRootSaga)
export const rootSaga = function* () {
    yield [
        fork(authRootSaga),
    ];
}

export { default as auth } from "./auth";
