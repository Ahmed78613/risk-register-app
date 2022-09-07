import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import styles from "../sass/components/navbar.module.scss"
import DarkModeContext from "../context/DarkModeContext"

function Navbar() {
	const { darkMode, changeDarkMode } = useContext(DarkModeContext)
	const [navOpen, setNavOpen] = useState(false)
	const [width, setWidth] = useState(false)

	// Open/Close Nav
	const updateNav = () => {
		setNavOpen((prevState) => !prevState)
	}

	window.addEventListener("resize", () => {
		setWidth(window.innerWidth)
		// Close navbar if width > 768px
		width > 768 && setNavOpen(false)
	})

	// Dark Mode Icon Toggle Between
	const light = {
		right: "unset",
		left: "-3px",
		position: "absolute",
		fontSize: "24px",
		color: "white",
		textShadow: "0 0 12px black",
	}

	const dark = {
		left: "unset",
		right: "-3px",
		position: "absolute",
		fontSize: "24px",
		color: "#363636",
		textShadow: "0 0 12px black",
	}

	return (
		<nav className={styles.navbar}>
			<Link to="/risk-register-app" className={styles.logo}>
				Risk Reverse
			</Link>
			<div
				className={navOpen && width < 768 ? styles.rightActive : styles.right}
			>
				<Link to="/risk-register-app">Home</Link>
				<Link to="/dashboard">Dashboard</Link>
				<Link to="/contact">Contact</Link>
				<button onClick={changeDarkMode}>
					<i
						className="fa-solid fa-circle"
						style={darkMode === "light" ? light : dark}
					></i>
				</button>
			</div>
			<div className={styles.menu} onClick={updateNav}>
				<span className={styles.bar}></span>
				<span className={styles.bar}></span>
				<span className={styles.bar}></span>
			</div>
		</nav>
	)
}

export default Navbar
