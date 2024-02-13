import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneDropDown = ({ phoneValue, onChange }) => {
  const [valid, setValid] = useState(true);

  useEffect(() => {
    setValid(validatePhoneNumber(phoneValue));
  }, [phoneValue]);

  const handleChange = (value) => {
    onChange(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <div className="outline-blue-600">
      <PhoneInput
        country={"in"}
        value={phoneValue}
        onChange={handleChange}
        inputProps={{
          required: true,
          style: { width: "-webkit-fill-available" },
          className:
            "border-2 border-[#BDBDBD] outline-blue-600 focus:shadow-lg mt-2 p-3 pl-14 pt-25 rounded-md",
        }}
        buttonStyle={{
          border: "none",
          borderRadius: "5.6px 0 0 5.6px",
          backgroundColor: "white",
          marginTop: "10px",
          marginLeft: "2px",
          marginBottom: "2px",
          padding: "0 0 0 13px",
        }}
        dropdownStyle={{
          borderRadius: "5.6px 0 0 5.6px",
        }}
      />

      <style>
        {`
          .react-tel-input .flag-dropdown {
            display: flex;
            align-items: center;
          }
          .react-tel-input .selected-flag .arrow {
            left: 25px;
          }
        `}
      </style>
    </div>
  );
};

export default PhoneDropDown;
