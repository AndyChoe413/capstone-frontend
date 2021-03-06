import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CustomHook from "../hooks/inputHooks";
import Axios from "../../Axios/Axios";
import { useHistory } from 'react-router';
import jwtDecode from "jwt-decode";

import "./register.css";



const URL = "http://localhost:3001";


function Register({login}) {
	const history = useHistory();


	// state = {
	// 	username: "",
	// 	email: "",
	// 	password: "",
	// 	usernameError: "",
	// 	emailError: "",
	// 	passwordError: "",
	// 	usernameOnFocus: false,
	// 	passwordOnFocus: false,
	// 	emailOnFocus: false,
	// 	isButtonDisabled: true,
	// };

	const [username, userNameOnChange, userNameError, userNameErrorMessage] =
		CustomHook('username');

	const [email, emailOnChange, emailError, emailErrorMessage] =
		CustomHook('email');

	const [password, passwordOnChange, passwordError, passwordErrorMessage] =
		CustomHook('password');

	// console.log(username)
	// console.log(email)
	// console.log(password)
	// console.log(userNameError);
	// console.log(userNameErrorMessage);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('submit pressed')

		try {

			//create input to send to backend schema
			let userInput = {
				username: username,
				email: email,
				password: password,
			};
			// console.log(userInput)
			let result = await Axios.post(`/auth/register`, userInput);
			// console.log(result);

			let jwtToken = result.data.payload
			// console.log(jwtToken);
			// //jwtToken name is stored in local storage and can be accessed in any file with same naming convention
			window.localStorage.setItem("jwtToken", jwtToken)

			let decodedToken = jwtDecode(jwtToken)
			login(decodedToken);

			// props.login(decodedToken);

			// //sends back to home page after submit is pressed
			history.push("/")
		} catch (e) {
			console.log(e);
		}
	};


	// useEffect(() => {
	// 	handleUsernameInput();
	// }, []);

	// handleChange = (event) => {
	// 	// console.log(event.target.value);

	// 	this.setState(
	// 		{
	// 			[event.target.name]: event.target.value,
	// 		},
	// 		() => {
	// 			if (event.target.name === "username") {
	// 				handleUsernameInput();
	// 			}
	// 			if (event.target.name === "email") {
	// 				this.handleEmailInput();
	// 			}
	// 			if (event.target.name === "password") {
	// 				this.handlePasswordInput();
	// 			}
	// 		}
	// 	);
	// };

	// const handleUsernameInput = () => {
	// 	if (username.length === 0) {
	// 		userNameError({
	// 			usernameError: 'Username cannot be empty',
	// 		});
	// 	} else {
	// 		if (isAlphanumeric(username)) {
	// 			userNameError({
	// 				usernameError: '',
	// 			});
	// 		} else {
	// 			userNameError({
	// 				usernameError: 'Username can must be alphanumeric',
	// 				isButtonDisabled: true,
	// 			});
	// 		}
	// 	}
	// };

	// handleEmailInput = () => {
	// 	if (this.state.email.length === 0) {
	// 		this.setState({
	// 			emailError: "Email cannot be empty",
	// 		});
	// 	} else {
	// 		if (isEmail(this.state.email)) {
	// 			this.setState({
	// 				emailError: "",
	// 			});
	// 		} else {
	// 			this.setState({
	// 				emailError: "Please enter a valid email",
	// 				isButtonDisabled: true,
	// 			});
	// 		}
	// 	}
	// };

	// handlePasswordInput = () => {
	// 	if (this.state.password.length === 0) {
	// 		this.setState({
	// 			passwordError: "Password cannot be empty",
	// 		});
	// 	} else {
	// 		if (isStrongPassword(this.state.password)) {
	// 			this.setState({
	// 				passwordError: "",
	// 			});
	// 		} else {
	// 			this.setState({
	// 				passwordError:
	// 					"Password must contains 1 uppercase, 1 lowercase, 1 special character, 1 number and minimum of 8 characters long",
	// 				isButtonDisabled: true,
	// 			});
	// 		}
	// 	}
	// };

	// handleOnBlur = (event) => {
	// 	// console.log(event.target.name);
	// 	// console.log("handle onBlur Triggered");
	// 	if (this.state[event.target.name].length === 0) {
	// 		this.setState({
	// 			[`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
	// 		});
	// 	}
	// };

	// handleInputOnFocus = (event) => {
	// 	console.log(event.target.name);
	// 	if (!this.state[`${event.target.name}OnFocus`]) {
	// 		console.log("On focus ran");
	// 		this.setState({
	// 			[`${event.target.name}OnFocus`]: true,
	// 		});
	// 	}
	// };

	// componentDidUpdate(prevProps, prevState) {
	// 	if (prevState.isButtonDisabled === true) {
	// 		if (
	// 			this.state.emailOnFocus &&
	// 			this.state.usernameOnFocus &&
	// 			this.state.passwordOnFocus 
	// 		) {
	// 			if (
	// 				this.state.usernameError.length === 0 &&
	// 				this.state.emailError.length === 0 &&
	// 				this.state.passwordError.length === 0
	// 			) {
	// 				this.setState({
	// 					isButtonDisabled: false,
	// 				});
	// 			}
	// 		}
	// 	}
	// }

	// render() {
	
		// const {
		// 	username,
		// 	email,
		// 	password,
		// 	usernameError,
		// 	emailError,
		// 	passwordError,
		// } = this.state;

		return (
			<div className='register'>
				<span className='registerTitle'>Register</span>
				<form className='registerForm' onSubmit={handleSubmit}>
					<label>Username</label>
					<input
						className='registerInput'
						type='text'
						value={username}
						placeholder='Enter your username...'
						autoComplete='true'
						autoFocus
						name='username'
						onChange={(e) => userNameOnChange(e)}
						// onBlur={this.handleOnBlur}
						// onFocus={this.handleInputOnFocus}
					/>

					<div className='errorMessage' style={{ color: 'red' }}>
						{userNameError && userNameErrorMessage}
					</div>

					<label>Email</label>
					<input
						className='registerInput'
						type='text'
						placeholder='Enter your email...'
						autoComplete='true'
						name='email'
						value={email}
						onChange={(e) => emailOnChange(e)}
						// onBlur={this.handleOnBlur}
						// onFocus={this.handleInputOnFocus}
					/>

					<div className='errorMessage' style={{ color: 'red' }}>
						{emailError && emailErrorMessage}
					</div>

					<label>Password</label>
					<input
						className='registerInput'
						type='password'
						placeholder='Enter your password...'
						autoComplete='true'
						name='password'
						value={password}
						onChange={(e) => passwordOnChange(e)}
						// onBlur={this.handleOnBlur}
						// onFocus={this.handleInputOnFocus}
					/>

					<div className="errorMessage" style={{ color: "red", width: 300 }}>
						{passwordError && passwordErrorMessage}
					</div>

					<button
						className='registerBtn'
						type='submit'
						// disabled={this.state.isButtonDisabled}
					>
						Register
					</button>
				</form>
				<button className='registerLoginBtn'>
					<Link className='link' to='/login'>
						Login
					</Link>
				</button>
				{/* {error && (
					<span style={{ color: "red", marginTop: 20 }}>
						User already exists!
					</span>  */}
			</div>
		);
	
}

export default Register;

