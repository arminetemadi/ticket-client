import { history } from '../history';
import { store } from '../index';
import { logoutSuccessful } from '../login/actions';
import { unsetUserInfo } from '../user/actions';

export const logoutHandle = () => {
	localStorage.clear();
	store.dispatch(unsetUserInfo());
	store.dispatch(logoutSuccessful('Successful LogOut'));
	history.push('/');
};
