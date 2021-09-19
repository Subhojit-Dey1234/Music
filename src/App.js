import "./App.css";
import React from "react";
import HamBurger from "./components/HamBurger";
import SideLayout from "./Layouts/sideLayout";
import MusicList from "./components/MusicList";

function App() {
	const [show, setShow] = React.useState(false);
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
