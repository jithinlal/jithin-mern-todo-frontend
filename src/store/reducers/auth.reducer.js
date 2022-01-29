import { LOGIN, REGISTER, LOGOUT } from '../types/auth';

const initialState = {
	token: null,
	uid: null,
	email: null || localStorage.getItem('email'),
	authenticated: false || localStorage.getItem('auth'),
};

export default function auth(state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				...{
					token: action.token,
					uid: action.uid,
					email: action.email,
					authenticated: action.authenticated,
				},
			};
		case REGISTER:
			return {
				...state,
				...{
					token: action.token,
					uid: action.uid,
					email: action.email,
					authenticated: action.authenticated,
				},
			};
		case LOGOUT:
			return {
				...state,
				...{
					token: null,
					uid: null,
					email: null,
					authenticated: false,
				},
			};
		default:
			return state;
	}
}
