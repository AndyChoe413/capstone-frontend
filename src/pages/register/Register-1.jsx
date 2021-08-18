import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { isEmail, isAlphanumeric, isStrongPassword } from "validator";
import jwtDecode from "jwt-decode";

import "./register.css";

const URL = "http://localhost:3001";


export class Register extends Component {
	state = {
		username: "",
		email: "",
		password: "",
		usernameError: "",
		emailError: "",
		passwordError: "",
		usernameOnFocus: false,
		passwordOnFocus: false,
		emailOnFocus: false,
		isButtonDisabled: true,
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		console.log("submit pressed")

		try {
			let userInput = {
				username: this.state.username,
				email: this.state.email,
				password: this.state.password,
			};

			let result = await axios.post(`${URL}/api/auth/register`, userInput);
			console.log(result);

			let jwtToken = result.data.payload
			//jwtToken name is stored in local storage and can be accessed in any file with same naming convention
			window.localStorage.setItem("jwtToken", jwtToken)

			console.log(this.props)

			let decodedToken = jwtDecode(jwtToken)
			this.props.login(decodedToken);
			//sends back to home page after submit is pressed
			this.props.history.push("/")
		} catch (e) {
			console.log(e);
		}
	};


	handleChange = (event) => {
		console.log(event.target.value);

		this.setState(
			{
				[event.target.name]: event.target.value,
			},
			() => {
				if (event.target.name === "username") {
					this.handleUsernameInput();
				}
				if (event.target.name === "email") {
					this.handleEmailInput();
				}
				if (event.target.name === "password") {
					this.handlePasswordInput();
				}
			}
		);
	};

	handleUsernameInput = () => {
		if (this.state.username.length === 0) {
			this.setState({
				usernameError: "Username cannot be empty",
			});
		} else {
			if (isAlphanumeric(this.state.username)) {
				this.setState({
					usernameError: "",
				});
			} else {
				this.setState({
					usernameError: "Username can must be alphanumeric",
					isButtonDisabled: true,
				});
			}
		}
	};

	handleEmailInput = () => {
		if (this.state.email.length === 0) {
			this.setState({
				emailError: "Email cannot be empty",
			});
		} else {
			if (isEmail(this.state.email)) {
				this.setState({
					emailError: "",
				});
			} else {
				this.setState({
					emailError: "Please enter a valid email",
					isButtonDisabled: true,
				});
			}
		}
	};

	handlePasswordInput = () => {
		if (this.state.password.length === 0) {
			this.setState({
				passwordError: "Password cannot be empty",
			});
		} else {
			if (isStrongPassword(this.state.password)) {
				this.setState({
					passwordError: "",
				});
			} else {
				this.setState({
					passwordError:
						"Password must contains 1 uppercase, 1 lowercase, 1 special character, 1 number and minimum of 8 characters long",
					isButtonDisabled: true,
				});
			}
		}
	};

	handleOnBlur = (event) => {
		// console.log(event.target.name);
		// console.log("handle onBlur Triggered");
		if (this.state[event.target.name].length === 0) {
			this.setState({
				[`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
			});
		}
	};

	handleInputOnFocus = (event) => {
		console.log(event.target.name);
		if (!this.state[`${event.target.name}OnFocus`]) {
			console.log("On focus ran");
			this.setState({
				[`${event.target.name}OnFocus`]: true,
			});
		}
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.isButtonDisabled === true) {
			if (
				this.state.emailOnFocus &&
				this.state.usernameOnFocus &&
				this.state.passwordOnFocus 
			) {
				if (
					this.state.usernameError.length === 0 &&
					this.state.emailError.length === 0 &&
					this.state.passwordError.length === 0
				) {
					this.setState({
						isButtonDisabled: false,
					});
				}
			}
		}
	}

	render() {
		const {
			username,
			email,
			password,
			usernameError,
			emailError,
			passwordError,
		} = this.state;

		return (
			<div className="register">
				<span className="registerTitle">Register</span>
				<form className="registerForm" onSubmit={this.handleSubmit}>
					<label>Username</label>
					<input
						className="registerInput"
						type="text"
						value={username}
						placeholder="Enter your username..."
						autoComplete="true"
						autoFocus
						name="username"
						onChange={this.handleChange}
						onBlur={this.handleOnBlur}
						onFocus={this.handleInputOnFocus}
					/>
					<div className="errorMessage" style={{ color: "red" }}>
						{usernameError && usernameError}
					</div>
					<label>Email</label>
					<input
						className="registerInput"
						type="text"
						placeholder="Enter your email..."
						autoComplete="true"
						name="email"
						value={email}
						onChange={this.handleChange}
						onBlur={this.handleOnBlur}
						onFocus={this.handleInputOnFocus}
					/>
					<div className="errorMessage" style={{ color: "red" }}>
						{emailError && emailError}
					</div>
					<label>Password</label>
					<input
						className="registerInput"
						type="password"
						placeholder="Enter your password..."
						autoComplete="true"
						name="password"
						value={password}
						onChange={this.handleChange}
						onBlur={this.handleOnBlur}
						onFocus={this.handleInputOnFocus}
					/>
					<div className="errorMessage" style={{ color: "red", width: 300 }}>
						{passwordError && passwordError}
					</div>
					<button
						className="registerBtn"
						type="submit"
						disabled={this.state.isButtonDisabled}
					>
						Register
					</button>
				</form>
				<button className="registerLoginBtn">
					<Link className="link" to="/login">
						Login
					</Link>
				</button>
				{/* {error && (
					<span style={{ color: "red", marginTop: 20 }}>
						User already exists!
					</span> 
				)} */}
			</div>
		);
	}
}

export default Register;

