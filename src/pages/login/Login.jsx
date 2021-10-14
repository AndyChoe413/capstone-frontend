import React, { Component } from 'react'
import { isEmpty, isEmail, isAlpha } from 'validator'
import { Link } from 'react-router-dom';
import CustomHook from '../hooks/inputHooks';
import { useHistory } from 'react-router';
import Axios from '../../Axios/Axios'
import jwtDecode from 'jwt-decode';
import "./login.css"




function Login({login}){
	const history = useHistory();

	const [username, userNameOnChange, userNameError, userNameErrorMessage] =
		CustomHook('username');
	
	
	const [password, passwordOnChange, passwordError, passwordErrorMessage] =
		CustomHook('password');
	
	// state = {
	// 	username: "",
	// 	password: "",
	// 	usernameError: "",
	// 	passwordError: "",
	// 	canSubmit: true,
	// }

	// handleOnChange = (event) => {
		
	// 	this.setState({
	// 		[event.target.name]: event.target.value
	// 	},
	// 		() => {
	// 			// console.log(this.state)
	// 			if (event.target.name === "username") {
	// 				if (isEmpty(this.state.username)) {
	// 					this.setState({
	// 						usernameError: "Username cannot be empty",
	// 						canSubmit: true
	// 					})
	// 				} else {
	// 					if (isAlpha(this.state.username)) {
	// 						this.setState({
	// 							usernameError: ""
	// 						})
	// 					}
	// 				}
	// 			}

	// 			if (event.target.name === "password") {
	// 				if (isEmpty(this.state.password)) {
	// 					this.setState({
	// 						passwordError: "Password cannot be empty",
	// 						canSubmit: true
	// 					})
	// 				} else {
	// 					this.setState({
	// 						passwordError: "",
	// 					})	
	// 				}					
	// 			}
	// 		}
	// 	)
		
	// }

	const handleSubmit = async (event) => {
		event.preventDefault()
		//step 1 create input to send to backend axios
		let userInput = {
			username: username,
			password: password
		}

		try {
			// step 2 need to send in the users information to the post request
			let result = await Axios.post("/auth/login", userInput)
			//console.log to check if you get a success or error message from backend
			// console.log(result)

			//step 3 token was created in backend.  need to grab the token and decode it
			let jwtToken = result.data.payload
			//step 4 Decrypt the token
			let decodedToken = jwtDecode(jwtToken)
			//step 5 send the decrypted token to this.props.login
			login(decodedToken)
			//step 6 send the encrypted token to local storage /// NOT the decrypted token!
			window.localStorage.setItem("jwtToken", jwtToken)
			//step 7 change window to homepage
			// console.log(this.props);
			history.push("/")
		} catch (e) {
			console.log(e.response)
		}
	}





		return (
			<div className='login'>
				<span className='loginTitle'>Login</span>
				<form className='loginForm' onSubmit={handleSubmit}>
					<label>Username</label>
					<input
						className='loginInput'
						type='text'
						placeholder='Enter your username...'
						name='username'
						value={username}
						onChange={userNameOnChange}
					/>
					<span style={{ color: 'red' }}>
						{userNameError && userNameErrorMessage}
					</span>
					<label>Password</label>
					<input
						className='loginInput'
						type='password'
						placeholder='Enter your password...'
						name='password'
						value={password}
						onChange={passwordOnChange}
					/>
					<span style={{ color: 'red' }}>
						{passwordError && passwordErrorMessage}
					</span>
					<button className='loginBtn' type='submit'>
						Login
					</button>
				</form>
				<button className='loginRegBtn'>
					<Link className='link' to='/register'>
						Register
					</Link>
				</button>
			</div>
		);
}

export default Login








// import { Link } from "react-router-dom";
// import { useContext, useRef } from "react";
// import { Context } from "../../context/Context";
// import Axios from "../../Axios/Axios";

// import "./login.css"

// export default function Login() {
// 	//userRef is a function which takes a maximum of one argument and returns an Object . The returned object has a property called current whose value is the argument passed to useRef .
// 	const userRef = useRef();
// 	const passwordRef = useRef();
// 	//passed in from Context file
// 	//“useContext” hook is used to create common data that can be accessed throughout the component hierarchy without passing the props down manually to each level.
// 	const { user, dispatch, isFetching } = useContext(Context);

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		dispatch({ type: "LOGIN_START" });

// 		try {
// 			const result = await Axios.post("/auth/login", {
// 				username: userRef.current.value,
// 				password: passwordRef.current.value,
// 			});
// 			console.log(result)
// 			// dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
// 		} catch (err) {
// 			dispatch({ type: "LOGIN_FAILURE" });
// 		}
// 	};
// 	console.log(user);
// 	// console.log(isFetching);
// 	return (
// 		<div className="login">
// 			<span className="loginTitle">Login</span>
// 			<form className="loginForm" onSubmit={handleSubmit}>
// 				<label>Username</label>
// 				<input
// 					className="loginInput"
// 					type="text"
// 					placeholder="Enter your username..."
// 					ref={userRef}
// 				/>
// 				<label>Password</label>
// 				<input
// 					className="loginInput"
// 					type="password"
// 					placeholder="Enter your password..."
// 					res={passwordRef}
// 				/>
// 				<button className="loginBtn" type="submit">
// 					Login
// 				</button>
// 			</form>
// 			<button className="loginRegBtn">
// 				<Link className="link" to="/register">
// 					Register
// 				</Link>
// 			</button>
// 		</div>
// 	);
// }
