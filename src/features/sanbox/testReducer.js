import { toast } from 'react-toastify';
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../../app/async/asyncReducer';
import { delay } from '../../app/common/util/util';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export function increment(amount) {
	// return {
	//   type: INCREMENT_COUNTER,
	//   payload: amount
	// };
	return async function (dispatch) {
		dispatch(asyncActionStart());
		try {
			await delay(500);
			dispatch({
				type: INCREMENT_COUNTER,
				payload: amount
			});
			dispatch(asyncActionFinish());
		} catch (error) {
			dispatch(asyncActionError(error));
		}
	};
}
export function decrement(amount) {
	// return {
	// 	type: DECREMENT_COUNTER,
	// 	payload: amount
	// };
	return async function (dispatch) {
		dispatch(asyncActionStart());
		try {
			await delay(500);
			throw 'oops';
			dispatch({
				type: DECREMENT_COUNTER,
				payload: amount
			});
			dispatch(asyncActionFinish());
		} catch (error) {
			dispatch(asyncActionError(error));
			toast.error(error);
		}
	};
}

const initialState = {
	data: 42
};

export default function testReducer(state = initialState, action) {
	switch (action.type) {
		case INCREMENT_COUNTER:
			return {
				...state,
				data: state.data + action.payload
			};
		case DECREMENT_COUNTER:
			return {
				...state,
				data: state.data - action.payload
			};
		default:
			return state;
	}
}
