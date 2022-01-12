import React, { useState } from "react";

const Dropdown = (props) => {
  const [selectValue, setSelectValue] = useState("");
  const dropdownChanged = (e) => {
    console.log(e.target.value);
    props.changed(e.target.value);
  };
  return (
    <div>
      <select
        value={props.selectValue}
        onChange={(e) => {
          setSelectValue(e.target.value);
        }}
        onChange={dropdownChanged}
      >
        {props.options.map((item) => (
          <option key={item.value} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <p>{selectValue}</p>
    </div>
  );
};

export default Dropdown;
