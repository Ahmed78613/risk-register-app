import React, { useContext } from "react";
import styles from "../sass/components/popup.module.scss";
import RiskContext from "../context/RiskContext";
import DarkModeContext from "../context/DarkModeContext";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Priorities = ({ prioritiesView }) => {
	const { riskData, reorderDataRisk } = useContext(RiskContext);
	const { darkMode } = useContext(DarkModeContext);

	/* Drag & Drop Priorities */
	const handleOnDragEnd = (result) => {
		if (!result.destination) return;
		const items = Array.from(riskData);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		reorderDataRisk(items);
	};

	return (
		<div className={styles.popup}>
			<div className={`${styles.popupContainer} ${darkMode}`}>
				<i
					className={`fa-solid fa-xmark ${styles.closeBtn}`}
					onClick={prioritiesView}
				></i>
				<h1>Prioritize your risks</h1>

				{/* If no risks, don't show form*/}
				{riskData.length ? (
					<div className={styles.priorities}>
						<p>
							Reorder your existing risks so everyone's on the same page. We
							recommend prioritizing the high level risks first.
						</p>
						<div className={styles.priorityLabels}>
							<h3>Name</h3>
							<h3>Impact</h3>
							<h3>Probability</h3>
							<h3>Risk Level</h3>
						</div>
						<DragDropContext onDragEnd={handleOnDragEnd}>
							<Droppable droppableId="priorities">
								{(provided) => (
									<div
										className={styles.priorityContainer}
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										{riskData.map((risk, index) => (
											<Draggable
												key={risk.id}
												draggableId={risk.id}
												index={index}
											>
												{(provided) => (
													<div
														className={styles.priorityItem}
														draggable
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														ref={provided.innerRef}
													>
														<h3>{risk.name} </h3>
														<h3>{risk.probability} </h3>
														<h3>{risk.impact} </h3>
														<h3>{risk.riskLevel} </h3>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>
					</div>
				) : (
					<p>
						You currently don't have any risks to prioritize. After you add some
						risks you can re-order them here in the future.
					</p>
				)}
			</div>
		</div>
	);
};

export default Priorities;
