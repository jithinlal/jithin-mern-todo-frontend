import { showLoading, hideLoading } from 'react-redux-loading';
import axios from 'axios';
import { ADD_TODO, REMOVE_TODO, SHOW_TODOS, UPDATE_TODO } from '../types/todo';

const API = `${process.env.REACT_APP_API_ENDPOINT}/api/todo`;

export function showTodos() {
	return async (dispatch, getState) => {
		try {
			const token = getState().auth.token ?? localStorage.getItem('token');
			dispatch(showLoading());
			const response = await axios.get(`${API}`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			});

			const { todos } = response.data;
			dispatch({
				type: SHOW_TODOS,
				todos: todos,
			});
			dispatch(hideLoading());
		} catch (error) {
			dispatch(hideLoading());
			console.log(error);
			throw new Error(
				'Could not load todos at the moment, please try again later.',
			);
		}
	};
}

export function addTodo(todoItem) {
	return async (dispatch, getState) => {
		try {
			dispatch(showLoading());
			const token = getState().auth.token ?? localStorage.getItem('token');
			const response = await axios.post(
				`${API}/`,
				{ todo: todoItem },
				{
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${token}`,
					},
				},
			);

			const { todo } = response.data;
			dispatch({
				type: ADD_TODO,
				todo,
			});
			dispatch(hideLoading());
		} catch (error) {
			dispatch(hideLoading());
			console.log(error);
			throw new Error(
				'Could not add todo at the moment, please try again later.',
			);
		}
	};
}

export function updateTodo(id, completed) {
	return async (dispatch, getState) => {
		try {
			dispatch(showLoading());
			const token = getState().auth.token ?? localStorage.getItem('token');
			await axios.put(
				`${API}`,
				{ id, completed },
				{
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${token}`,
					},
				},
			);
			dispatch({
				type: UPDATE_TODO,
				id,
			});
			dispatch(hideLoading());
		} catch (error) {
			dispatch(hideLoading());
			console.log(error);
			throw new Error(
				'Could not update todo at the moment, please try again later.',
			);
		}
	};
}

export function removeTodo(id) {
	return async (dispatch, getState) => {
		try {
			dispatch(showLoading());
			const token = getState().auth.token ?? localStorage.getItem('token');
			await axios.delete(`${API}/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			});
			dispatch({
				type: REMOVE_TODO,
				id,
			});
			dispatch(hideLoading());
		} catch (error) {
			dispatch(hideLoading());
			console.log(error);
			throw new Error(
				'Could not remove todo at the moment, please try again later.',
			);
		}
	};
}
