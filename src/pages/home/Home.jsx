// import React, { Component } from 'react'
import React, {useState, useEffect} from "react"
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sideBar/Sidebar"
import Axios from "../../Axios/Axios"
import jwtDecode from "jwt-decode";
import GoogleMap from '../../components/map/GoogleMap'


import "./home.css"

const URL = "http://localhost:3001";

const Home = () => {

    // state = {
    //     posts: []
    // }

    const [posts, setPosts] = useState([])

    useEffect(() => {
        getAllPosts()
    }, [])
    
    const getAllPosts = async () => {
			try {
				let getJwtToken = window.localStorage.getItem('jwtToken');
				let decodedJwtToken = jwtDecode(getJwtToken);

				console.log(decodedJwtToken);

				const posts = await Axios.get(
					`/posts/${decodedJwtToken.username}`
				);

				console.log(posts);
				// this.setState({
				//     posts: posts.data.payload
				// })
				setPosts(posts.data.payload);
			} catch (e) {
				console.log(e);
			}
		};
        

        	return (
						<>
							{/* Header component passed in from Header */}
							<Header />
							<div className='home'>
								<div></div>

								{/* pass the props into Posts posts={posts}  brings in all the posts created by user onto home page*/}

								{/* <Posts posts={this.state.posts} /> */}
								<Posts posts={posts}></Posts>
								{/*Sidebar component */}
								<Sidebar />
							</div>
							<div>
								<GoogleMap />
							</div>
						</>
					);

}

export default Home





