import { LOGOUT } from '../types/auth';
import {
	ADD_TODO,
	SHOW_TODOS,
	// FETCH_TODO,
	REMOVE_TODO,
	UPDATE_TODO,
} from '../types/todo';

const initialState = {
	todos: [],
};

export default function todo(state = initialState, action) {
	switch (action.type) {
		case SHOW_TODOS:
			return {
				...state,
				...{ todos: action.todos },
			};
		case ADD_TODO:
			return {
				...state,
				...{ todos: state.todos.concat(action.todo) },
			};
		case UPDATE_TODO:
			return {
				...state,
				...{
					todos: state.todos.map((todo) => {
						if (todo.id === action.id) {
							return { ...todo, completed: !todo.completed };
						} else {
							return todo;
						}
					}),
				},
			};
		case REMOVE_TODO:
			return {
				...state,
				...{
					todos: state.todos.filter((todo) => todo.id !== action.id),
				},
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
}
