import axios from 'axios';
import React, { useState, useEffect } from 'react'
import CustomHook from '../hooks/inputHooks';
import { useHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import GoogleMap from '../../components/map/GoogleMap'

import "./write.css"



function Write() {
	const history = useHistory();
	// state = {
	// 	title: "",
	// 	description: "",
	// 	loginError: "",
	// };

	const [title, titleOnChange, titleError, titleErrorMessage] = CustomHook('title')
	const [description, descriptionOnChange, descriptionError, descriptionErrorMessage] = CustomHook('description');
	
	
	// console.log(title)
	// console.log(titleErrorMessage);
	
	// const handleChange = (event) => {
	// 	// console.log(event.target.value);
	// 	this.setState({
	// 		[event.target.name]: event.target.value,
	// 	});
	// };

	
	const HandleSubmit = async (event) => {
		event.preventDefault();

		try {
			//need to grab current users token
			let getJwtToken = window.localStorage.getItem("jwtToken");
			//decode the token to pass in as decodedToken.username to verify if it is current user
			let decodedToken = jwtDecode(getJwtToken);

			//create the data to be sent to the server for request which includes
			let userInput = {
				username: decodedToken.username,
				title: title,
				description: description,
			};

			//send the request to the posts URL including the user data
			let result = await axios.post(
				"http://localhost:3001/api/posts",
				userInput
			);
			// console.log(result);
			// console.log(props.history)

			
			//once everything is finished we grab the history from react router and push the page back to homepage
			history.push("/");
			// console.log(this.props)
		} catch (e) {
			console.log(e);
		}
	};

	const checkIfUserIsAuth = () => {
	  //check if token exists, if it doesn't exists return false
	  //if it does exists, check if token valid (meaning not expired)
	  //if expired return false
	  //else return true
	  let getJwtToken = window.localStorage.getItem("jwtToken");
	  if (getJwtToken) {
	    const currentTime = Date.now() / 1000;
		  let decodedToken = jwtDecode(getJwtToken);

		  console.log(decodedToken);
		  if (decodedToken.exp < currentTime) {
		
	      return false;
	    } else {
	      return true;
	    }
	//   } else {
	// 		setLoginError({
	// 				loginError: "You must login to Write",
	// 			});
	    // return false;
	  }
	};

		// const { title, description, loginError } = this.state;

	return (
		<div className='write'>
			<img
				src='https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/116006923/original/b7b6f77ba4c9663c1724c614508bb853c58b89b1/write-a-letter-for-someone-close-to-you.jpg'
				alt=''
				className='writeImg'
			/>
			<form className='writeForm' onSubmit={HandleSubmit}>
				<div className='writeFormGroup'>
					<label htmlFor='fileInput'>
						<i className='writeIcon fas fa-plus'></i>
					</label>

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						{/* checking if error is true or false.  if true grab the error message */}
						
						<div style={{ color: 'red' }}>{titleError && titleErrorMessage}</div>
						

						<input type='file' id='fileInput' style={{ display: 'none' }} />
						<input
							className='writeInput'
							type='text'
							placeholder='Title'
							autoFocus={true}
							value={title}
							name='title'
							onChange={(e) => titleOnChange(e)}
						/>
					</div>
				</div>

				<div
					className='writeFormGroup'
					style={{ display: 'flex', flexDirection: 'column' }}
				>
					{/* checking if error is true or false.  if true grab the error message */}
					{
						<div style={{ color: 'red' }}>
							{descriptionError && descriptionErrorMessage}
						</div>
					}

					<textarea
						placeholder='Add your story ...'
						type='text'
						className='writeInput writeText'
						value={description}
						name='description'
						onChange={(e) => descriptionOnChange(e)}
					></textarea>
				</div>
				<button className='writeSubmit'>Publish</button>
			</form>
			<div>
				<GoogleMap />
			</div>
		</div>
	);
	
}

export default Write

