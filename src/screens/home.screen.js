import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import MenuAppBar from '../components/appbar';
import {
	showTodos,
	addTodo,
	updateTodo,
	removeTodo,
} from '../store/actions/todo.action';
import { todoSchema } from '../utils/validation';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	submit: {
		margin: theme.spacing(2, 1, 2),
		height: 55,
	},
}));

export default function Home() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState('');
	const dispatch = useDispatch();
	const { register, handleSubmit, errors, reset } = useForm({
		mode: 'all',
		resolver: yupResolver(todoSchema),
	});
	const todos = useSelector((state) => state.todo.todos);

	React.useEffect(() => {
		const showTodosFn = async () => {
			try {
				await dispatch(showTodos());
			} catch (error) {
				setOpen(true);
				setError(error.message);
			}
		};

		showTodosFn();
	}, [dispatch]);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const handleToggle = (value, completed) => async () => {
		try {
			await dispatch(updateTodo(value, completed));
		} catch (error) {
			setOpen(true);
			setError(error.message);
		}
	};

	const handleDelete = (value) => async () => {
		try {
			await dispatch(removeTodo(value));
		} catch (error) {
			setOpen(true);
			setError(error.message);
		}
	};

	const onSubmit = async (data) => {
		try {
			const { todo } = data;
			await dispatch(addTodo(todo));
			reset();
		} catch (error) {
			setOpen(true);
			setError(error.message);
		}
	};

	return (
		<>
			<MenuAppBar />
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component='h1' variant='h5'>
						Todo List
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid container justify='center'>
							<Grid item>
								<TextField
									inputRef={register({ required: true })}
									error={!!errors.todo}
									helperText={errors.todo?.message}
									variant='outlined'
									margin='normal'
									id='todo'
									label='Add Todo'
									name='todo'
								/>
							</Grid>
							<Grid item>
								<Button
									type='submit'
									variant='contained'
									color='primary'
									className={classes.submit}
								>
									<AddIcon />
								</Button>
							</Grid>
						</Grid>
					</form>
					{todos.length !== 0 && (
						<List className={classes.root}>
							{todos.map((todo) => {
								const labelId = `checkbox-list-label-${todo['todo']}`;

								return (
									<ListItem
										key={todo['id']}
										role={undefined}
										dense
										button
										onClick={handleToggle(todo['id'], !todo['completed'])}
									>
										<ListItemIcon>
											<Checkbox
												edge='start'
												checked={todo['completed']}
												tabIndex={-1}
												inputProps={{ 'aria-labelledby': labelId }}
											/>
										</ListItemIcon>
										<ListItemText id={labelId} primary={`${todo['todo']}`} />
										<ListItemSecondaryAction>
											<IconButton
												edge='end'
												aria-label='delete-todo'
												onClick={handleDelete(todo['id'])}
											>
												<DeleteIcon color='error' />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								);
							})}
						</List>
					)}
				</div>
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					open={open}
					autoHideDuration={3000}
					onClose={handleClose}
					message={error}
				/>
			</Container>
		</>
	);
}
