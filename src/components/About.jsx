import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  const NavigationtoHome = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="relative">
        <img className="w-full " src="main_frame.png" alt="" />
      </div>
      <div
        className="absolute top-10 flex flex-col justify-between 
       text-white  ml-10 mt-5 sm:mt-2 sm:ml-20 xs:ml-10 w-30"
      >
        <div className="flex gap-3 cursor-pointer" onClick={NavigationtoHome}>
          <img className="h-8" src="Union.png" alt="logo" />
          <h4 className=" text-2xl font-semibold">Oasis.</h4>
        </div>
        <div className="pt-[75px] pr-[38px] relative sm:pt-[190px] text-base sm:text-xl w-full sm:w-[250px] md:w-[450px]">
          <img
            src="quote.png"
            className="absolute top-[49px] sm:top-[150px]  left-0 h-5 "
            alt="Top Left"
          />
          <p>
            The passage experienced a surge in popularity during the 1960s when
            Letraset used it on their dry-transfer sheets, and again during the
            90s as desktop publishers bundled the text with their software.
          </p>
          <div className="mt-8 flex align-center gap-3">
            <h2 className="">Vincent Obi</h2>
            <img src="checked.png" className="h-5" alt="verified" />
          </div>
          <img
            src="bottom.png"
            className="h-5 absolute bottom-0  pr-[38px]  right-0 "
            alt="Bottom Right"
          />
        </div>
      </div>
    </div>
  );
}
