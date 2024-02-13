import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("uid");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <>
      <div className="sm:p-20 h-[485px] p-10 sm:mr-20">
        <h1 className="sm:text-3xl text-xl font-bold">
          Logged in Successfully!
        </h1>
        <p className="text-[#8692A6] mt-3 text-md sm:text-xl">
          Welcome and enjoy your experience with our platform. If you have any
          questions or need assistance
        </p>
        <button
          className="mt-8 font-medium bg-blue-600 text-white p-4 rounded-md"
          onClick={handleSignOut}
        >
          Log Out
        </button>
      </div>
    </>
  );
}
