import React, { useState, useEffect, useContext } from "react";
import styles from "../sass/pages/dashboard.module.scss";
import { Link } from "react-router-dom";
import DarkModeContext from "../context/DarkModeContext";
import RiskContext from "../context/RiskContext";
import Add from "../components/Add";
import Remove from "../components/Remove";
import Modify from "../components/Modify";
import Priorities from "../components/Priorities";
import PieChart from "../components/PieChart";

function Dashboard() {
	const { darkMode } = useContext(DarkModeContext);
	const { riskData, score, getOverallScore, lastUpdatedDate } =
		useContext(RiskContext);
	const [notes, setNotes] = useState("");
	// Popups
	const [add, setAdd] = useState(false);
	const [remove, setRemove] = useState(false);
	const [modify, setModify] = useState(false);
	const [priorities, setPriorities] = useState(false);
	// Score & Stats Bar Colors
	const [scoreBar, setScoreBar] = useState();
	const [impactBar, setImpactBar] = useState();
	const [ProbabilityBar, setProbabilityBar] = useState();
	const [riskLevelBar, setRiskLevelBar] = useState();

	// Get Notes data on Page Load
	useEffect(() => {
		const notesData = window.localStorage.getItem("notes");
		if (notesData) {
			setNotes(JSON.parse(notesData));
		}
	}, []);

	// Update ALL stats when risk data is updated
	useEffect(() => {
		getOverallScore();
		calculateAverage(riskData, "impact", setImpactBar);
		calculateAverage(riskData, "probability", setProbabilityBar);
		calculateAverage(riskData, "riskLevel", setRiskLevelBar);
		updateScoreBar(score, setScoreBar);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [riskData, score]);

	// Save notes to local Storage
	useEffect(() => {
		window.localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	/* Popup View (Add, Remove, Modify) */
	const addView = () => {
		setAdd((prevState) => !prevState);
	};
	const removeView = () => {
		setRemove((prevState) => !prevState);
	};
	const modifyView = () => {
		setModify((prevState) => !prevState);
	};
	const prioritiesView = () => {
		setPriorities((prevState) => !prevState);
	};

	// Update Notes
	const updateNotes = (e) => {
		setNotes(e.target.value);
	};

	/* Average Calculator */
	const calculateAverage = (riskData, stat, setUpdate) => {
		const lowQty = riskData.filter((risk) => risk[stat] === "low").length;
		const mediumQty = riskData.filter((risk) => risk[stat] === "medium").length;
		const highQty = riskData.filter((risk) => risk[stat] === "high").length;

		if (!lowQty && !mediumQty && !highQty) {
			setUpdate({ backgroundColor: "#c6bdc6" });
		} else if (highQty >= mediumQty && highQty >= lowQty) {
			setUpdate({ backgroundColor: "#e3b3b3" });
		} else if (mediumQty >= lowQty && mediumQty >= lowQty) {
			setUpdate({ backgroundColor: "#ebd5c1" });
		} else {
			setUpdate({ backgroundColor: "#b2e2b1" });
		}
	};

	// Score
	const updateScoreBar = (stat, setUpdate) => {
		stat === "Very Bad"
			? setUpdate({ backgroundColor: "#e34b4b", width: "25%" })
			: stat === "Bad"
			? setUpdate({ backgroundColor: "#e3b3b3", width: "40%" })
			: stat === "Ok"
			? setUpdate({ backgroundColor: "#ebd5c1", width: "60%" })
			: stat === "Good"
			? setUpdate({ backgroundColor: "#b2e2b1", width: "90%" })
			: setUpdate({ backgroundColor: "#c6bdc6" });
	};

	// Hide Menu if any menu popups on screen
	const HideMenu = add || remove || modify || priorities ? false : true;

	return (
		<main className={`${styles.dashboard} ${darkMode}`}>
			{/* Left Menu */}
			{HideMenu && (
				<div className={styles.menu}>
					<button className={styles.menuBtn} onClick={addView}>
						<i className="fa-solid fa-circle-plus"></i>
						Add
					</button>
					<button className={styles.menuBtn} onClick={removeView}>
						<i className="fa-solid fa-circle-minus"></i>
						Remove
					</button>
					<button className={styles.menuBtn} onClick={modifyView}>
						<i className="fa-solid fa-pen-to-square"></i>
						Modify
					</button>
					<button className={styles.menuBtn} onClick={prioritiesView}>
						<i className="fa-solid fa-list-ol"></i>
						Prioritize
					</button>
					<Link to="/view" className={styles.menuBtn}>
						<i className="fa-solid fa-eye"></i>
						View
					</Link>
				</div>
			)}

			{/* Top Info */}
			<div className={styles.dash}>
				<div className={styles.info}>
					<div className={styles.infoTop}>
						<h1>Dashboard</h1>
						<div className={`${styles.riskLevels} container`}>
							<div className={styles.level}>
								<span></span>
								<h3>Low</h3>
							</div>
							<div className={styles.level}>
								<span></span>
								<h3>Medium</h3>
							</div>
							<div className={styles.level}>
								<span></span>
								<h3>High</h3>
							</div>
						</div>
					</div>

					<p>
						Use our risk register, a risk management-based methodology for your
						risk management needs. Fulfil regulatory compliance by acting as a
						repository for all risks identified and including additional
						information about each risk.
					</p>
				</div>
			</div>

			{/* Risks, Score & Stats */}
			<div className={styles.top}>
				<div className={`${styles.risks} container`}>
					<div className={styles.heading}>
						<h2>Risks</h2>
						<i className="fa-solid fa-circle-exclamation"></i>
					</div>
					<div className={styles.details}>
						<div className={styles.pieChart}>
							<PieChart />
						</div>
					</div>
				</div>
				<div className={`${styles.score} container`}>
					<div className={styles.heading}>
						<h2>Score</h2>
						<i className="fa-solid fa-star"></i>
					</div>
					<div className={styles.details}>
						<h4>{score}</h4>
						<div className={styles.scoreBar}>
							<div className={styles.innerBar} style={scoreBar}></div>
						</div>
						<p>
							Last Updated: <span>{lastUpdatedDate}</span>
						</p>
					</div>
				</div>
				<div className={`${styles.stats} container`}>
					<div className={styles.heading}>
						<h2>
							Stats <span>(Average)</span>
						</h2>
						<i className="fa-solid fa-bolt"></i>
					</div>
					<div className={styles.details}>
						<p>Probability</p>
						<div className={styles.statsBar} style={ProbabilityBar}></div>
						<p>Impact</p>
						<div className={styles.statsBar} style={impactBar}></div>
						<p>Risk Level</p>
						<div className={styles.statsBar} style={riskLevelBar}></div>
					</div>
				</div>
			</div>

			{/* Notes & Priority */}
			<div className={styles.bottom}>
				<div className={styles.notes}>
					<div className={styles.heading}>
						<h2>Notes</h2>
						<i className="fa-solid fa-square-poll-horizontal"></i>
					</div>
					<div className={styles.details}>
						<textarea
							placeholder="Enter your notes here"
							defaultValue={notes}
							onChange={updateNotes}
						/>
					</div>
				</div>
				<div className={`${styles.priority} container`}>
					<div className={styles.heading}>
						<h2>
							Priority <span>(Top 5)</span>
						</h2>
						<i className="fa-solid fa-arrow-down-wide-short"></i>
					</div>
					<div className={styles.details}>
						{riskData.length > 0 ? (
							<>
								{riskData.map(
									(risk, index) => index < 5 && <p key={risk.id}>{risk.name}</p>
								)}
							</>
						) : (
							<h3>Your top 5 priority risks will appear here</h3>
						)}
					</div>
				</div>
			</div>

			{/* Left Menu Buttons*/}
			{add && <Add addView={addView} />}
			{remove && <Remove removeView={removeView} />}
			{modify && <Modify modifyView={modifyView} />}
			{priorities && <Priorities prioritiesView={prioritiesView} />}
		</main>
	);
}

export default Dashboard;
