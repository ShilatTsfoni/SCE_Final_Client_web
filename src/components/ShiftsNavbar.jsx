import React, { useState } from "react";
import { ReactComponent as RightArrowIcon } from "../assets/right icon.svg";
import { ReactComponent as LeftArrowIcon } from "../assets/left icon.svg";
import { ReactComponent as ArrowDownIcon } from "../assets/errow down icon.svg";
import AddShift from "./AddShift";
import ShiftCard from "./ShiftCard";
import "./ShiftsNavbar.css";

const ShiftsNavbar = ({ activeVolunteers, staffedShifts, onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("יום");
  const [addShiftOpen, setAddShiftOpen] = useState(false);

  const handlePreviousDay = () => {
    const newDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
    setCurrentDate(newDate);
    onDateChange(newDate); // Notify parent about the date change
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    setCurrentDate(newDate);
    onDateChange(newDate); // Notify parent about the date change
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("he-IL", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const togglePicker = () => {
    setPickerOpen(!pickerOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setPickerOpen(false);
  };

  const handleAddShiftClick = () => {
    setAddShiftOpen((prevState) => !prevState);
  };

  const handleCloseAddShift = () => {
    setAddShiftOpen(false);
  };

  return (
    <div className="shift-navbar">
      {addShiftOpen && (
        <div className="overlay" onClick={handleAddShiftClick} />
      )}
      {/*
      <div className="box-percentages">
        <div className="percentages-text">
          <span className="number">{activeVolunteers}</span>
          <span className="label">מתנדבים פעילים</span>
        </div>
        <div className="percentages-text">
          <span className="number">{staffedShifts}</span>
          <span className="label">משמרות מאוישות</span>
        </div>
      </div>
      */}
      <div className="main-navbar-content">
        <div className="current-date-box">
          <LeftArrowIcon className="nav-icon" onClick={handlePreviousDay} />
          <span className="current-date">{formatDate(currentDate)}</span>
          <RightArrowIcon className="nav-icon" onClick={handleNextDay} />
        </div>
        <div className="picker-box">
          <div className="picker-button" onClick={togglePicker}>
            <ArrowDownIcon className="arrow-icon" />
            {selectedOption}
          </div>
          {pickerOpen && (
            <div className="picker-options">
              <div onClick={() => handleOptionClick("יום")}>יום</div>
              <div onClick={() => handleOptionClick("שבוע")}>שבוע</div>
              <div onClick={() => handleOptionClick("חודש")}>חודש</div>
            </div>
          )}
        </div>
      </div>
      <div className="shifts-box">
        <span className="shifts-text">משמרות</span>
        <div className="plus-icon-wrapper">
          <div className="plus-icon" onClick={handleAddShiftClick}>
            +
          </div>
        </div>
      </div>
      {addShiftOpen && <AddShift onClose={handleCloseAddShift} />}
    </div>
  );
};

export default ShiftsNavbar;
