import React from "react";
import { useEffect, useRef, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { commonStyles } from "../../Styles";

const genderItems = [
  { label: "Female", value: "Female" },
  { label: "Male", value: "Male" },
];

export const GenderInput = ({ value, onChange }) => {
  const [gender, setGender] = useState(value);
  const [open, setOpen] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    setGender(value);
  }, [value]);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    onChange(gender);
  }, [gender]);

  return (
    <DropDownPicker
      listMode="SCROLLVIEW"
      open={open}
      value={gender}
      items={genderItems}
      setOpen={setOpen}
      setValue={setGender}
      placeholder="Select an Gender"
      style={commonStyles.dropdown}
      textStyle={commonStyles.dropdownText}
      dropDownContainerStyle={commonStyles.dropdownContainer}
    />
  );
};
