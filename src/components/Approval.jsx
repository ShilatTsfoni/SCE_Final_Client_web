import React from "react";
import { ReactComponent as CloseIcon } from "../assets/close icon.svg";
import "./Approval.css";

// updates the status of the request
const updateRequestStatus = async (requestId, action) => {
  try {
    const url = `http://127.0.0.1:8000/api/applications/${requestId}/${action}/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(
        `Request ${requestId} ${
          action === "approve" ? "approve" : "decline"
        } successfully.`
      );
      return true; // Return true on success
    } else {
      console.error(`Failed to ${action} request with ID ${requestId}`);
      return false; // Return false on failure
    }
  } catch (error) {
    console.error(
      `Error ${action === "approve" ? "approving" : "declining"} request:`,
      error
    );
    return false; // Return false on error
  }
};

const Approval = ({ onClose, requests, onApprove, onDeny }) => {
  const handleApprove = async (requestId) => {
    const success = await updateRequestStatus(requestId, "approve");
    if (success) onApprove(requestId); // Show the success toast message if successful
  };

  const handleDeny = async (requestId) => {
    const success = await updateRequestStatus(requestId, "decline");
    if (success) onDeny(requestId); // Show the success toast message if successful
  };

  const handleClose = () => {
    onClose();
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="approval-modal">
      <div className="approval-modal-header">
        <h2>אישורים</h2>
        <button className="approval-close-button" onClick={handleClose}>
          <CloseIcon />
        </button>
      </div>
      <div className="approval-modal-content">
        {requests.map((request) => (
          <div key={request.id} className="approval-request">
            <img
              src={request.profilePic}
              alt={request.name}
              className="approval-profile-pic"
            />
            <div className="request-info">
              <div className="request-name">{request.name}</div>
              {/* <div className="request-role">{request.role}</div>
              <div className="request-type">{request.type}</div> */}
            </div>
            <div className="request-actions">
              <button
                className="approve-button"
                onClick={() => handleApprove(request.id)}
              >
                אישור
              </button>
              <button
                className="deny-button"
                onClick={() => handleDeny(request.id)}
              >
                ביטול
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Approval;
