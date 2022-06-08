import { useState } from "react";
import "./dropdown.css";

const Dropdown = ({type, setType}) => {
  const [isActive, setIsActive] = useState(false);
  const options = ["Repos", "Users", "Issues"];
  return (
    <div className="dropdown">
      <div className="btn-container">
        <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
          {type || "Choose One"}
        </div>
        <div className="caret-container">
          <svg
            className="caret"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z" />
          </svg>
        </div>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              key={option}
              className="dropdown-item"
              onClick={(e) => {
                setIsActive(false);
                setType(option)
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

// { selected, setSelected }
//
// setSelected(option);