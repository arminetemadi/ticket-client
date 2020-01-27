import { call, put, takeLatest } from 'redux-saga/effects';
import { apiHandle } from '../helpers/apiHandle';
import { UPDATE_REQUESTING, UPDATE_SUCCESS, UPDATE_ERROR, UPDATE_UNSUCCESS } from './constants';
import { SET_USER_INFO } from '../user/constants';
import { con } from '../config/config'

function updateApi(fullname) {
	try {
		const body = {
			fullname: fullname
		};
		
		const endpoint = `${con.url}/users/update-profile`;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `bearer ${JSON.parse(localStorage['token'])}`
			}
		};
		const apiOptions = {
			body: body,
			config: config,
			endpoint: endpoint
		};

		return apiHandle(apiOptions).put();
	} catch (error) {
		console.log(error)
	}
}

function* updateFlow(action) {
	try {
		const { fullname } = action;
		const response = yield call(updateApi, fullname);
		if (response.status === 200) {
			localStorage['user'] = JSON.stringify(response.data.user);
			yield put({ type: UPDATE_SUCCESS, response });
			yield put({ type: SET_USER_INFO, response: response.data.user });
		} else {
			yield put({ type: UPDATE_UNSUCCESS, response });
		}
	} catch (error) {
		yield put({ type: UPDATE_ERROR, error });
	}
}

function* updateWatcher() {
	yield takeLatest(UPDATE_REQUESTING, updateFlow);
}

export default updateWatcher;
