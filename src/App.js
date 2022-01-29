import React from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loading from './components/loading';
import FourNotFour from './components/404';
import GuardedRoute from './utils/guarded-route';
const Login = React.lazy(() => import('./screens/login.screen'));
const Register = React.lazy(() => import('./screens/register.screen'));
const Home = React.lazy(() => import('./screens/home.screen'));

function App() {
	const auth = useSelector(state => state.auth.authenticated);

	return (
		<Router>
			<div className='App'>
				<React.Suspense fallback={<Loading />}>
					<Switch>
						<Route exact path='/'>
							<Redirect to='/home' />
						</Route>
						<Route path='/login' component={Login} />
						<Route path='/register' component={Register} />
						<GuardedRoute path='/home' component={Home} auth={auth} />
						<Route render={() => <FourNotFour />} />
					</Switch>
				</React.Suspense>
			</div>
		</Router>
	);
}

export default App;
