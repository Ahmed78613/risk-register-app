import React, { useContext } from "react";
import styles from "../sass/components/popup.module.scss";
import RiskContext from "../context/RiskContext";
import DarkModeContext from "../context/DarkModeContext";

const Add = ({ addView }) => {
	const { formData, updateCurrentFormData, addNewRisk } =
		useContext(RiskContext);
	const { darkMode } = useContext(DarkModeContext);

	return (
		<div className={styles.popup}>
			<div className={`${styles.popupContainer} ${darkMode}`}>
				<i
					className={`fa-solid fa-xmark ${styles.closeBtn}`}
					onClick={addView}
				></i>
				<h1>Add a new risk</h1>

				<form
					className={styles.addForm}
					onSubmit={(e) => {
						addNewRisk(e, formData);
						addView();
					}}
				>
					<div>
						<label htmlFor="name">Name</label>
						<input
							type="text"
							name="name"
							id="name"
							onChange={updateCurrentFormData}
							required
						/>
						<label htmlFor="description">Description</label>
						<textarea
							type="text"
							id="description"
							name="description"
							onChange={updateCurrentFormData}
							required
						/>
					</div>

					<div>
						<label htmlFor="owner">Owner</label>
						<input
							type="text"
							id="owner"
							name="owner"
							onChange={updateCurrentFormData}
							required
						/>
						<label htmlFor="control">Control</label>
						<input
							type="text"
							id="control"
							name="control"
							onChange={updateCurrentFormData}
							required
						/>
						<label htmlFor="probability">Probability</label>
						<select
							id="probability"
							name="probability"
							onChange={updateCurrentFormData}
							required
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
							defaultValue={"low"}
							required
						>
							<option disabled>Select a level</option>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
						<div className={styles.buttons}>
							<input
								type="button"
								value="Cancel"
								onClick={addView}
								className={styles.cancelBtn}
							/>
							<input
								type="submit"
								value="Submit"
								className={styles.submitBtn}
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Add;
