import React, { useEffect, useRef, useState } from "react";
import "../css/player.css";
let audioSource, audioContext, analyser;

export default function MusicPlayer({ url, play, id }) {
	const [music_url, setUrl] = useState(null);
	const [playing, setPlaying] = useState(play);
	const canvas = useRef();
	const audio_ref = useRef();
	function setup() {
		const audio = audio_ref.current;
		audio.crossOrigin = "anonymous";
		audioContext = audioContext || new AudioContext();
		audio.play();
		setPlaying(true)
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
					const red = i * barHeight;
					const blue = i * 10;
					const green = barHeight / 2;
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
				
			} else {
				audio_ref.current.pause();
				setPlaying(false)
			}
		}
	}, [url, play]);

	useEffect(() => {
		if (audio_ref.current) {
			audio_ref.current.src = music_url;
			audio_ref.current.play();
			setPlaying(true)
		}
	}, [music_url,url]);

	useEffect(() => {
		if (audio_ref.current) {
			if (playing) {
				audio_ref.current.play();
				setPlaying(true)
			} else {
				audio_ref.current.pause();
				setPlaying(false)
			}
		}
	}, [playing]);

	if (!url) {
		return <h2 className="canvas loader">Click the BOX to play music</h2>;
	}

	return (
		<div>
			<div className="player">
				<div>
					<canvas className="canvas" width="500" height="300" ref={canvas} />
				</div>
				<audio controls id="beep" ref={audio_ref}>
					<source src={url} type="audio/mp3" />
				</audio>
			</div>
			<div className="player-back">
			<button class="player-play"
				onClick={() => {
					setPlaying(!playing);
				}}
			>
				{!playing ? `Play` : `Pause` }
			</button>
			</div>
		</div>
	);
}
