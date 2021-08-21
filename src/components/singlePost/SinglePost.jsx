import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import CustomHook from "../../pages/hooks/singlePostHooks";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./singlePost.css";
import { someLimit } from "async";



function SinglePost({ post, id }) {
	const history = useHistory()
	// state = {
	// 	title: "",
	// 	desc: "",
	// 	toggle: false,
	// 	submit: false,
	// };
	console.log(post)
	console.log(id)
	
	const [title, titleOnChange] = CustomHook('');
	const [description, descriptionOnChange] = CustomHook('');

	const [toggle, setToggle] = useState(false);

	console.log(title)
	console.log(description);
	console.log(toggle)

	useEffect(() => {
		getInfo()
	}, [])

	const getInfo = async () => {
		try {
			titleOnChange({ title: post.title });
			descriptionOnChange({ description: post.description });
		} catch (e) {
			console.log(e)
		}
	}
	// async componentDidMount() {
	// 	try {
	// 		this.setState({
	// 			title: this.props.post.title,
	// 			desc: this.props.post.desc,
	// 		});
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// }

	const handleOnSubmit = async () => {
		console.log("clicked submit")
		try {
			let getJwtToken = window.localStorage.getItem("jwtToken");
			let decodedToken = jwtDecode(getJwtToken);

			console.log(decodedToken);
			const updatedInfo = {
				username: decodedToken.username,
				title: title,
				description: description,
			};

			let result = await axios.put(
				//this.props.id is being passed down from Single.jsx file
				`http://localhost:3001/api/posts/${id}`,
				updatedInfo
			);

			//Toggle to change the submit button back using onHandleEditClick
			onHandleEditClick()
			// console.log(result)
		} catch (e) {
			console.log(e)
		}
	}

	const onHandleEditClick = () => {
		if (toggle) {
			setToggle(false)
		} else {
			setToggle(true)
		}
	};

	// const handleOnChange = (event) => {
	// 	this.setState({
	// 		[event.target.name]: event.target.value,
	// 	});
	// 	console.log(event.target.value);
	// };

	const deletePost = async () => {
		// make an api call to delete this post
		try {
			const result = await axios.delete(
				`http://localhost:3001/api/posts/${post._id}`
			);

			// console.log(result);
			history.push("/");
		} catch (e) {
			console.log(e);
		}
		// navigate back to home page
	};



		// console.log(this.props.post);

		return (
			<div className='singlePost'>
				<div className='singlePostWrapper'>
					<h1 className='singlePostTitle'>
						{toggle ? (
							<input name='title' value={title} onChange={titleOnChange} />
						) : (
							title
						)}
						<div className='singlePostEdit'>
							{toggle ? (
								<button className='submit' onClick={() => handleOnSubmit()}>
									Submit
								</button>
							) : (
								<i
									onClick={() => onHandleEditClick()}
									className='singlePostIcon far fa-edit'
								></i>
							)}
							<i
								className='singlePostIcon far fa-trash-alt'
								onClick={deletePost}
							></i>
						</div>
					</h1>
					<div className='singlePostInfo'>
						<span className='singlePostAuthor'>
							Author:
							{/* Link is the same as an anchor tag but will not re-render the whole page.  comes from react-router-dom
							if username is clicked page will send user to homepage with all their own posts */}
							<Link to={`/?user=${post.username}`} className='link'>
								<b> {post.username}</b>
							</Link>
						</span>
						<span className='singlePostDate'>
							<b>{new Date(post.createdAt).toDateString()}</b>
						</span>
					</div>

					{toggle ? (
						<input
							className='singlePostDesc'
							name='description'
							value={description}
							onChange={descriptionOnChange}
						/>
					) : (
						description
					)}
				</div>
				<label htmlFor='fileInput'>
					<i className='writeIcon fas fa-plus'></i>
					<p>Add new photo</p>
				</label>
				<input type='file' id='fileInput' style={{ display: 'none' }} />
				<img
					className='postImg'
					src='https://static.boredpanda.com/blog/wp-content/uploads/2014/04/cherry-blossom-sakura-coverimage.jpg'
					alt=''
					style={{
						width: '50vw',
						height: 500,
						marginLeft: '10vw',
						justifyContent: 'center',
					}}
				/>
			</div>
		);
}

export default SinglePost;



	