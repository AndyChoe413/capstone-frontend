import { Link } from "react-router-dom";
import "./post.css"

//Renders each post created by user passed as props within the home page
export default function post({post}) {
    return (
			<div className="post">
				{/* this should be where we post the photo if there is one supplied else the img file.  use ternary to check */}
				<img
					className="postImg"
					src="https://static.boredpanda.com/blog/wp-content/uploads/2014/04/cherry-blossom-sakura-coverimage.jpg"
					alt=""
				/>

				<div className="postInfo">
					<div className="postCategories">
						{post.categories.map((cats) => (
							<span className="postCategories">{cats.name}</span>
						))}
					</div>
					{/* redirects page to single post when clicked that matches id of post from react router dom*/}
					<Link to={`/post/${post._id}`} className="link">
						<span className="postTitle">{post.title}</span>
					</Link>
					<hr />
					<span className="postDate">
						{/* new Date reformats date */}
						{new Date(post.createdAt).toDateString()}
					</span>
				</div>
				<p className="postDesc">{post.desc}</p>
			</div>
		);
}
