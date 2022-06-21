import React, { useState, useContext } from "react";
import styles from "../sass/components/popup.module.scss";
import RiskContext from "../context/RiskContext";
import DarkModeContext from "../context/DarkModeContext";
import Select from "react-select";
import { Link } from "react-router-dom";

const Modify = ({ modifyView }) => {
	const { riskData, updateRisk, updateCurrentFormData } =
		useContext(RiskContext);
	const { darkMode } = useContext(DarkModeContext);
	const [modifyId, setModifyId] = useState();

	// Set Modify Id
	const setModifyRiskId = (e) => {
		const id = e.value;
		setModifyId(id);
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
			<div className={`${styles.popupContainer} ${darkMode}`}>
				<i
					className={`fa-solid fa-xmark ${styles.closeBtn}`}
					onClick={modifyView}
				></i>
				<h1>Modify</h1>

				{/* If no risks, don't show form*/}
				{riskData.length ? (
					<>
						<p>
							Select the existing name of the risk or click on the View all
							button and edit there instead.
						</p>
						<form
							className={styles.modifyForm}
							onSubmit={(e) => {
								modifyView();
							}}
						>
							<label htmlFor="oldName">Existing Name</label>
							<div className={styles.existing}>
								<Select
									placeholder="Select an existing risk"
									options={riskData.map((risk) => ({
										value: risk.id,
										label: risk.name,
									}))}
									onChange={(e) => setModifyRiskId(e)}
									required
									styles={selectStyle}
								/>

								<Link to="/view" className={styles.viewAllBtn}>
									<i className="fa-solid fa-eye"></i>
									View all
								</Link>
							</div>
						</form>

						<hr />
						{riskData.map(
							(risk) =>
								risk.id === modifyId && (
									<form
										className={styles.modifyBottom}
										key={risk.id}
										onChange={(e) => {
											updateRisk(e, risk.id);
										}}
										onSubmit={(e) => {
											e.preventDefault();
											modifyView();
										}}
									>
										<h2>Update to</h2>

										<div className={styles.modifyLeft}>
											<label htmlFor="name">Name</label>
											<input
												type="text"
												name="name"
												id="name"
												onChange={updateCurrentFormData}
												required
												defaultValue={risk.name}
											/>
											<label htmlFor="description">Description</label>
											<textarea
												type="text"
												id="description"
												name="description"
												onChange={updateCurrentFormData}
												required
												defaultValue={risk.description}
											/>
										</div>

										<div className={styles.modifyRight}>
											<label htmlFor="owner">Owner</label>
											<input
												type="text"
												id="owner"
												name="owner"
												onChange={updateCurrentFormData}
												required
												defaultValue={risk.owner}
											/>
											<label htmlFor="control">Control</label>
											<input
												type="text"
												id="control"
												name="control"
												onChange={updateCurrentFormData}
												required
												defaultValue={risk.control}
											/>
											<label htmlFor="probability">Probability</label>
											<select
												id="probability"
												name="probability"
												onChange={updateCurrentFormData}
												required
												defaultValue={risk.probability}
											>
												<option disabled>Select a level</option>
												<option value="low">Low</option>
												<option value="medium">Medium</option>
												<option value="high">High</option>
											</select>
											<label htmlFor="impact">Impact</label>
											<select
												id="impact"
												name="impact"
												onChange={updateCurrentFormData}
												required
												defaultValue={risk.impact}
											>
												<option disabled>Select a level</option>
												<option value="low">Low</option>
												<option value="medium">Medium</option>
												<option value="high">High</option>
											</select>
											<label htmlFor="risk">Risk level</label>
											<select
												id="risk"
												name="riskLevel"
												onChange={updateCurrentFormData}
												required
												defaultValue={risk.riskLevel}
											>
												<option disabled>Select a level</option>
												<option value="low">Low</option>
												<option value="medium">Medium</option>
												<option value="high">High</option>
											</select>
											<input
												type="submit"
												value="Done"
												className={styles.doneBtn}
											/>
										</div>
									</form>
								)
						)}
					</>
				) : (
					<p>
						You haven't added any risks yet. Please add some and then if you
						would like you can modify them later.
					</p>
				)}
			</div>
		</div>
	);
};

export default Modify;
