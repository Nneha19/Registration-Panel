import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";
import PhoneDropDown from "../components/PhoneDropDown";
import CountryDropDown from "../components/CountryDropDown";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { useState } from "react";

export default function ProfileDetails() {
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");

  const [address, setAddress] = useState("");
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleNavigate = () => {
    navigate("/IndividualDetails");
  };

  // Update the selected phone number
  const handlePhoneChange = (value) => {
    setSelectedPhoneNumber(value);
  };

  // Update the selected country
  const handleCountryChange = (selectedCountry) => {
    setSelectedCountry(selectedCountry);
  };

  // Handle form submission to save profile details
  const handleProfileDetails = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    const userDocRef = doc(collection(db, "registration"), uid);

    const profileDetailsCollection = collection(userDocRef, "Profile_Details");
    const profileDocRef = doc(profileDetailsCollection, "Profile");
    await setDoc(profileDocRef, {
      Address: address,
      Country: selectedCountry,
      Phone: selectedPhoneNumber,
    });

    navigate("/BankDetails");
  };

  return (
    <>
      {/* Header with back button */}
      <div className="flex text-center justify-between p-10">
        <div
          className="flex text-center cursor-pointer"
          onClick={handleNavigate}
        >
          <img src="arrow_back.png" className="h-5 pt-1" alt="" />
          <h2 className="text-[#8692A6] font-medium">Back</h2>
        </div>
        <div className="text-right">
          <h3 className="text-[#BDBDBD]">STEP 02/03</h3>
          <h1 className="text-[#8692A6] font-medium">Residency Info.</h1>
        </div>
      </div>

      {/* Profile and form for entering profile details */}
      <div className="sm:p-20 p-10 sm:mr-20">
        <Profile />
        <form onSubmit={handleProfileDetails} className="flex flex-col pr-30">
          <div className="mt-5 flex flex-col">
            <label htmlFor="fullName" className="text-[#696F79]">
              Phone number
            </label>

            {/* PhoneDropDown component with selected phone number and onChange handler */}
            <PhoneDropDown
              phoneValue={selectedPhoneNumber}
              onChange={handlePhoneChange}
            />
          </div>

          <div className="mt-5 flex flex-col">
            <label htmlFor="address" className="text-[#696F79]">
              Your address
            </label>
            {/* Input field for address */}
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border-2 border-[#BDBDBD] p-3  outline-blue-600 focus:shadow-lg mt-2 h-18 rounded-md"
              placeholder="Please enter address"
              required
            />
          </div>

          <div className="mt-5 flex flex-col">
            <label htmlFor="address" className="text-[#696F79]">
              Country of residence
            </label>
            {/* CountryDropDown component with selected country and onChange handler */}
            <CountryDropDown
              value={selectedCountry}
              onChange={handleCountryChange}
            />
          </div>

          <button
            className="mt-8 font-medium bg-blue-600 text-white p-4 rounded-md"
            type="submit"
          >
            Save & Continue
          </button>
        </form>

        <div className="flex items-center justify-center mt-5 gap-2 p-3 text-[#8692A6]">
          <img src="lock.png" alt="" className="" />
          <h3>Your Info is safely secured</h3>
        </div>
      </div>
    </>
  );
}
