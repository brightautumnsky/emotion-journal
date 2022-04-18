import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  border: none;
  border-bottom: 1px solid lightgray;
  padding-bottom: 7px;
  &:focus {
    outline: none;
  }
  & + & {
    margin-right: 6px;
  }
`;

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <StyledSelect value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((opt, id) => (
        <option value={opt.value} key={id}>
          {opt.name}
        </option>
      ))}
    </StyledSelect>
  );
};

export default React.memo(ControlMenu);
