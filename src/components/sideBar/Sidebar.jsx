import { useEffect, useState } from "react";
import axios from "axios";
import "./sidebar.css"
import { Link } from "react-router-dom";

const URL = "http://localhost:3001";

export default function Sidebar() {
	const [categories, setCats] = useState([]);

	// If you’re familiar with React class lifecycle methods, you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.
	useEffect(() => {
		const getCategories = async () => {
			const result = await axios.get(`${URL}/api/categories`);
			console.log(result)
			setCats(result.data.payload);
		};
		getCategories();
	}, []);

	return (
		<div className="sidebar">
			<div className="sidebarItem">
				<span className="sidebarTitle">ABOUT ME</span>
				<img
					src="https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg"
					alt="selfie"
				/>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</div>
			<div className="sidebarItem">
				<span className="sidebarTitle">CATEGORIES</span>
				<ul className="sidebarList">
					{categories.map((cats) => (
						<Link to={`/?cat=${cats.name}`} key={cats._id} className="link">
							<li className="sidebarListItem">{cats.name}</li>
						</Link>
					))}
				</ul>
			</div>
			<div className="sidebarItem">
				<span className="sidebarTitle">FOLLOW US</span>
				<div className="sidebarSocial">
					<i className="sidebarIcon fab fa-facebook"></i>
					<i className="sidebarIcon fab fa-twitter-square"></i>
					<i className="sidebarIcon fab fa-instagram"></i>
					<i className="sidebarIcon fab fa-pinterest-square"></i>
				</div>
			</div>
		</div>
	);
}
