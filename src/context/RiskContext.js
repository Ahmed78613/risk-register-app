import React, { useState, useEffect, createContext } from "react";
import { nanoid } from "nanoid";

const RiskContext = createContext();

export function RiskProvider({ children }) {
	const [riskData, setRiskData] = useState([]);
	const [score, setScore] = useState("None");
	const [lastUpdatedDate, setLastUpdatedDate] = useState();
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		owner: "",
		control: "",
		probability: "low",
		impact: "low",
		riskLevel: "low",
	});

	/* Local Storage GET */
	useEffect(() => {
		// Get Risk Data
		const riskDataTotal = window.localStorage.getItem("riskData");
		riskDataTotal && setRiskData(JSON.parse(riskDataTotal));
		// Get Last Updated Date
		const dateData = window.localStorage.getItem("lastUpdatedDate");
		dateData && setLastUpdatedDate(JSON.parse(dateData));
	}, []);

	/* Local Storage SET */
	useEffect(() => {
		window.localStorage.setItem("riskData", JSON.stringify(riskData));
	}, [riskData]);

	// Update Local Storage "Last Updated Date" after changes
	useEffect(() => {
		window.localStorage.setItem(
			"lastUpdatedDate",
			JSON.stringify(lastUpdatedDate)
		);
	}, [lastUpdatedDate]);

	// Check when data was last updated (Added/Removed/Modified)
	const updateLastChangedDate = () => {
		const todaysDate = new Date().toLocaleDateString("en-us", {
			month: "numeric",
			day: "numeric",
			year: "numeric",
		});
		setLastUpdatedDate(todaysDate);
	};

	// If a NEW user then set todays date
	if (!lastUpdatedDate) updateLastChangedDate();

	// Get Overall Score | High = 1, Medium = 0.5, low = 0.25
	const getOverallScore = () => {
		if (riskData.length === 0) return setScore("None");

		const lowAmount =
			riskData.filter((item) => item.riskLevel === "low").length * 0.25;
		const MediumAmount =
			riskData.filter((item) => item.riskLevel === "medium").length * 0.5;
		const HighAmount =
			riskData.filter((item) => item.riskLevel === "high").length * 1;

		const totalScore = lowAmount + MediumAmount + HighAmount;
		const totalRisks = riskData.map((item) => item.riskLevel === "high").length;

		if (totalScore >= (80 / 100) * totalRisks) {
			// 80%
			setScore("Very Bad");
		} else if (
			totalScore >= (60 / 100) * totalRisks &&
			totalScore < (80 / 100) * totalRisks
		) {
			// 60% - 79%
			setScore("Bad");
		} else if (
			totalScore >= totalRisks / 2 &&
			totalScore < (60 / 100) * totalRisks
		) {
			// 40% - 59%
			setScore("Ok");
		} else {
			// 40% or Less
			setScore("Good");
		}
	};

	// Remove Risk
	const removeRisk = (e, currentId) => {
		e.preventDefault();
		setRiskData((prevData) => prevData.filter((item) => item.id !== currentId));
		// Update "Last Updated" Date
		updateLastChangedDate();
	};

	// Update existing Risk
	const updateRisk = (e, currentId) => {
		const { name, value } = e.target;
		setRiskData((prevData) =>
			prevData.map((item) =>
				item.id === currentId ? { ...item, [name]: value } : item
			)
		);
		// Update "Last Updated" Date
		updateLastChangedDate();
	};

	// Reorder data after Prioritizing
	const reorderDataRisk = (newOrderedArray) => {
		setRiskData(newOrderedArray);
	};

	// Form data for a new risk
	const updateCurrentFormData = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value, id: nanoid() }));
	};

	// Saves new risk to Data
	const addNewRisk = (e, formData) => {
		e.preventDefault();
		setRiskData((prevState) => [...prevState, formData]);
		// Update "Last Updated" Date
		updateLastChangedDate();
	};

	return (
		<RiskContext.Provider
			value={{
				riskData,
				score,
				lastUpdatedDate,
				formData,
				updateLastChangedDate,
				getOverallScore,
				removeRisk,
				updateRisk,
				reorderDataRisk,
				updateCurrentFormData,
				addNewRisk,
			}}
		>
			{children}
		</RiskContext.Provider>
	);
}

export default RiskContext;
