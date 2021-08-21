import Post from "../post/Post";
import "./posts.css"

//Renders all post by id to home page
export default function Posts({posts}) {
	console.log(posts)
	console.log("post page");
	return (
		<div className="posts">
			{posts.map((post) => {
				// console.log(post._id);
				return <Post key={post._id} post={post} />;
			})}
		</div>
	);
}
