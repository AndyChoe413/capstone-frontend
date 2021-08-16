import React, { Component } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./singlePost.css";
import { Link, history } from "react-router-dom";


export class SinglePost extends Component {
	state = {
		title: "",
		desc: "",
		toggle: false,
		submit: false,
	};

	async componentDidMount() {
		try {
			this.setState({
				title: this.props.post.title,
				desc: this.props.post.desc,
			});
		} catch (e) {
			console.log(e);
		}
	}

	handleOnSubmit = async () => {
		console.log("clicked submit")
		try {
			let getJwtToken = window.localStorage.getItem("jwtToken");
			let decodedToken = jwtDecode(getJwtToken);

			console.log(decodedToken);
			const updatedInfo = {
				username: decodedToken.username,
				title: this.state.title,
				desc: this.state.desc,
			};

			let result = await axios.put(
				//this.props.id is being passed down from Single.jsx file
				`http://localhost:3001/api/posts/${this.props.id}`,
				updatedInfo
			);

			//Toggle to change the submit button back using onHandleEditClick
			this.onHandleEditClick()
			// console.log(result)
		} catch (e) {
			console.log(e)
		}
	}

	onHandleEditClick = () => {
		console.log("clicked");
		this.setState((prevState) => ({ toggle: !prevState.toggle }));
	};

	handleOnChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
		console.log(event.target.value);
	};

	deletePost = async () => {
		// make an api call to delete this post
		try {
			const result = await axios.delete(
				`http://localhost:3001/api/posts/${this.props.post._id}`
			);

			// console.log(result);
			this.props.history.push("/");
		} catch (e) {
			console.log(e);
		}
		// navigate back to home page
	};


	render() {
		console.log(this.props.post);
		
		return (
			<div className="singlePost">
				<div className="singlePostWrapper">
					<h1 className="singlePostTitle">
						{this.state.toggle ? (
							<input
								name="title"
								value={this.state.title}
								onChange={this.handleOnChange}
							/>
						) : (
							this.state.title
						)}
						<div className="singlePostEdit">
							{this.state.toggle ? (
								<button
									className="submit"
									onClick={() => this.handleOnSubmit()}
								>
									Submit
								</button>
							) : (
								<i
									onClick={() => this.onHandleEditClick()}
									className="singlePostIcon far fa-edit"
								></i>
							)}
							<i
								className="singlePostIcon far fa-trash-alt"
								onClick={this.deletePost}
							></i>
						</div>
					</h1>
					<div className="singlePostInfo">
						<span className="singlePostAuthor">
							Author:
							{/* Link is the same as an anchor tag but will not re-render the whole page.  comes from react-router-dom
							if username is clicked page will send user to homepage with all their own posts */}
							<Link to={`/?user=${this.props.post.username}`} className="link">
								<b> {this.props.post.username}</b>
							</Link>
						</span>
						<span className="singlePostDate">
							<b>{new Date(this.props.post.createdAt).toDateString()}</b>
						</span>
					</div>
					{this.state.toggle ? (
						<input
							className="singlePostDesc"
							name="desc"
							value={this.state.desc}
							onChange={this.handleOnChange}
						/>
					) : (
						this.state.desc
					)}
				</div>
				<label htmlFor="fileInput">
					<i className="writeIcon fas fa-plus"></i>
					<p>Add new photo</p>
				</label>
				<input type="file" id="fileInput" style={{ display: "none" }} />
				<img
					className="postImg"
					src="https://static.boredpanda.com/blog/wp-content/uploads/2014/04/cherry-blossom-sakura-coverimage.jpg"
					alt=""
					style={{
						width: "50vw",
						height: 500,
						marginLeft: "10vw",
						justifyContent: "center",
					}}
				/>
			</div>
		);
	}
}

export default SinglePost;



	