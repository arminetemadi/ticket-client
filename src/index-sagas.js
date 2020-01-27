import { all } from 'redux-saga/effects';
import RegisterSaga from './register/sagas';
import LoginSaga from './login/sagas'
import ProfileSaga from './profile/sagas'

export default function* IndexSaga() {
	yield all([ RegisterSaga(), LoginSaga(), ProfileSaga() ]);
}
