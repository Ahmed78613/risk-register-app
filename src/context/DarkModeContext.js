import React, { useState, useEffect, createContext } from "react";

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
	const [darkMode, setDarkMode] = useState("light");

	// Switch between Light & Dark mode
	const changeDarkMode = () => {
		setDarkMode((prevState) => (prevState === "light" ? "dark" : "light"));
	};

	/***** Local Storage *****/
	// Set Dark Mode
	useEffect(() => {
		window.localStorage.setItem("darkMode", JSON.stringify(darkMode));
	}, [darkMode]);
	useEffect(() => {
		// Get Dark Mode
		const darkModeData = window.localStorage.getItem("darkMode");
		darkModeData && setDarkMode(JSON.parse(darkModeData));
	}, []);

	return (
		<DarkModeContext.Provider value={{ darkMode, changeDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
}

export default DarkModeContext;
