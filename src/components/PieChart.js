import React, { useState, useEffect, useContext } from "react";
import RiskContext from "../context/RiskContext";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Legend, Tooltip);

const PieChart = () => {
	const { riskData } = useContext(RiskContext);
	const [low, setLow] = useState();
	const [medium, setMedium] = useState();
	const [high, setHigh] = useState();

	useEffect(() => {
		setHigh(riskData.filter((risk) => risk.riskLevel === "high").length);
		setMedium(riskData.filter((risk) => risk.riskLevel === "medium").length);
		setLow(riskData.filter((risk) => risk.riskLevel === "low").length);
	}, [riskData]);

	// Empty
	const emptyData = {
		labels: ["None", "Low", "Medium", "High"],
		datasets: [
			{
				data: [1, 0, 0, 0],
				backgroundColor: ["#c6bdc6", "#b2e2b1", "#ebd5c1", "#e3b3b3"],
				hoverOffset: 2,
				borderWidth: 1,
			},
		],
	};

	// When there is risk Data
	const filledData = {
		labels: ["Low", "Medium", "High"],
		datasets: [
			{
				data: [low, medium, high],
				backgroundColor: ["#b2e2b1", "#ebd5c1", "#e3b3b3"],
				hoverOffset: 2,
				borderWidth: 1,
			},
		],
	};

	// Chosen data set
	const data = low || medium || high ? filledData : emptyData;

	const options = {
		aspectRatio: 2,
		responsive: true,
		plugins: {
			legend: {
				position: "right",
			},
			tooltip: {
				enabled: true,
			},
		},
	};

	return <Doughnut data={data} options={options}></Doughnut>;
};

export default PieChart;
