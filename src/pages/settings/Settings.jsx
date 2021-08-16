import Sidebar from "../../sideBar/Sidebar"
import "./settings.css"

export default function Settings() {
    return (
			<div className="settings">
				<div className="settingsWrapper">
					<div className="settingsTitle">
						<span className="settingsUpdateTitle">Update your account</span>
						<span className="settingsDeleteTitle">Delete Account</span>
					</div>
					<form className="settingsForm">
						<label>Profile Picture</label>
						<div className="settingsProfilePic">
							<img
								src="https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg"
								alt="profile pix"
							/>
							<label htmlFor="fileInput">
								<i className="profilePicIcon far fa-user"></i>
							</label>
							<p>Click to update photo</p>
							<input type="file" id="fileInput" style={{ display: "none" }} />
						</div>
						<label>Username</label>
						<input type="text" placeholder="Username" />
						<label>Email</label>
						<input type="text" placeholder="Email" />
						<label>Password</label>
						<input type="text" placeholder="Password" />
						<button className="settingsSubmit">Update</button>
					</form>
				</div>
				<Sidebar />
			</div>
		);
}
