import "./header.css"

export default function header() {
    return (
			<div className="header">
				<div className="headerTitles">
					<span className="headerTitleSm">Andys</span>
					<span className="headerTitleLg">Blog Page</span>
				</div>
				<img
					src="https://wallpapercave.com/wp/wp3924888.jpg"
					alt=""
					className="headerImg"
				/>
			</div>
		);
}
