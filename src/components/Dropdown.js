import React, { useState } from "react";

const Dropdown = (props) => {
  
  const [selectValue, setSelectValue] = useState("");
  const dropdownChanged = (e) => {
    props.changed(e.target.value);
  };
  return (
    <div>
      <select
        value={props?.selectValue}
        onChange={(e) => {
          setSelectValue(e.target.value);
        }}
        onChange={dropdownChanged}
        className="select-genres"
        placeholder="Seleccione Género"
      >
        <option readOnly>Seleccione opcion</option>
        {props?.options?.map((item) => (
          <option key={item.name} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
