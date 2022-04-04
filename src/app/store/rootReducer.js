import { combineReducers } from 'redux';
import authReducer from '../../features/auth/authReducer';
import eventReducer from '../../features/events/eventReducer';
import testReducer from '../../features/sanbox/testReducer';
import modalReducer from '../common/modals/modalReducer';

const rootReducer = combineReducers({
	test: testReducer,
	event: eventReducer,
	modals: modalReducer,
	auth: authReducer
});

export default rootReducer;
