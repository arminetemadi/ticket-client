import { UPDATE_REQUESTING } from './constants'

export const updateRequesting = ({ fullname }) => ({
	type: UPDATE_REQUESTING,
	fullname
});
