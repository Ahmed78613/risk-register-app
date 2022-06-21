import React, { useState, useContext } from "react";
import styles from "../sass/components/popup.module.scss";
import RiskContext from "../context/RiskContext";
import DarkModeContext from "../context/DarkModeContext";
import Select from "react-select";

const Remove = ({ removeView }) => {
	const { riskData, removeRisk } = useContext(RiskContext);
	const { darkMode } = useContext(DarkModeContext);
	const [removeId, setRemoveId] = useState();

	// Set Remove Id
	const setRemoveRiskId = (e) => {
		const id = e.value;
		setRemoveId(id);
	};

	// Select Style
	const selectStyle = {
		option: (provided, state) => ({
			...provided,
			borderBottom: "1px solid #1d1d1d",
			padding: "0.5em 1em",
			color: "#1d1d1d",
		}),
	};

	return (
		<div className={styles.popup}>
			<div
				className={`${styles.popupContainer} ${darkMode} ${styles.allowOverflow}`}
			>
				<i
					className={`fa-solid fa-xmark ${styles.closeBtn}`}
					onClick={removeView}
				></i>
				<h1>Remove risk</h1>

				{/* If no risks, don't show form*/}
				{riskData.length ? (
					<>
						<p>
							Nice job removing the risk, or if you added it accidentally...
							well good job anyways.
						</p>
						<form
							className={styles.removeForm}
							onSubmit={(e) => {
								removeRisk(e, removeId);
								removeView();
							}}
						>
							<label htmlFor="name">Name</label>
							<Select
								className={styles.dropdown}
								type="text"
								name="name"
								id="name"
								onChange={(e) => setRemoveRiskId(e)}
								required
								options={riskData.map((risk) => ({
									value: risk.id,
									label: risk.name,
								}))}
								styles={selectStyle}
							/>

							<input
								type="button"
								value="Cancel"
								onClick={removeView}
								className={styles.cancelBtn}
							/>
							<input
								type="submit"
								value="Remove"
								className={styles.submitBtn}
							/>
						</form>
					</>
				) : (
					<p>
						Good news! You don't have any risks to remove. If you want to add
						some risks to your register please add them before you try to remove
						them again.
					</p>
				)}
			</div>
		</div>
	);
};

export default Remove;
