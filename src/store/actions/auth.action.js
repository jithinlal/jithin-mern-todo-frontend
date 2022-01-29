import { showLoading, hideLoading } from 'react-redux-loading';
import axios from 'axios';
import { LOGIN, REGISTER, LOGOUT } from '../types/auth';

const API = process.env.REACT_APP_API_KEY;

export function login(Email, Password) {
	return async (dispatch, getState) => {
		try {
			dispatch(showLoading());
			const response = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API}`,
				{ email: Email, password: Password, returnSecureToken: true },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);

			const { localId, email, refreshToken } = response.data;

			dispatch(hideLoading());
			await localStorage.setItem('auth', true);
			await localStorage.setItem('email', email);
			await localStorage.setItem('token', refreshToken);
			dispatch({
				type: LOGIN,
				token: refreshToken,
				uid: localId,
				email,
				authenticated: true,
			});
		} catch (error) {
			dispatch(hideLoading());
			console.log(error);
			throw new Error('Could not login at the moment, please try again later.');
		}
	};
}

export function register(Email, Password) {
	return async (dispatch, getState) => {
		try {
			dispatch(showLoading());
			const response = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API}`,
				{ email: Email, password: Password, returnSecureToken: true },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);

			const { refreshToken, localId, email } = response.data;

			dispatch(hideLoading());
			localStorage.setItem('auth', true);
			localStorage.setItem('email', email);
			await localStorage.setItem('token', refreshToken);
			dispatch({
				type: REGISTER,
				token: refreshToken,
				uid: localId,
				email,
				authenticated: true,
			});
		} catch (error) {
			dispatch(hideLoading());
			console.log(error);
			throw new Error(
				'Could not register at the moment, please try again later.',
			);
		}
	};
}

export function logout() {
	return async (dispatch, getState) => {
		try {
			localStorage.removeItem('auth');
			localStorage.removeItem('email');
			await localStorage.removeItem('token');
			dispatch({
				type: LOGOUT,
			});
		} catch (error) {
			dispatch(hideLoading());
			console.log(error);
			throw new Error(
				'Could not logout at the moment, please try again later.',
			);
		}
	};
}
