import {
	UPDATE_REQUESTING,
	UPDATE_SUCCESS,
	UPDATE_ERROR,
	UPDATE_UNSUCCESS
} from './constants';

const initialState = {
	requesting: false,
	successful: false,
	messages: [],
	errors: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_REQUESTING:
			return {
				requesting: true,
				successful: false,
				messages: [],
				errors: []
			};
		case UPDATE_SUCCESS:
			return {
				requesting: false,
				successful: true,
				messages: [
					{
						body: 'Updated successfully.'
					}
				],
				errors: []
			};
		case UPDATE_UNSUCCESS:
			return {
				requesting: false,
				successful: false,
				messages: [
					{
						body: `${action.response.data.msg}`
					}
				],
				errors: []
			};
		case UPDATE_ERROR:
			return {
				requesting: false,
				successful: false,
				messages: [
					{
						body: `${action.error.response.data.message}`
					}
				],
			};

		default:
			return initialState;
	}
};
