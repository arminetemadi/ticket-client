import { REGISTER_REQUESTING } from './constants';

export const registerRequesting = ({ fullname, email, password, password_confirmation }) => ({
	type: REGISTER_REQUESTING,
	fullname,
	email,
	password,
	password_confirmation
});
