import React, { useState } from "react";
import "./RankSelection.css";

const RankSelection = ({
  volunteerId,
  onSelectRank,
  closeWindow,
  initialRank,
}) => {
  const [selectedRank, setSelectedRank] = useState(initialRank);

  return (
    <div className="rank-selection-window">
      <select
        value={selectedRank}
        onChange={(e) => setSelectedRank(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((rank) => (
          <option key={rank} value={rank}>
            {rank}
          </option>
        ))}
      </select>
      <div className="rank-actions">
        <button
          onClick={() => {
            onSelectRank(volunteerId, selectedRank);
            closeWindow();
          }}
        >
          אישור
        </button>
        <button className="cancel-button" onClick={() => closeWindow()}>
          ביטול
        </button>
      </div>
    </div>
  );
};

export default RankSelection;
