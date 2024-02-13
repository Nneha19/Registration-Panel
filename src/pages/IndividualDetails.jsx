import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";

export default function IndividualDetails() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDetails = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(userDetails);

      const db = getFirestore();
      const userDocRef = doc(
        collection(db, "registration"),
        userDetails.user.uid
      );
      await setDoc(userDocRef, {
        
        User_Id: userDetails.user.uid,
      });

      const accountDetailsCollection = collection(
        userDocRef,
        "Account_Details"
      );
      const accountDocRef = doc(accountDetailsCollection, "Account");
      await setDoc(accountDocRef, {
        Account_Type: "individual",
        Email: userDetails.user.email,
        U_id: userDetails.user.uid,
        Name: name,
      });

      localStorage.setItem("uid", userDetails.user.uid);
      localStorage.setItem("token", userDetails.accessToken);
      localStorage.setItem("user", JSON.stringify(userDetails.user));
      navigate("/ProfileDetails");
    } catch (error) {
      console.log(error);
    }
  };

  // Signing in with Google
  const handleGoogleAuth = async (e) => {
    try {
      const provider = new GoogleAuthProvider();
      const userDetails = await signInWithPopup(auth, provider);
      const db = getFirestore();
      const userDocRef = doc(
        collection(db, "registration"),
        userDetails.user.uid
      );
      await setDoc(userDocRef, {
        User_Id: userDetails.user.uid,
      });

      const accountDetailsCollection = collection(
        userDocRef,
        "Account_Details"
      );
      const accountDocRef = doc(accountDetailsCollection, "Account");
      await setDoc(accountDocRef, {
        Account_Type: "individual",
        Email: userDetails.user.email,
        U_id: userDetails.user.uid,
        Name: userDetails.user.displayName,
      });

      console.log(userDetails);
      localStorage.setItem("uid", userDetails.user.uid);
      localStorage.setItem("token", userDetails.accessToken);
      localStorage.setItem("user", JSON.stringify(userDetails.user));
      navigate("/ProfileDetails");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Code for rendering the back button */}
      <div className="flex text-center justify-between p-10">
        <div
          className="flex text-center cursor-pointer"
          onClick={handleNavigate}
        >
          <img src="arrow_back.png" className="h-5 pt-1" alt="" />
          <h2 className="text-[#8692A6] font-medium">Back</h2>
        </div>
        <div className="text-right">
          <h3 className="text-[#BDBDBD]">STEP 01/03</h3>
          <h1 className="text-[#8692A6] font-medium">Personal Info.</h1>
        </div>
      </div>

      {/* Code for rendering the registration form */}
      <div className="sm:p-20 p-10 sm:mr-20">
        <h1 className="sm:text-3xl text-xl font-bold">
          Register Individual Account!
        </h1>
        <p className="text-[#8692A6] mt-3 text-md sm:text-xl">
          For the purpose of industry regulation, your details are required.
        </p>
        <hr className="mt-6" />
        <form onSubmit={handleSubmit} className="flex flex-col pr-30">
          <div className="mt-5 flex flex-col">
            <label htmlFor="fullName" className="text-[#696F79]">
              Your fullname*
            </label>
            <input
              type="text"
              id="fullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-[#BDBDBD]  outline-blue-600 focus:shadow-lg p-3 mt-2 h-18 rounded-md"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="mt-5 flex flex-col">
            <label htmlFor="emailaddress" className="text-[#696F79]">
              Email address*
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-[#BDBDBD] p-3  outline-blue-600 focus:shadow-lg mt-2 h-18 rounded-md"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="mt-5 flex relative flex-col">
            <label htmlFor="password" className="text-[#696F79]">
              Create password*
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

          <div className="mt-5 flex ">
            <input
              type="checkbox"
              id="show-password"
              className="float-left mr-2"
              required
            />
            <h4 className="text-[#696F79] font-medium text-sm md:text-base">
              I agree to terms & conditions
            </h4>
          </div>
          <button
            className="mt-8 font-medium bg-blue-600 text-white p-4 rounded-md"
            type="submit"
          >
            Register Account
          </button>

          <div className="flex justify-center text-center mt-5 gap-3">
            <div
              className="border-b border-gray-300 h-2
               w-[16rem] mt-2"
            ></div>
            <span className="text-[#8692A6] text-xl">or</span>
            <div className="border-b border-gray-300 h-2 w-[16rem] mt-2"></div>
          </div>
        </form>

        {/* Code for rendering the Google sign-in button */}
        <button
          style={{ width: "-webkit-fill-available" }}
          className="mt-4 font-medium shadow-md p-4 rounded-md"
          onClick={handleGoogleAuth}
        >
          <div className="flex sm:gap-10 gap-3 justify-center text-center">
            <img src="google.png" alt="" />
            <h3>Register with Google</h3>
          </div>
        </button>
      </div>
    </>
  );
}
