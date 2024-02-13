import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Login() {
  const navigate = useNavigate();

  // Function to navigate to the registration page
  const handleCreateAccount = () => {
    navigate("/");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDetails = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userDetails);
      localStorage.setItem("token", userDetails.accessToken);
      localStorage.setItem("user", JSON.stringify(userDetails.user));
      navigate("/Home");
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle Google sign-in
  const loginwithGoogle = async (e) => {
    try {
      const provider = new GoogleAuthProvider();
      const userDetails = await signInWithPopup(auth, provider);
      console.log(userDetails);
      localStorage.setItem("uid", userDetails.user.uid);
      localStorage.setItem("token", userDetails.accessToken);
      localStorage.setItem("user", JSON.stringify(userDetails.user));
      navigate("/Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="text-right p-10">
        <span
          className="text-blue-500 font-medium cursor-pointer"
          onClick={handleCreateAccount}
        >
          Create an Account
        </span>
      </div>

      <div className="sm:p-20 p-10 sm:mr-20">
        <h1 className="sm:text-3xl text-xl font-bold">Login Account!</h1>
        <p className="text-[#8692A6] mt-3 text-md sm:text-xl">
          Please ensure that you accurately provide the required information.
        </p>
        <hr className="mt-6" />

        {/* Login form */}
        <form action="" className="flex flex-col pr-30" onSubmit={handleSubmit}>
          <div className="mt-5 flex flex-col">
            <label htmlFor="emailaddress" className="text-[#696F79]">
              Email address*
            </label>
            <input
              value={email}
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-[#BDBDBD] p-3  outline-blue-600 focus:shadow-lg mt-2 h-18 rounded-md"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="mt-5 flex relative flex-col">
            <label htmlFor="password" className="text-[#696F79]">
              Enter password*
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2  border-[#BDBDBD] outline-blue-600 focus:shadow-lg p-3 mt-2 h-18 rounded-md"
              placeholder="Enter password"
              required
            />
            <label
              type="button"
              className="cursor-pointer 
                 absolute bottom-[14px] right-[12px]"
              onClick={handleShowPassword}
            >
              {showPassword ? "Hide" : "Show"}
            </label>
          </div>

          <button
            className="mt-10 font-medium bg-blue-600 text-white p-4 rounded-md"
            type="sumit"
          >
            Login Account
          </button>

          {/* Password separator and or text */}
          <div className="flex justify-center text-center mt-5 gap-3">
            <div className="border-b border-gray-300 h-2 w-[16rem] mt-2" />
            <span className="text-[#8692A6] text-xl">or</span>
            <div className="border-b border-gray-300 h-2 w-[16rem] mt-2" />
          </div>
        </form>

        {/* Google sign-in button */}
        <button
          style={{ width: "-webkit-fill-available" }}
          className="mt-4 font-medium shadow-md p-4 rounded-md"
          onClick={loginwithGoogle}
        >
          <div className="flex sm:gap-10 gap-3 justify-center text-center">
            <img src="google.png" alt="" />
            <h3>Login with Google</h3>
          </div>
        </button>
      </div>
    </>
  );
}
