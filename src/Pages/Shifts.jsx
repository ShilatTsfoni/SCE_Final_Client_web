import React, { useState, useEffect, useRef } from "react";
import "./Shifts.css";
import ShiftCard from "../components/ShiftCard";
import ShiftsNavbar from "../components/ShiftsNavbar";
import AddShift from "../components/AddShift";
import EditShift from "../components/EditShift";
//import shifts from "../data/ShiftsData";
import { ReactComponent as MorningIcon } from "../assets/morning icon.svg";
import { ReactComponent as NoonIcon } from "../assets/noon icon.svg";
import { ReactComponent as EveningIcon } from "../assets/evening icon.svg";
import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile3.jpg";

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

/* // Function to determine the time slot based on the shift time
const getTimeSlot = (time) => {
  const [start, end] = time.split("-").map((t) => t.trim());
  const [startHour] = start.split(":").map(Number);
  const [endHour] = end.split(":").map(Number);
  const [showAddShift, setShowAddShift] = useState(false);

  if (endHour <= 12) return "morning";
  if (endHour <= 18) return "noon";
  return "evening";
}; */

// Utility function to determine the time slot
const getTimeSlot = (time) => {
  const [start, end] = time.split("-").map((t) => t.trim());
  const startHour = parseInt(start.split(":")[0]);
  const endHour = parseInt(end.split(":")[0]);

  if (endHour <= 12) return "morning";
  if (endHour <= 18) return "noon";
  return "evening";
};

// Retrieving information from the server about the user according to his id
const fetchUserById = async (userId) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/account/users/${userId}/`
    );
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};

const fetchApprovalRequests = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/applications/?status=pending"
    );
    const data = await response.json();
    console.log("Approval Requests:", data);
    //setApprovalRequests(data.results); // Saving the received requests
    return data.results; // Return the results of the approval requests
  } catch (error) {
    console.error("Failed to fetch approval requests:", error);
    return [];
  }
};

const Shifts = () => {
  const [, setTick] = useState(0); // State to force rerender
  const [showAddShift, setShowAddShift] = useState(false);
  const [addButtonRef, setAddButtonRef] = useState(null); // To store the ref from Navbar
  const [editShiftData, setEditShiftData] = useState(null); // To store the shift data for editing
  const [approvalRequests, setApprovalRequests] = useState([]); // Saving the confirmation requests received from the server
  const [shifts, setShifts] = useState({});
  const editShiftRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => prev + 1); // Update state every minute to rerender the component
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchShifts(selectedDate);
    //fetchApprovalRequests();
  }, [selectedDate]);

  const profiles = [profile1, profile2, profile3];

  const fetchShifts = async (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    console.log(formattedDate);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/shifts/?start_date_after=${formattedDate}&start_date_before=${formattedDate}`
      );
      const data = await response.json();
      console.log("API response data:", data); // Log the response

      // Extract shifts array from results
      const shiftsArray = data.results || []; // Adjust this line based on the actual structure

      // Ensure data is an array
      if (!Array.isArray(shiftsArray)) {
        throw new Error("API response is not an array");
      }

      // Fetch approval requests
      const approvalRequests = await fetchApprovalRequests();
      setApprovalRequests(approvalRequests);

      // Create an array of promises to fetch user data for each shift manager
      const managerPromises = shiftsArray.map((shift) =>
        fetchUserById(shift.shift_manager)
      );

      // Resolve all promises to get the manager data
      const managersData = await Promise.all(managerPromises);

      const organizedData = shiftsArray.reduce((acc, shift, index) => {
        const shiftDate = new Date(shift.start_date);
        const shiftDay = shiftDate.toISOString().split("T")[0];
        if (shiftDay !== formattedDate) return acc; // Skip shifts not matching the selected date

        const managerData = managersData[index];
        const managerName = managerData
          ? `${managerData.first_name} ${managerData.last_name}`
          : "מנהל לא ידוע";

        // Calculate end time
        const [durationHours, durationMinutes, durationSeconds] = shift.duration
          .split(":")
          .map(Number);
        const endDate = new Date(shiftDate);
        endDate.setHours(endDate.getHours() + durationHours);
        endDate.setMinutes(endDate.getMinutes() + durationMinutes);
        endDate.setSeconds(endDate.getSeconds() + durationSeconds);

        const timeSlot = getTimeSlot(
          `${shiftDate.toISOString().split("T")[1].slice(0, 5)}-${endDate
            .toISOString()
            .split("T")[1]
            .slice(0, 5)}`
        );

        if (!acc[shift.name]) acc[shift.name] = [];

        acc[shift.name].push({
          id: shift.id,
          organization_id: shift.organization_id,
          name: shift.name,
          start_date: shift.start_date,
          organization: shift.organization_id,
          date: shift.start_date,
          time: `${shift.start_date.split("T")[1].slice(0, 5)}-${endDate
            .toISOString()
            .split("T")[1]
            .slice(0, 5)}`, // Format start and end times
          title: shift.name,
          manager: managerName, // Use the full name of the manager
          participants: shift.volunteers.map((volunteer, index) => ({
            name: `Volunteer ${volunteer}`,
            photo: profiles[index % profiles.length], // Use placeholder images
          })),
          totalParticipants: shift.max_volunteers,
          approvalRequests: approvalRequests.filter(
            (request) => request.event === shift.id // filtering requests according to the ID of the shift
          ), // Add real approval requests if available
        });
        return acc;
      }, {});
      console.log("Organized Data:", organizedData); // Log organized data
      setShifts(organizedData);
    } catch (error) {
      console.error("Failed to fetch shifts:", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    //fetchShifts(date);
  };

  const shiftNames = Object.keys(shifts); // Dynamic determination of shift types
  const timeSlots = [
    { label: "morning", icon: MorningIcon, hours: [4, 12] },
    { label: "noon", icon: NoonIcon, hours: [12, 18] },
    { label: "evening", icon: EveningIcon, hours: [18, 3] },
  ];

  // Determine the number of columns dynamically
  const gridTemplateColumns = `150px repeat(${shiftNames.length}, 1fr)`;

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

  const toggleAddShift = (ref) => {
    setAddButtonRef(ref); // Get the ref from Navbar when "+" is clicked
    setShowAddShift(!showAddShift);
  };

  const openEditShift = (position, shift) => {
    const {
      id,
      date,
      time,
      title,
      manager,
      participants,
      totalParticipants,
      name,
      organization_id,
      start_date,
    } = shift;
    const [startTime, endTime] = time.split("-").map((t) => t.trim());

    setEditShiftData({
      id,
      type: title,
      date,
      startTime,
      endTime,
      manager,
      participants: participants.length.toString(),
      location: "",
      description: "",
      name,
      organization_id,
      start_date,
      position: {
        top: position.top + window.scrollY,
        left: position.left,
      },
    });
  };

  const closeEditShift = () => {
    setEditShiftData(null);
  };

  const handleShiftDeleted = (deletedShiftId) => {
    setShifts((prevShifts) => {
      const updatedShifts = { ...prevShifts };
      for (const key in updatedShifts) {
        updatedShifts[key] = updatedShifts[key].filter(
          (shift) => shift.id !== deletedShiftId
        );
      }
      return updatedShifts;
    });
    setEditShiftData(null);
  };

  const getMaxRows = (label) => {
    return Math.max(
      ...shiftNames.map(
        (name) =>
          (
            shifts[name]?.filter(
              (shift) => getTimeSlot(shift.time) === label
            ) || []
          ).length
      )
    );
  };

  return (
    <div className="shifts-container">
      <div className="navbar-wrapper">
        <ShiftsNavbar
          activeVolunteers={"92"}
          staffedShifts={"70%"}
          onAddShiftClick={toggleAddShift}
          onDateChange={handleDateChange} // Pass date change handler
        />
        {showAddShift && (
          <AddShift
            onClose={() => setShowAddShift(false)}
            addButtonRef={addButtonRef}
          />
        )}
      </div>
      <div className="shifts-table-wrapper">
        <div
          className="shifts-table"
          style={{ gridTemplateColumns: gridTemplateColumns }} // Apply dynamic grid columns here
        >
          <div className="shift-type-headers">
            <div className="empty-header"></div>
            {shiftNames.map((name) => (
              <div key={name} className="shift-type-header">
                {name}
              </div>
            ))}
          </div>
          {timeSlots.map(({ label, icon: Icon, hours }, rowIndex) => {
            const maxRows = getMaxRows(label);

            return (
              <div
                key={rowIndex}
                className="time-slot-row"
                style={{ height: `${maxRows * 260 + (maxRows - 1) * 10}px` }}
              >
                <div className="time-slot-header">
                  <Icon
                    style={{
                      filter: isCurrentTimeSlot(hours[0], hours[1])
                        ? "brightness(0) saturate(100%) invert(28%) sepia(93%) saturate(6387%) hue-rotate(207deg) brightness(89%) contrast(100%)"
                        : "none",
                    }}
                  />
                </div>
                {shiftNames.map((name, colIndex) => {
                  const shiftsInSlot =
                    shifts[name]?.filter(
                      (shift) => getTimeSlot(shift.time) === label
                    ) || [];
                  const emptySlots = maxRows - shiftsInSlot.length;

                  return (
                    <div key={colIndex} className="shift-cards-column">
                      {shiftsInSlot.map((shift, i) => (
                        <div key={i} className="shift-card-wrapper">
                          <ShiftCard
                            {...shift}
                            type={name}
                            onEdit={(position) =>
                              openEditShift(position, shift)
                            }
                            approvalRequests={shift.approvalRequests || []} // Pass approval requests
                          />
                        </div>
                      ))}
                      {Array.from({ length: emptySlots }).map((_, index) => (
                        <div
                          key={`empty-${index}`}
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
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {editShiftData && (
        <>
          <div className="backdrop" onClick={closeEditShift}></div>
          <div
            className="edit-shift-container"
            style={{
              position: "absolute",
            }}
          >
            <EditShift
              shiftType={editShiftData.type}
              initialDate={editShiftData.date}
              initialStartTime={editShiftData.startTime}
              initialEndTime={editShiftData.endTime}
              shiftId={editShiftData.id}
              initialName={editShiftData.name}
              iniitalOrganizationId={editShiftData.organization_id}
              initialStartDate={editShiftData.start_date}
              onClose={closeEditShift}
              onShiftDeleted={handleShiftDeleted}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Shifts;
