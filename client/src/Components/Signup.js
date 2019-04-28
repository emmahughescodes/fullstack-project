import React, { Component } from "react";
import Drawer from './Drawer';

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
				const fetchURL = '/api/users/signup';
				const response = await fetch(fetchURL, fetchOptions);
				const getUserToken = await response.json();
				alert('success signup');
				console.log((getUserToken["data"][0]), "token");
				// console.log(getUserToken, "usertokenemma");
			}
			catch (e) {
				// console.log(e, "problem-signup");
				alert("Sorry, either the email does not exist or your password is wrong");
			}
		}
		render() {
				return (
					<>
						<Drawer />
						<h2>Signup here</h2>
						<form action="">
							<input type="text" name="email" required placeholder="email" value={this.state.form.email} onChange={this.handleChange}/>
							<input type="text" name="password" required placeholder="password" value={this.state.form.password} onChange={this.handleChange}/>
							<button type="submit" onClick={this.handleSubmit} >Signup</button>
						</form>
					</>
				);
		}
}

export default Login;
