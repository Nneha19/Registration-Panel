import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";
import { useState } from "react";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";

// BankDetails component
export default function BankDetails() {
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");

  const [bvn, setBvn] = useState("");
  const [isValidBvn, setIsValidBvn] = useState(false);

  // Navigate back to ProfileDetails
  const handleNavigate = () => {
    navigate("/ProfileDetails");
  };

  // Handle BVN input change
  const handleBvnChange = (e) => {
    const inputValue = e.target.value;
    const isNumeric = /^[0-9]+$/.test(inputValue);
    const isElevenDigits = inputValue.length >= 11;

    if (isNumeric && isElevenDigits) {
      setIsValidBvn(true);
    } else {
      setIsValidBvn(false);
    }

    setBvn(inputValue);
  };

  // Handle bank details submission
  const handleBankDetails = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    const userDocRef = doc(collection(db, "registration"), uid);

    const bankDetailsCollection = collection(userDocRef, "Bank_Details");
    const bankDocRef = doc(bankDetailsCollection, "Bank");
    await setDoc(bankDocRef, {
      BVN: bvn, // Save the BVN to Firestore
    });
    navigate("/Login");
  };

  return (
    <>
      <div className="flex text-center justify-between p-10">
        <div
          className="flex text-center cursor-pointer"
          onClick={handleNavigate}
        >
          <img src="arrow_back.png" className="h-5 pt-1" alt="" />
          <h2 className="text-[#8692A6] font-medium">Back</h2>
        </div>
        <div className="text-right">
          <h3 className="text-[#BDBDBD]">STEP 03/03</h3>
          <h1 className="text-[#8692A6] font-medium">Bank Verification</h1>
        </div>
      </div>

      <div className="sm:p-20 p-10 sm:mr-20">
        <Profile />

        {/* Bank details form */}
        <form onSubmit={handleBankDetails} className="flex flex-col pr-30">
          <div className="mt-5 flex flex-col relative">
            <label htmlFor="fullName" className="text-[#696F79]">
              Bank verification number (BVN)
            </label>
            <input
              type="text"
              id="Bvn"
              value={bvn}
              maxLength={11}
              onChange={handleBvnChange}
              className="border-2 border-[#BDBDBD] outline-blue-600 focus:shadow-lg p-3 mt-2 h-18 rounded-md "
              placeholder="Enter BVN"
              required
            />

            {isValidBvn && (
              <label htmlFor="" className="absolute bottom-[14px] right-[12px]">
                <img src="checked.png" alt="" />
              </label>
            )}
          </div>

          <button
            className="mt-20 font-medium bg-blue-600 text-white p-4 rounded-md"
            type="submit"
          >
            Save & Continue
          </button>
        </form>

        {/* Security icon */}
        <div className="flex items-center justify-center mt-5 gap-2 p-3 text-[#8692A6]">
          <img src="lock.png" alt="" className="" />
          <h3>Your Info is safely secured</h3>
        </div>
      </div>
    </>
  );
}
