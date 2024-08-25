import React from "react";
import { ReactComponent as CloseIcon } from "../assets/close icon.svg";
import "./Approval.css";

const Approval = ({ onClose, requests, onApprove, onDeny }) => {
  return (
    <div className="approval-modal">
      <div className="approval-modal-header">
        <h2>אישורים</h2>
        <button className="approval-close-button" onClick={onClose}>
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
              <button className="approve-button" onClick={onApprove}>
                אישור
              </button>
              <button className="deny-button" onClick={onDeny}>
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
