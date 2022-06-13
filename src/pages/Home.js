import React, { useContext } from "react";
import styles from "../sass/pages/home.module.scss";
import illustrationOne from "../images/illustration-1.svg";
import planImg from "../images/plan-mitigate.jpg";
import juggleImg from "../images/juggle.svg";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import DarkModeContext from "../context/DarkModeContext";

function Home() {
	const { darkMode } = useContext(DarkModeContext);

	return (
		<>
			<main className={`${styles.home} ${darkMode}`}>
				<div className={styles.banner}>
					<div className={styles.left}>
						<h1>
							For You. <br />
							For Free.
						</h1>
						<p>
							A free-to-use risk and project management made to fit you and your
							teams needs. <br /> <br />
							Identify potential risks that may exist in your projects and
							manege them with the use of our risk register. Never get surprised
							with a new risk again! Find, plan and mitigate the risk to stay on
							top.
						</p>
						<Link to="/dashboard">Open Dashboard</Link>
					</div>
					<div className={styles.riskImg}></div>
				</div>

				{/* 4 Features Section */}

				<div className={styles.features}>
					<h2>No More Surprises</h2>
					<div className={`${styles.featuresContainer} container`}>
						<div className={styles.item}>
							<h3 className={styles.number}>1</h3>
							<h4>Identify</h4>
							<p>
								Find the associated risks with your project. With or without
								your team.
							</p>
						</div>
						<div className={styles.item}>
							<h3 className={styles.number}>2</h3>
							<h4>Plan</h4>
							<p>
								Create a mitigation strategy to reduce or even better, remove
								the risk.
							</p>
						</div>
						<div className={styles.item}>
							<h3 className={styles.number}>3</h3>
							<h4>Mitigate</h4>
							<p>
								Execute the mitigation plan and then update on here to keep
								everyone updated
							</p>
						</div>
						<div className={styles.item}>
							<h3 className={styles.number}>4</h3>
							<h4>Relax</h4>
							<p>
								Sit back and relax. You won't have a risk creep up on you ever
								again!
							</p>
						</div>
					</div>
				</div>

				{/* Illustration Section */}

				<div className={styles.illustration}>
					<p>
						All the Tools you and your business will ever need in one place.
					</p>
					<div className={styles.graphic}>
						<img src={illustrationOne} alt="Danger outlined"></img>
					</div>
				</div>

				{/* Plan & Mitigate Section */}

				<div className={styles.plan}>
					<div className={styles.imgContainer}>
						<img src={planImg} alt="Team planning" />
					</div>
					<div className={styles.content}>
						<h2>Plan &#38; Mitigate</h2>
						<p>
							Share the responsibilities with you and your projects team and
							work together to create a strategy.
							<br />
							<br /> Follow through with your strategy by prioritizing the
							highest value risks which are indicated using the impact and
							probability matrix.
						</p>
					</div>
				</div>

				{/* Juggle Section */}

				<div className={styles.juggle}>
					<div className={styles.left}>
						<h2>No need to juggle</h2>
						<ul>
							<li>Easy to access</li>
							<li>No Login</li>
							<li>Free</li>
							<li>Plan</li>
							<li>Prioritize</li>
							<li>Mitigate</li>
						</ul>
						<ul>
							<li>Counter Risks</li>
							<li>Manage</li>
							<li>Paper-free</li>
							<li>User friendly</li>
							<li>Update</li>
							<li>Relax</li>
						</ul>
					</div>
					<img
						src={juggleImg}
						alt="cartoon character failing to juggle workload"
					/>
				</div>
			</main>
			<Footer darkMode={darkMode} />
		</>
	);
}

export default Home;
