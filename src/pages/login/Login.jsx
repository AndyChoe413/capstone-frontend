import React, { Component } from 'react'
import { isEmpty, isEmail, isAlpha } from 'validator'
import { Link } from 'react-router-dom';
import {toast} from "toastify"
import axios from "axios";
import jwtDecode from 'jwt-decode';
import "./login.css"
import { resetWarningCache } from 'prop-types';



export class Login extends Component {

	state = {
		username: "",
		password: "",
		usernameError: "",
		passwordError: "",
		canSubmit: true,
	}

	handleOnChange = (event) => {
		
		this.setState({
			[event.target.name]: event.target.value
		},
			() => {
				// console.log(this.state)
				if (event.target.name === "username") {
					if (isEmpty(this.state.username)) {
						this.setState({
							usernameError: "Username cannot be empty",
							canSubmit: true
						})
					} else {
						if (isAlpha(this.state.username)) {
							this.setState({
								usernameError: ""
							})
						}
					}
				}

				if (event.target.name === "password") {
					if (isEmpty(this.state.password)) {
						this.setState({
							passwordError: "Password cannot be empty",
							canSubmit: true
						})
					} else {
						this.setState({
							passwordError: "",
						})	
					}					
				}
			}
		)
		
	}

	handleSubmit = async (event) => {
		event.preventDefault()
		//step 1 create input to send to backend axios
		let userInput = {
			username: this.state.username,
			password:this.state.password
		}

		try {
			// step 2 need to send in the users information to the post request
			let result = await axios.post("http://localhost:3001/api/auth/login", userInput)
			//console.log to check if you get a success or error message from backend
			console.log(result)

			//step 3 token was created in backend.  need to grab the token and decode it
			let jwtToken = result.data.payload
			//step 4 Decrypt the token
			let decodedToken = jwtDecode(jwtToken)
			//step 5 send the decrypted token to this.props.login
			this.props.login(decodedToken)
			//step 6 send the encrypted token to local storage /// NOT the decrypted token!
			window.localStorage.setItem("jwtToken", jwtToken)
			//step 7 change window to homepage
			console.log(this.props);
			this.props.history.push("/")
		} catch (e) {
			console.log(e.response)
		}
	}


	render() {


		return (
			<div className="login">
				<span className="loginTitle">Login</span>
				<form className="loginForm" onSubmit={this.handleSubmit}>
					<label>Username</label>
					<input
						className="loginInput"
						type="text"
						placeholder="Enter your username..."
						name="username"
						value={this.state.username}
						onChange={this.handleOnChange}
					/>
					<span style={{ color: "red" }}>
						{this.state.usernameError && this.state.usernameError}
					</span>
					<label>Password</label>
					<input
						className="loginInput"
						type="password"
						placeholder="Enter your password..."
						name="password"
						value={this.state.password}
						onChange={this.handleOnChange}
					/>
					<span style={{ color: "red" }}>
						{this.state.passwordError && this.state.passwordError}
					</span>
					<button className="loginBtn" type="submit">
						Login
					</button>
				</form>
				<button className="loginRegBtn">
					<Link className="link" to="/register">
						Register
					</Link>
				</button>
			</div>
		);
	}
}

export default Login








// import { Link } from "react-router-dom";
// import { useContext, useRef } from "react";
// import { Context } from "../../context/Context";
// import axios from "axios";

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
// 			const result = await axios.post("http//:localhost3001/api/auth/login", {
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
