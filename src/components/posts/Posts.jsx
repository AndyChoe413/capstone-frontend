import Post from "../post/Post";
import "./posts.css"

//Renders all post by id to home page
export default function Posts(props) {
	console.log(props)
	console.log("post page");
	return (
		<div className="posts">
			{props.posts.map((post) => {
				// console.log(post._id);
				return <Post key={post._id} post={post} />;
			})}
		</div>
	);
}
