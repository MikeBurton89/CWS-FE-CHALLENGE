import React from "react";
import styles from "./InputElement.module.css";

export const InputElement = ({
  address,
  setAddress,
  onInputBlur,
  placeholder,
}) => {
  const handleInputChange = (event) => {
    setAddress(event.target.value);
  };
  return (
    <input
      className={styles.inputElement}
      type="text"
      value={address}
      onChange={handleInputChange}
      onBlur={() => onInputBlur(address)}
      placeholder={placeholder}
    />
  );
};
