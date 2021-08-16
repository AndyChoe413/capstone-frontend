import React, { Component } from 'react'
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sideBar/Sidebar"
import axios from "axios"
import jwtDecode from "jwt-decode";
import GoogleMap from '../../components/map/GoogleMap'


import "./home.css"

const URL = "http://localhost:3001";

export class Home extends Component {

    state = {
        posts: []
    }

  
    
    componentDidMount = async () => {
        try {

            let getJwtToken = window.localStorage.getItem("jwtToken")
            let decodedJwtToken = jwtDecode(getJwtToken)

            console.log(decodedJwtToken);

            const posts = await axios.get(
                `${URL}/api/posts/${decodedJwtToken.username}`
            );
            
            console.log(posts);
            this.setState({
                posts: posts.data.payload
            })

        } catch (e) {
            console.log(e)
        }
    }
        
    

    render() {
        	return (
						<>
							{/* Header component passed in from Header */}
							<Header />
							<div className='home'>
								<GoogleMap className='google-map' />
								{/* pass the props into Posts posts={posts}  brings in all the posts created by user onto home page*/}
								<Posts posts={this.state.posts} />

								{/*Sidebar component */}
								<Sidebar />
							</div>
						</>
					);
    }
}

export default Home





