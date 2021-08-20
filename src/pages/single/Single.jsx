import React, {useState, useEffect} from "react";
import Sidebar from "../../components/sideBar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import axios from "axios";
import GoogleMap from "../../components/map/GoogleMap";
import "./single.css";

function Single({postId, history}){
   
    // state = {
    //     post: null
    // }
	const [post, setPost] = useState(null)

	useEffect(() => {
		getPosts()
	}, [])

    const getPosts = async() => {
        // console.log(this.props)
        try {
            let result = await axios.get(
                `http://localhost:3001/api/posts/findPostById/${this.props.match.params.postId}`
			);
        // console.log(result);
        setPost({
            post: result.data.payload
        })
        } catch (e) {
            console.log(e)
        }
    }

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
