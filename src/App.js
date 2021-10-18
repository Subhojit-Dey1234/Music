import "./App.css";
import React, { useEffect } from "react";
import HamBurger from "./components/HamBurger";
import SideLayout from "./Layouts/sideLayout";
import MusicList from "./components/MusicList";

function App() {
	const [show, setShow] = React.useState(false);
	useEffect(()=>{
		document.title = "Music Player"
	})
	return (
		<div>
			<div
				style={{cursor:"pointer"}}
				onClick={() => {
					setShow(!show);
				}}
			>
				<HamBurger />
			</div>
			<MusicList/>
			<div>
				<SideLayout show={show}/>
			</div>
		</div>
	);
}

export default App;
