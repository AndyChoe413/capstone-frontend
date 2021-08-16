import { Link } from "react-router-dom";
import "./topbar.css";

//functional component does not have this or state
export default function topBar(props) {
console.log(props)
	return (
		<div className="top">
			<div className="topLeft">
				<i className="topIcon fab fa-facebook"></i>
				<i className="topIcon fab fa-twitter-square"></i>
				<i className="topIcon fab fa-instagram"></i>
				<i className="topIcon fab fa-pinterest-square"></i>
			</div>
			<div className="topCenter">
				<ul className="topList">
					<li className="topListItem">
						<Link className="link" to="/">
							HOME
						</Link>
					</li>
					<li className="topListItem">
						<Link className="link" to="/">
							ABOUT
						</Link>
					</li>
					<li className="topListItem">
						<Link className="link" to="/">
							CONTACT
						</Link>
					</li>
					<li className="topListItem">
						<Link className="link" to="/write">
							WRITE
						</Link>
					</li>
					<li className="topListItem"
						//being brought in from App.js as a prop
						onClick={()=>props.handleUserLogout()}>
						{props.user && "LOGOUT"}
					</li>
				</ul>
			</div>
			<div className="topRight">
				{props.user ? (
					<img
						className="topImg"
						src="https://www.sunchasingtravelers.com/wp-content/uploads/2020/09/alegria-beach-drone-view-1024x683.jpg"
						alt=""
					/>
				) : (
					<ul className="topList">
						<li className="topListItem">
							<Link className="link" to="/login">
								LOGIN
							</Link>
						</li>
						<li className="topListItem">
							<Link className="link" to="/register">
								REGISTER
							</Link>
						</li>
					</ul>
				)}
				<i className="topSearchIcon fas fa-search"></i>
			</div>
		</div>
	);
}
