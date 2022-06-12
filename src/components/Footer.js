import React from "react";
import { Link } from "react-router-dom";
import styles from "../sass/components/footer.module.scss";
import duckImg from "../images/duck.svg";

function Footer() {
	// Back To Top Button
	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer className={styles.mainFooter}>
			<button className={styles.toTop} onClick={scrollTop}>
				<i className={`fas fa-arrow-alt-circle-up`}></i>
				<p>Back to top</p>
			</button>

			<div className={styles.links}>
				<Link to="/">Home</Link>
				<Link to="/dashboard">Dashboard</Link>
				<Link to="/contact">Contact</Link>
			</div>

			<div className={styles.socials}>
				<a href="https://www.linkedin.com/in/ahmed-muhammed-/">
					<i className={`fab fa-linkedin`}></i>
				</a>
				<a href="https://github.com/Ahmed78613">
					<i className={`fab fa-github-square`}></i>
				</a>
			</div>

			<p>Copyright &copy; 2022 Ahmed Muhammed</p>
			<img className={styles.duck} src={duckImg} alt="duck flying" />
		</footer>
	);
}

export default Footer;
