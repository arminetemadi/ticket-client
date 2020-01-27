import { call, put, takeLatest } from 'redux-saga/effects';
import { REGISTER_REQUESTING, REGISTER_SUCCESS, REGISTER_UNSUCCESS, REGISTER_ERROR } from './constants';
import { SUCCESS_IN_REGISTER } from '../login/constants';
import { apiHandle } from '../helpers/apiHandle';
import { push } from 'react-router-redux';
import {con} from '../config/config'

function registerApi(fullname, email, password, password_confirmation) {
	const body = {
		fullname: fullname,
		email: email,
		password: password,
		password_confirmation: password_confirmation
	};
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const endpoint = `${con.url}/register`;

	const apiOptions = {
		body: body,
		config: config,
		endpoint: endpoint
	};

	return apiHandle(apiOptions).post();
}

function* registerFlow(action) {
	try {
		const { fullname, email, password, password_confirmation } = action;
		const response = yield call(registerApi, fullname, email, password, password_confirmation);

		if (response.status === 201) {
			localStorage.clear();
			yield put({ type: REGISTER_SUCCESS, response });
			yield put({ type: SUCCESS_IN_REGISTER, response });
			yield put(push('/login'));
		} else {
			yield put({ type: REGISTER_UNSUCCESS, response });
		}
	} catch (error) {
		yield put({ type: REGISTER_ERROR, error });
	}
}

function* registerWatcher() {
	yield takeLatest(REGISTER_REQUESTING, registerFlow);
}

export default registerWatcher;
