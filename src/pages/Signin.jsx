import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const [IndividualActive, setIndividualActive] = useState(true);
  const [BusinessActive, setBusinessActive] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleIndividual = async (e) => {
    if (!IndividualActive) {
      setIndividualActive(true);
      setBusinessActive(false);
    }
    setTimeout(() => {
      navigate("/individualdetails");
    }, 200);
  };

  const handleBusiness = () => {
    if (!BusinessActive) {
      setBusinessActive(true);
      setIndividualActive(false);
    }
    setTimeout(() => {
      navigate("/businessdetails");
    }, 200);
  };

  return (
    <>
      <div className="text-right p-10">
        <h2 className="text-gray-600 text-sm sm:text-base">
          Already have an account?&nbsp;
          <span
            className="text-blue-500 font-medium cursor-pointer"
            onClick={handleLogin}
          >
            Sign In
          </span>
        </h2>
      </div>
      <div className="p-[55px] pl-[75px] sm:mt-[67px]">
        <h3 className="font-bold  text-2xl sm:text-4xl">Join Us!</h3>
        <h5 className="mt-4 text-gray-600  sm:text-xl ">
          {" "}
          To begin this journey, tell us what type of account you’d be opening.
        </h5>
        <div className="flex flex-col gap-5 mt-10">
          <div
            className={`flex h-30 items-center gap-3 p-5 sm:w-[420px] bg-white rounded-md shadow-md cursor-pointer ${
              IndividualActive ? "border border-blue-500  bg-blue-500" : ""
            }`}
            onClick={handleIndividual}
          >
            <img src="individual.png" className="h-10 lg:h-auto" alt="" />
            <div>
              <h2 className="font-semibold">Individual</h2>
              <p className="text-gray-600">
                Personal account to manage all you activities.
              </p>
            </div>
            <img src="arrow_right.png" alt="" />
          </div>
          <div
            className={`flex h-30 items-center gap-3 p-5 sm:w-[420px] bg-white rounded-md shadow-md cursor-pointer ${
              BusinessActive ? "border border-blue-500 bg-blue-500" : ""
            }`}
            onClick={handleBusiness}
          >
            <img src="business.png" alt="" className="h-10 lg:h-auto" />
            <div>
              <h2 className="font-semibold">Business</h2>
              <p className="text-gray-600">
                Own or belong to a company, this is for you.
              </p>
            </div>
            <img src="arrow_right.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
