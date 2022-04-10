import React from "react";

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((opt, id) => (
        <option value={opt.value} key={id}>
          {opt.name}
        </option>
      ))}
    </select>
  );
};

export default ControlMenu;
