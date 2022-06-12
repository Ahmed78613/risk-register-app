import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<DarkModeProvider>
		<Router>
			<App />
		</Router>
	</DarkModeProvider>
);
