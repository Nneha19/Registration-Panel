import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Signin from "./pages/Signin";
import IndividualDetails from "./pages/IndividualDetails";
import BusinessDetails from "./pages/BusinessDetails";
import ProfileDetails from "./pages/ProfileDetails";
import BankDetails from "./pages/BankDetails";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <div className="lg:flex sm:flex-row h-[100vh]">
      <div className="lg:w-1/2">
        <About />
      </div>
      <div className='className="w-1/2 lg:w-1/2 sm:w-full'>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/individualdetails" element={<IndividualDetails />} />
          <Route path="profiledetails" element={<ProfileDetails />} />
          <Route path="bankdetails" element={<BankDetails />} />
          <Route path="/businessdetails" element={<BusinessDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
