import React, { Component } from "react";
import Sidebar from "../../components/sideBar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import axios from "axios";
import GoogleMap from "../../components/map/GoogleMap";
import "./single.css";


export class Single extends Component {
   
    state = {
        post: null
    }

    componentDidMount = async() => {
        console.log(this.props)
        try {
            let result = await axios.get(
                `http://localhost:3001/api/posts/findPostById/${this.props.match.params.postId}`
			);
        console.log(result);
        this.setState({
            post: result.data.payload
        })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        

        console.log("single");

		return (
			<div className='single'>
				<h1>single</h1>
				{/* post is a prop being passed into singlePost.jsx  checks if post is null  if not sends in the SinglePost component and renders onto the DOM*/}
				{this.state.post ? (
					<SinglePost
						id={this.props.match.params.postId}
						history={this.props.history}
						post={this.state.post}
					/>
				) : (
					''
				)}

				{/* Sidebar component rendering to DOM on Single page */}
				{/* <Sidebar /> */}

				<GoogleMap />
			</div>
		);
	}
}

export default Single;
