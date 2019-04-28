import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import Drawer from './Components/Drawer';
import Login from './Components/Login';
import Signup from './Components/Signup';
import MyCrystals from './Components/MyCrystals';
// import withAuth from './Components/withAuth';
import './App.scss';

library.add(faPlusSquare);

const styles = (theme) => ({
	root: {
		display: 'flex',
	},
});

const history = createBrowserHistory();

class App extends Component {
	state = {
		user: {}
	};

	updateUserState = (user) => {
		this.setState({
			user: user
		});
	}

  render () {
    return (
			// myCrystals
			<Router history={history}>
			<div>
				<ul className="margin-top">
					<li><Link to="/">Login</Link></li>
					<li><Link to="/myCrystals">My Crystals</Link></li>
					<li><Link to="/test">Test</Link></li>
					{/* if user logged in might be nice to say "welcome, emma!" */}
				</ul>
				<Switch>
					<Route exact path='/' render={ (props) => {
						console.log(props, "props");
							return (
								<>
								<Login updateUserState={this.updateUserState}
									redirect={() => {
										props.history.push({
											pathname: `/myCrystals/${this.state.user.user._id}`,
										});
									}}
								/>
								<Signup />
								</>
							);
						}}
					/>
					<Route exact path='/signup' render={() => {
							return (
								<>
								<Signup />
								</>
							);
						}}
					/>
					<Route exact path='/login' render={() => {
							return (
								<>
								<Login />
								<button onClick={<Link to="/signup">Signup</Link>}>Sign up?</button>
								</>
							);
						}}
					/>
					<Route
						exact path='/myCrystals/:userId'
						component={MyCrystals}
						/>
						<Route exact path='/login' component={Login}/>
					<Route exact path='/test' render={() => {
							return (
								<>
								<Drawer />
								</>
							);
						}}
					/>
					</Switch>
			</div>
			</Router>
		)

  }
}

export default withStyles(styles)(App);
