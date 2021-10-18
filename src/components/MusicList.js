import React, { useEffect, useState } from "react";
import MusicPlayer from "./MusicPlayer";
import music from "../music/2.mp3";
import def from '../image/default.jpg'
import "../css/player.css";
import axios from "axios";
import upload from "../Layouts/upload-solid.svg";
//background: linear-gradient(45deg, rgba(29,45,253,1) 0%, rgba(252,69,119,1) 100%);
//"linear-gradient(45deg, rgba(253,29,29,1) 0%, rgba(252,176,69,1) 100%)"
//background: linear-gradient(45deg, rgba(1,193,0,1) 0%, rgba(242,252,69,1) 100%);

const background = [
	"linear-gradient(45deg, rgba(29,45,253,1) 0%, rgba(252,69,119,1) 100%)",
	"linear-gradient(45deg, rgba(253,29,29,1) 0%, rgba(252,176,69,1) 100%)",
	"linear-gradient(45deg, rgba(1,193,0,1) 0%, rgba(242,252,69,1) 100%)",
	"radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,37,174,1) 0%, rgba(241,147,55,1) 53.4%, rgba(250,237,56,1) 99.5% )",
	"radial-gradient( circle farthest-corner at 10% 20%,  rgba(14,174,87,1) 0%, rgba(12,116,117,1) 90% )",
];

export default function MusicList(props) {
	const uploadRef = React.useRef();
	const [song, setSong] = React.useState(null);
	const [play, setPlay] = React.useState(true);
	const [id, setid] = useState(null);

	const [list, setList] = useState([]);
	const [err, setErr] = useState(null);

	const [url, setUrl] = useState(null);
	useEffect(() => {
		const options = {
			method: "GET",
			url: "https://shazam.p.rapidapi.com/songs/list-artist-top-tracks",
			params: { id: "40008598", locale: "en-US" },
			headers: {
				"x-rapidapi-host": "shazam.p.rapidapi.com",
				"x-rapidapi-key": "304675b686msh91c199ed67e8c8ap1f1bbfjsnfd3153b540ee",
			},
		};

		let res_list = []

		axios
			.request(options)
			.then(function (response) {
				res_list = response.data.tracks
				setList(response.data.tracks);
			})
			.catch(function (error) {
				console.log(error.response);
				setErr(error.response);
			});


	}, []);


	console.log(list)

	if(err){
	    return <h1 style={{textTransform:"uppercase",alignSelf:"center"}}>{err.statusText}</h1>
	}

	let index = 0;

	if(!list){
	    return <h2>Loading!</h2>
	}

	// console.log(url)
	return (
		<div>
			<MusicPlayer url={url} play={play} id={id} />
			<div
				style={{
					position: "relative",
					top: "10vh",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						width: "60px",
						border: "2px solid white",
						padding: "10px",
						borderRadius: "50%",
						cursor: "pointer",
					}}
					onClick={(e) => {
						uploadRef.current.click();
					}}
				>
					<img src={upload} alt={"Upload"} className="upload-icon" />
					<input
						type="file"
						accept="audio/*"
						style={{ display: "none" }}
						ref={uploadRef}
						onChange={(e) => {
							setUrl(URL.createObjectURL(e.target.files[0]));
							console.log(URL.createObjectURL(e.target.files[0]))

							let new_music = {
								hub: {
									actions: [null, {uri: URL.createObjectURL(e.target.files[0])}],
								},
								title: "Nothing",
								images:{
									coverart : null
								}
							};
							setSong(url);
							setPlay(!play);
							setid(true);
						}}
					/>
				</div>
			</div>
			{/* <div
				className="music"
				style={{ background: background[0], color: "white" }}
				onMouseOver = {(e)=>{

					let x = e.clientX - e.target.offsetLeft - 40
					let y = e.clientY - e.target.offsetTop - 40

					console.log(x,y)

					let ripples = document.createElement('span');
					ripples.style.left = x + 'px';
					ripples.style.top = y + 'px';

					console.log(ripples)

					e.target.appendChild(ripples);
				}}
				onClick={() => {
					setSong(music);
					setPlay(!play);
					setid(true);
				}}
			>
				<div
					className="list-container"
					style={{ marginTop: "15%", marginRight: "10%", marginLeft: "10%" }}
				>
					<p style={{ textAlign: "center", fontSize: "12px" }}>By - Hello</p>
				</div>
			</div> */}
			<div className="music-list">
				{list.map((li, index) => (
					<div
						className="music"
						style={{
							background: background[index % background.length],
							color: "white",
						}}
						onMouseOver={(e) => {
							let x = e.clientX - e.target.offsetLeft - 40;
							let y = e.clientY - e.target.offsetTop - 40;


							let ripples = document.createElement("span");
							ripples.style.left = x + "px";
							ripples.style.top = y + "px";

							e.target.appendChild(ripples);
						}}
						onClick={() => {
							console.log(li.hub.actions[1].uri)
							setSong(li.hub.actions[1].uri);
							setUrl(li.hub.actions[1].uri);
							setPlay(!play);
							setid(true);
						}}
					>
						<p style={{ display: "none" }}>{(index = (index + 1) % 3)}</p>
						<div
							className="list-container"
							style={{
								marginTop: "15%",
								marginRight: "10%",
								marginLeft: "10%",
							}}
						>
							<h6
								className="list-name"
								style={{
									textAlign: "center",
									fontSize: li.title.length >= 18 ? "10px" : "15px",
									marginLeft: "12px",
									marginRight: "10px",
									textTransform: "capitalize",
								}}
							>
								{li.title}
							</h6>
							<p style={{ textAlign: "center", fontSize: "12px" }}>
								By - {li.subtitle}
							</p>
						</div>
						<img
							className="list-covertart"
							src={li.images.coverart ? li.images.coverart : def}
							alt="list-art"
						/>
					</div>
				))}
			</div>
		</div>
	);
}
