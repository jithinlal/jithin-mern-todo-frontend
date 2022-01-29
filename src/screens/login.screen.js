import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useDispatch } from 'react-redux';

import Copyright from '../components/copyright';
import { loginSchema } from '../utils/validation';
import { login } from '../store/actions/auth.action';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Login() {
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState('');
	const { register, handleSubmit, errors } = useForm({
		mode: 'all',
		resolver: yupResolver(loginSchema),
	});

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const onSubmit = async (data) => {
		try {
			const { email, password } = data;
			await dispatch(login(email, password));
			history.push('/');
		} catch (error) {
			setOpen(true);
			setError(error.message);
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Login
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
					<TextField
						inputRef={register({ required: true })}
						error={!!errors.email}
						helperText={errors.email?.message}
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
					/>
					<TextField
						inputRef={register({ required: true })}
						error={!!errors.password}
						helperText={errors.password?.message}
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						Login
					</Button>
					<Grid container justify='center'>
						<Grid item>
							<Link to='/register'>Don't have an account? Sign Up</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				message={error}
			/>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
