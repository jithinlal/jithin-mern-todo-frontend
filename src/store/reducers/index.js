import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import auth from './auth.reducer';
import todo from './todo.reducer';

export default combineReducers({
	auth,
	todo,
	loadingBar: loadingBarReducer,
});
