import axios from 'axios';
import React, { Component } from 'react'
import jwtDecode from 'jwt-decode';

import "./write.css"


export class Write extends Component {
	state = {
		title: "",
		desc: "",
		loginError: "",
	};

	handleChange = (event) => {
		console.log(event.target.value);
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = async (event) => {
		event.preventDefault();

		try {
			//need to grab current users token
			let getJwtToken = window.localStorage.getItem("jwtToken");
			//decode the token to pass in as decodedToken.username to verify if it is current user
			let decodedToken = jwtDecode(getJwtToken);

			//create the data to be sent to the server for request which includes
			let userInput = {
				username: decodedToken.username,
				title: this.state.title,
				desc: this.state.desc,
			};

			//send the request to the posts URL including the user data
			let result = await axios.post(
				"http://localhost:3001/api/posts",
				userInput
			);
			console.log(result);

			//once everything is finished we grab the history from react router and push the page back to homepage
			this.props.history.push("/");
			// console.log(this.props)
		} catch (e) {
			console.log(e);
		}
	};

	// checkIfUserIsAuth = () => {
	//   //check if token exists, if it doesnt exists return false
	//   //if it does exists, check if token valid (meaning not expired)
	//   //if expired return false
	//   //else return true
	//   let getJwtToken = window.localStorage.getItem("jwtToken");
	//   if (getJwtToken) {
	//     const currentTime = Date.now() / 1000;
	// 	  let decodedToken = jwtDecode(getJwtToken);

	// 	  console.log(decodedToken);
	// 	  if (decodedToken.exp < currentTime) {
		
	//       return false;
	//     } else {
	//       return true;
	//     }
	//   } else {
	// 		this.setState({
	// 				loginError: "You must login to Write",
	// 			});
	//     // return false;
	//   }
	// };



	render() {
		const { title, desc, loginError } = this.state;

		return (
			<div className="write">
				<img
					src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/116006923/original/b7b6f77ba4c9663c1724c614508bb853c58b89b1/write-a-letter-for-someone-close-to-you.jpg"
					alt=""
					className="writeImg"
				/>
				<form className="writeForm" onSubmit={this.handleSubmit}>
					<div className="writeFormGroup">
						<label htmlFor="fileInput">
							<i className="writeIcon fas fa-plus"></i>
						</label>
						<input type="file" id="fileInput" style={{ display: "none" }} />
						<input
							className="writeInput"
							type="text"
							placeholder="Title"
							autoFocus={true}
							value={title}
							name="title"
							onChange={this.handleChange}
						/>
					</div>
					<div className="writeFormGroup">
						<textarea
							placeholder="Add your story ..."
							type="text"
							className="writeInput writeText"
							value={desc}
							name="desc"
							onChange={this.handleChange}
						></textarea>
					</div>
					<button className="writeSubmit">Publish</button>
				</form>
				<div className="loginError">{this.checkIfUserIsAuth && loginError}</div>
			</div>
		);
	}
}

export default Write

