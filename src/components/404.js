import React from 'react';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

import '../index.css';
function FourNotFour() {
	return (
		<Container id='notfound'>
			<Container class='notfound'>
				<Container class='notfound-404'>
					<h1>Oops!</h1>
					<h2>404 - The Page can't be found</h2>
				</Container>
				<Link to='/'>Go TO Homepage</Link>
			</Container>
		</Container>
	);
}

export default FourNotFour;
