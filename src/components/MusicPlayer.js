import React, { useEffect, useRef, useState } from "react";
import "../css/player.css";
import "../css/range.css";
import "../css/length.css";
let audioSource, audioContext, analyser,timer;

export default function MusicPlayer({ url, play, id }) {
	console.log(url)
	const [music_url, setUrl] = useState(null);
	const [volume, setVolume] = useState(0);
	const [length,setLength] = useState(0);
	const [playing, setPlaying] = useState(play);
	const canvas = useRef();
	const audio_ref = useRef();
	function setup() {
		const audio = audio_ref.current;
		audio.crossOrigin = "anonymous";
		audioContext = audioContext || new AudioContext();
		audio.play();
		setPlaying(true);
		audioSource = audioSource || audioContext.createMediaElementSource(audio);
		analyser = analyser || audioContext.createAnalyser();

		audioSource.connect(analyser);
		analyser.connect(audioContext.destination);

		analyser.fftSize = 256;

		if (canvas.current) {
			const bufferLength = analyser.frequencyBinCount;
			const dataArray = new Uint8Array(bufferLength);
			const barWidth = canvas.current.width / 2 / bufferLength;
			let barHeight;
			let x = 0;
			function animate() {
				x = 0;
				let ctx = canvas.current.getContext("2d");
				ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
				analyser.getByteFrequencyData(dataArray);

				for (let i = 0; i < bufferLength; i++) {
					barHeight = dataArray[i];
					const red = i * (barHeight / i);
					const blue = i * 10;
					const green = barHeight * 3;
					ctx.fillStyle = `rgb(${red},${blue},${green})`;
					ctx.fillRect(
						canvas.current.width / 2 - x,
						canvas.current.height - barHeight,
						barWidth,
						barHeight,
					);

					x += barWidth;
				}
				for (let i = 0; i < bufferLength; i++) {
					barHeight = dataArray[i];
					const red = i * barHeight;
					const blue = i * 10;
					const green = barHeight / 2;
					ctx.fillStyle = `rgb(${red},${blue},${green})`;
					ctx.fillRect(
						x,
						canvas.current.height - barHeight,
						barWidth,
						barHeight,
					);

					x += barWidth;
				}

				requestAnimationFrame(animate);
			}

			animate();
		}
	}

	useEffect(() => {
		setUrl(url);
		if (url) {
			if (!play) {
				setup();
				setVolume(audio_ref.current.volume * 100);
			} else {
				audio_ref.current.pause();
				setPlaying(false);
			}
		}
	}, [url, play]);

	useEffect(() => {
		// setLength(0)
		console.log(timer)
		if(music_url !== url){
			if(timer){
				console.log("Detected!!")
			}
			// setLength(0)
			clearTimeout(timer)
		}
		if (audio_ref.current) {
			audio_ref.current.src = music_url;
			audio_ref.current.play();
			setPlaying(true);
			
		}
	}, [music_url, url]);

	useEffect(() => {
		if (audio_ref.current) {
			if (playing) {
				audio_ref.current.play();
				setPlaying(true);
			} else {
				audio_ref.current.pause();
				setPlaying(false);
			}
		}
	}, [playing]);

	useEffect(()=>{
		if (audio_ref.current)
		if(!audio_ref.current.paused){
			timer = setTimeout(()=>{
				console.log(length,audio_ref.current.duration)
				// setLength(length + (100 / audio_ref.current.duration));
			},1000)
		}			
	},[length,playing,play])

	if (!url) {
		return <h2 className="canvas loader">Click the BOX to play music</h2>;
	}

	console.log(`Playing - ${timer}`)

	return (
		<div>
			<div className="player">
				<div>
					<canvas className="canvas" width="500" height="300" ref={canvas} />
					<div style={{display:"flex",justifyContent:"center",width:"100vw"}}>
						<div>
						<input
							className="length-scroll"
							value={length}
							type="range"
							min="0"
							max="100"
							step="1"
						/>
						</div>
					</div>
					
				</div>
				<audio onTimeUpdate={()=>{
					if(audio_ref.current){
						console.log(audio_ref.current.currentTime)
						setLength(audio_ref.current.currentTime)
					}
				}} controls id="beep" ref={audio_ref}>
					<source src={url} type="audio/mp3" />
				</audio>
				<div
					style={{ display: "flex", justifyContent: "space-between", width: "50vw",margin:" 0 auto " }}
				>
					<div className="volume" style={{width:"30%"}}>
						{/* <input
							className="length-scroll"
							value={length}
							type="range"
							min="0"
							max="100"
							step="1"
						/> */}
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<label style={{ fontSize: "10px" }}>Volume</label>
							<label style={{ fontSize: "10px" }}>{volume}</label>
						</div>
						<input
							className="volume-scroll"
							value={volume}
							type="range"
							min="0"
							max="100"
							step="1"
							onChange={(e) => {
								console.log(e.target.value);
								setVolume(e.target.value);
								audio_ref.current.volume = e.target.value / 100;
							}}
						/>
					</div>
					<div className="player-back">
					<div className="player-ripple">
						<button
							class="player-play"
							onClick={(e) => {
								setPlaying(!playing);
								let container = document.querySelector('.player-ripple')
								let x = e.clientX - container.offsetLeft;
								let y = e.clientY - (container.offsetTop + 60);


								console.log(container.offsetLeft,container.offsetTop)

								let ripples = document.createElement('span');
								ripples.style.left = x + 'px';
								ripples.style.top = y + 'px';

								console.log(ripples)

								document.querySelector('.player-ripple').appendChild(ripples);
							}}
						>
							{!playing ? `Play` : `Pause`}
						</button>
					</div>
				</div>
				</div>
				
			</div>
		</div>
	);
}
