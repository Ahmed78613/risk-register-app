import React, { useState, useEffect, useContext } from "react";
import styles from "../sass/pages/view.module.scss";
import { Link } from "react-router-dom";
import DarkModeContext from "../context/DarkModeContext";
import RiskContext from "../context/RiskContext";

function View() {
	const { darkMode } = useContext(DarkModeContext);
	const {
		riskData,
		updateRisk,
		removeRisk,
		score,
		lastUpdatedDate,
		getOverallScore,
	} = useContext(RiskContext);

	const [highRisks, setHighRisks] = useState();
	const [totalRisks, setTotalRisks] = useState();
	const [daysSinceUpdate, setDaysSinceUpdate] = useState(0);

	// If risk data is changed, recalculate all risk stats
	useEffect(() => {
		getHighRisksQty();
		getTotalRisksQty();
		getDaysSinceUpdate();
		getOverallScore();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [riskData]);

	// Calculates date difference
	const getDaysSinceUpdate = () => {
		const todaysDate = new Date().toLocaleDateString("en-us", {
			month: "numeric",
			day: "numeric",
			year: "numeric",
		});
		if (lastUpdatedDate) {
			const diffInMonths = new Date(todaysDate) - new Date(lastUpdatedDate);
			const diffInDays = diffInMonths / (1000 * 60 * 60 * 24);
			setDaysSinceUpdate(diffInDays);
		} else {
			return;
		}
	};

	// Get Quantity of High Risks from Data
	const getHighRisksQty = () => {
		const qty = riskData.filter((item) => item.riskLevel === "high").length;
		setHighRisks(qty);
	};
	// Get Quantity of High Risks from Data
	const getTotalRisksQty = () => {
		const levels = riskData.map((item) => item.riskLevel === "high").length;
		setTotalRisks(levels);
	};

	// Score Border
	let scoreBorder;
	if (score === "Very Bad" || score === "Bad") {
		scoreBorder = { border: "8px solid #e3b3b3" };
	} else if (score === "Ok") {
		scoreBorder = { border: "8px solid #ebd5c1" };
	} else {
		scoreBorder = { border: "8px solid #b2e2b1" };
	}

	// High Risks Border
	const highRisksBorder =
		highRisks > 0
			? { border: "8px solid #e3b3b3" }
			: { border: "8px solid #b2e2b1" };

	// Total Risks Border
	const totalRisksBorder =
		totalRisks > 0
			? { border: "8px solid #e3b3b3" }
			: { border: "8px solid #b2e2b1" };

	// All Risks -> JSX
	const dataArray = riskData.map((item) => (
		<form
			className={styles.dataItem}
			key={item.id}
			onChange={(e) => updateRisk(e, item.id)}
		>
			<button className={styles.remove} onClick={(e) => removeRisk(e, item.id)}>
				<i className="fa-solid fa-circle-minus"></i>
			</button>
			<input type="text" name="name" defaultValue={item.name} />
			<textarea name="description" defaultValue={item.description} />
			<textarea name="control" defaultValue={item.control} />
			<input type="text" name="owner" defaultValue={item.owner} />
			<select name="probability" defaultValue={item.probability}>
				<option value="low">Low</option>
				<option value="medium">Medium</option>
				<option value="high">High</option>
			</select>
			<select name="impact" defaultValue={item.impact}>
				<option value="low">Low</option>
				<option value="medium">Medium</option>
				<option value="high">High</option>
			</select>
			<select name="riskLevel" defaultValue={item.riskLevel}>
				<option value="low">Low</option>
				<option value="medium">Medium</option>
				<option value="high">High</option>
			</select>
		</form>
	));

	return (
		<div className={`${styles.view} ${darkMode}`}>
			<div className={styles.topStats}>
				<div className={styles.statsLeft}>
					<div className={styles.stat}>
						<span className={styles.circle} style={scoreBorder}>
							{score}
						</span>
						<h3>Overall score</h3>
					</div>
					<div className={styles.stat}>
						<span className={styles.circle} style={highRisksBorder}>
							{highRisks}
						</span>
						<h3>High Risk Issues</h3>
					</div>
					<div className={styles.stat}>
						<span className={styles.circle} style={totalRisksBorder}>
							{totalRisks}
						</span>
						<h3>Total Risks</h3>
					</div>
				</div>
				<div className={styles.statsRight}>
					<div className={styles.rightTop}>
						<h1>View all</h1>
						<Link to="/dashboard">Go back</Link>
					</div>
					<div className={styles.rightBottom}>
						<p className={`${styles.bottomStat} container`}>
							Current Priority:
							<span>{riskData.length > 0 ? riskData[0].name : "None"}</span>
						</p>
						<p className={`${styles.bottomStat} container`}>
							Last Updated:{" "}
							<span>{`${
								daysSinceUpdate > 0 ? daysSinceUpdate + " Day/s ago" : "Today"
							} (${lastUpdatedDate})`}</span>
						</p>
					</div>
				</div>
			</div>
			<div className={`${styles.database} container`}>
				<div className={styles.labels}>
					<h4>Name</h4>
					<h4>Description</h4>
					<h4>Control</h4>
					<h4>Owner</h4>
					<h4>Probability</h4>
					<h4>Impact</h4>
					<h4>Risk Level</h4>
				</div>
				<div className={styles.data}>{dataArray}</div>
			</div>
		</div>
	);
}

export default View;
