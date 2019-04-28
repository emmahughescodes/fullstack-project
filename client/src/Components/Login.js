import React, { Component } from "react";
import Drawer from './Drawer';
import { Link, BrowserRouter } from 'react-router-dom';

class Login extends Component {
		state = {
			form: {
				email: "",
				password: ""
			}
		}

		handleChange = (event) => {
			// [event.target.name] = event.target.value;
			this.setState({
				form: {
					...this.state.form,
					[event.target.name]: event.target.value
				}
			});
		}

		handleSubmit = async (e) => {
			e.preventDefault();
			try {
				const fetchBody = this.state.form;
				const fetchOptions = {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify(fetchBody)
				}
				const fetchURL = '/api/users/login';
				const response = await fetch(fetchURL, fetchOptions);
				const getUserToken = await response.json();
				console.log(getUserToken);
				console.log(getUserToken.data.user, "userobject");
				this.props.updateUserState({
					token: getUserToken.data.token,
					user: getUserToken.data.user
				});

				this.props.redirect();
			}
			catch (e) {
				console.log(e, "problem-login");
				// alert(e);
				alert("That email already exists");
			}

		}
		render() {
				return (
					<>
						<Drawer />
						<h2>Login here</h2>
						<form action="">
							<input type="text" name="email" required placeholder="email" value={this.state.form.email} onChange={this.handleChange}/>
							<input type="text" name="password" required placeholder="password" value={this.state.form.password} onChange={this.handleChange}/>

							<button type="submit" onClick={this.handleSubmit}>Login</button>
						</form>
					</>
				);
		}
}

export default (Login);
