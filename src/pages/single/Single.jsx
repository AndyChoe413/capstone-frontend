import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import Sidebar from "../../components/sideBar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import axios from "axios";

import GoogleMap from "../../components/map/GoogleMap";
import "./single.css";


function Single(){
   const history = useHistory()
    // state = {
    //     post: null
    // }

	const [post, setPost] = useState(null)

	useEffect(() => {
		getData()
	}, [])

    const getData = async() => {
     
        try {
            let result = await axios.get(
                `http://localhost:3001/api/posts/findPostById/${this.props.match.params.postId}`
			);
			console.log(result);
			
			setPost(result.data.payload);
			
        } catch (e) {
            console.log(e)
        }
    }

        

        console.log("single");

		return (
			<div className='single'>
				
				{/* post is a prop being passed into singlePost.jsx  checks if post is null  if not sends in the SinglePost component and renders onto the DOM*/}
				{post ? (
					<SinglePost
						id={this.props.match.params.postId}
						history={history}
						post={post}
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

export default Single;
