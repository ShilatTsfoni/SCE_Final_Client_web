import React, { useState } from "react";
import { ReactComponent as FullRateIcon } from "../assets/full rate icon.svg";
import { ReactComponent as EmptyRateIcon } from "../assets/empty rate icon.svg";
import { ReactComponent as SearchIcon } from "../assets/search icon.svg";
import RankSelection from "../components/RankSelection";
import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile3.jpg";
import "./Volunteers.css";

const volunteersData = [
  {
    id: 1,
    name: "יעל כהן",
    photo: profile1,
    city: "תל אביב",
    email: "yaelcohen@gmail.com",
    phone: "0523968524",
    status: "לא פעיל",
    shifts: "0/9",
    rate: 3,
  },
  {
    id: 2,
    name: "דני כהן",
    photo: profile2,
    city: "באר שבע",
    email: "danicohen@gmail.com",
    phone: "0521234567",
    status: "פעיל",
    shifts: "8/8",
    rate: 4,
  },
  {
    id: 3,
    name: "רוני כהן",
    photo: profile3,
    city: "אופקים",
    email: "ronicohen@gmail.com",
    phone: "0526543210",
    status: "פעיל",
    shifts: "16/16",
    rate: 5,
  },
  // Add more volunteers as needed
];

const Volunteers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedVolunteers, setSelectedVolunteers] = useState({});
  const [volunteers, setVolunteers] = useState(volunteersData);
  const [showRankSelection, setShowRankSelection] = useState(null);

  const handleSelectAll = () => {
    if (!selectAll) {
      const newSelected = {};
      volunteersData.forEach((volunteer) => {
        newSelected[volunteer.id] = true;
      });
      setSelectedVolunteers(newSelected);
    } else {
      setSelectedVolunteers({});
    }
    setSelectAll(!selectAll);
  };

  const handleSelect = (id) => {
    setSelectedVolunteers((prev) => {
      const newSelected = { ...prev };
      if (newSelected[id]) {
        delete newSelected[id];
      } else {
        newSelected[id] = true;
      }
      if (Object.keys(newSelected).length === volunteersData.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
      return newSelected;
    });
  };

  const handleRankSelection = (volunteerId, rank) => {
    setVolunteers((prevVolunteers) =>
      prevVolunteers.map((volunteer) =>
        volunteer.id === volunteerId ? { ...volunteer, rate: rank } : volunteer
      )
    );
  };

  const filteredVolunteers = searchTerm
    ? volunteersData.filter((volunteer) => {
        const term = searchTerm.toLowerCase();
        return (
          volunteer.name.toLowerCase().includes(term) ||
          volunteer.phone.includes(term) ||
          volunteer.city.toLowerCase().includes(term) ||
          volunteer.email.toLowerCase().includes(term) ||
          volunteer.status.toLowerCase().includes(term) ||
          volunteer.rate.toString().includes(term)
        );
      })
    : volunteersData;

  return (
    <div className="volunteer-table">
      <div className="header">
        <h1>מתנדבים</h1>
        <div className="search-box">
          <SearchIcon />
          <input
            type="text"
            placeholder="שם טלפון וכו"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="table">
        <div className="table-header">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <span>מתנדבים</span>
          <span>טלפון</span>
          <span>עיר</span>
          <span>מייל</span>
          <span>סטטוס</span>
          <span>דירוג</span>
        </div>
        {filteredVolunteers.map((volunteer) => (
          <div className="table-row" key={volunteer.id}>
            <input
              type="checkbox"
              checked={!!selectedVolunteers[volunteer.id]}
              onChange={() => handleSelect(volunteer.id)}
            />
            <div className="name-photo">
              <img
                src={volunteer.photo}
                alt={volunteer.name}
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              <span>{volunteer.name}</span>
            </div>
            <span>{volunteer.phone}</span>
            <span>{volunteer.city}</span>
            <span>{volunteer.email}</span>
            <div className="status-column">
              {volunteer.status}
              <br />
              {volunteer.shifts} משמרות
            </div>{" "}
            <div className="rating">
              <div className="stars">
                {Array.from({ length: 5 }, (_, index) =>
                  index < volunteer.rate ? (
                    <FullRateIcon key={index} />
                  ) : (
                    <EmptyRateIcon key={index} />
                  )
                ).reverse()}
              </div>
              <button
                className="rate-button"
                onClick={(e) => {
                  const buttonRect = e.target.getBoundingClientRect();
                  setShowRankSelection({
                    volunteerId: volunteer.id,
                    buttonRect,
                  });
                }}
              >
                דרג
              </button>
              {showRankSelection &&
                showRankSelection.volunteerId === volunteer.id && (
                  <div
                    className="rank-selection-wrapper"
                    style={{
                      position: "absolute",
                      top: `${
                        showRankSelection.buttonRect.bottom + window.scrollY
                      }px`,
                      left: `${
                        showRankSelection.buttonRect.left + window.scrollX - 150
                      }px`, // Adjusted to position to the left
                    }}
                  >
                    <RankSelection
                      volunteerId={volunteer.id}
                      onSelectRank={handleRankSelection}
                      closeWindow={() => setShowRankSelection(null)}
                      initialRank={volunteer.rate}
                    />
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Volunteers;
