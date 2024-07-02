import React, { useState, useEffect } from "react";
import "./Shifts.css";
import ShiftCard from "../components/ShiftCard";
import ShiftsNavbar from "../components/ShiftsNavbar";
import shifts from "../data/ShiftsData";
import { ReactComponent as MorningIcon } from "../assets/morning icon.svg";
import { ReactComponent as NoonIcon } from "../assets/noon icon.svg";
import { ReactComponent as EveningIcon } from "../assets/evening icon.svg";

/* const shiftData = {
  time: "09:00-12:00",
  title: 'אחמ"ש - עדי כהן',
  participants: [
    { photo: profile1, name: "Participant 1" },
    { photo: profile2, name: "Participant 2" },
    { photo: profile3, name: "Participant 3" },
    { photo: profile1, name: "Participant 1" },
    { photo: profile2, name: "Participant 2" },
    { photo: profile3, name: "Participant 3" },
    { photo: profile1, name: "Participant 1" },
    { photo: profile2, name: "Participant 2" },
    { photo: profile3, name: "Participant 3" },
  ],
  totalParticipants: 16,
}; */

// Function to determine the time slot based on the shift time
const getTimeSlot = (time) => {
  const [start, end] = time.split("-").map((t) => t.trim());
  const [startHour] = start.split(":").map(Number);
  const [endHour] = end.split(":").map(Number);

  if (endHour <= 12) return "morning";
  if (endHour <= 18) return "noon";
  return "evening";
};

const Shifts = () => {
  const [, setTick] = useState(0); // State to force rerender

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => prev + 1); // Update state every minute to rerender the component
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const shiftTypes = Object.keys(shifts); // Dynamic determination of shift types
  const timeSlots = [
    { label: "morning", icon: MorningIcon, hours: [4, 12] },
    { label: "noon", icon: NoonIcon, hours: [12, 18] },
    { label: "evening", icon: EveningIcon, hours: [18, 3] },
  ];

  // Determine the number of columns dynamically
  const gridTemplateColumns = `150px repeat(${shiftTypes.length}, 1fr)`;

  // Function to determine if the current time falls within the given time slot
  const isCurrentTimeSlot = (startHour, endHour) => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    // Adjusted to handle time slots that cross midnight
    if (startHour < endHour) {
      return currentHour >= startHour && currentHour < endHour;
    } else {
      // Handle wrap-around for times like 18:00 to 03:00
      return currentHour >= startHour || currentHour < endHour;
    }
  };

  return (
    <div className="shifts-container">
      <div className="navbar-wrapper">
        <ShiftsNavbar activeVolunteers={"92"} staffedShifts={"70%"} />
      </div>
      <div className="shifts-table-wrapper">
        <div
          className="shifts-table"
          style={{ gridTemplateColumns: gridTemplateColumns }} // Apply dynamic grid columns here
        >
          <div className="shift-type-headers">
            <div className="empty-header"></div>
            {shiftTypes.map((type) => (
              <div key={type} className="shift-type-header">
                {type}
              </div>
            ))}
          </div>
          {timeSlots.map(({ label, icon: Icon, hours }, rowIndex) => (
            <div key={rowIndex} className="time-slot-row">
              <div className="time-slot-header">
                <Icon
                  style={{
                    filter: isCurrentTimeSlot(hours[0], hours[1])
                      ? "brightness(0) saturate(100%) invert(28%) sepia(93%) saturate(6387%) hue-rotate(207deg) brightness(89%) contrast(100%)"
                      : "none",
                  }}
                />
              </div>
              {shiftTypes.map((type, colIndex) => (
                <div key={colIndex} className="shift-cards-column">
                  {shifts[type].filter(
                    (shift) => getTimeSlot(shift.time) === label
                  ).length > 0 ? (
                    shifts[type]
                      .filter((shift) => getTimeSlot(shift.time) === label)
                      .map((shift, i) => (
                        <div key={i} className="shift-card-wrapper">
                          <ShiftCard {...shift} />
                        </div>
                      ))
                  ) : (
                    <div
                      className="empty-slot"
                      style={{
                        width: "380px",
                        height: "260px",
                        padding: "10px",
                        border: "2px solid #FFFFFF",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        borderWidth: "1px 4px 1px 1px",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        overflow: "hidden",
                      }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shifts;
