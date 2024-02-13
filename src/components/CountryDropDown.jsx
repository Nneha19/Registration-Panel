import React, { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

export default function CountryDropDown({ value = "", onChange }) {
  const options = useMemo(() => countryList().getData(), []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "4px",
    }),
  };

  return (
    <Select
      options={options}
      className="border-2 border-[#BDBDBD] outline-blue-600 focus:shadow-lg mt-2 h-18 rounded-md"
      styles={customStyles}
      placeholder="Please select"
      required
      value={options.find((option) => option.value === value)}
      onChange={(selectedOption) => onChange(selectedOption.label)}
    />
  );
}
