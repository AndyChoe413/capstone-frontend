import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router';
import Sidebar from "../../components/sideBar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import Axios from "../../Axios/Axios";

import GoogleMap from "../../components/map/GoogleMap";
import "./single.css";


function Single() {
	//brings history from react-router
	const history = useHistory()
	//brings in params.  ex if you need to use match.params like in classes
	const { postId } = useParams()
	
    // state = {
    //     post: null
    // }

	const [post, setPost] = useState(null)

	useEffect(() => {
		getData()
	}, [])

    const getData = async() => {
     
        try {
            let result = await Axios.get(
                `/posts/findPostById/${postId}`
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
						id={postId}
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
