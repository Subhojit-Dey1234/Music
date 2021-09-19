import React from "react";
import Profile from "./3.jpg";
import home from "./home.svg";
import browse from "./browsing.svg";
import album from "./image.svg";
import artist from "./user.svg";
import video from "./video-camera.svg";

export default function SideLayout({show}) {
	return (
		<div>
		<div className={!show ?"overlay":"overlay no"}></div>
		<div className={!show ? "sideLayout closeSlide" : "sideLayout open"}>
			<div className="profile_pictures">
				<img src={Profile} alt="Profile Pictur" className="profile" />
			</div>
			<section className="profile_details">
				<h3>Name</h3>
				<h4 className="email">Email</h4>
			</section>
			<div className="below">
				<span className="list">
					<li>
						<img src={home} className="icon" alt="home" />
						<span className="listname">Home</span>
					</li>
					<li>
						<img src={browse} className="icon" alt="home" />
						<span className="listname">Browse</span>
					</li>
					<li>
						<img src={album} className="icon" alt="home" />
						<span className="listname">Album</span>
					</li>
					<li>
						<img src={artist} className="icon" alt="home" />
						<span className="listname">Artist</span>
					</li>
					<li>
						<img src={video} className="icon" alt="home" />
						<span className="listname">Video</span>
					</li>
				</span>
				<h4 className="myMusic"> MY MUSIC </h4>
				<span>
					<li>
						<img src={home} className="icon" alt="home" />
						<span className="listname">Recently Played</span>
					</li>
					<li>
						<img src={home} className="icon" alt="home" />
						<span className="listname">Local Files</span>
					</li>
				</span>
			</div>
		</div>
		</div>
	);
}
