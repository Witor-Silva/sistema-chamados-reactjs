import { Routes, Route } from "react-router-dom";

import SignIn from "../pages/SignIn";
// import SignOut from '../pages/SignOut';
import SignUp from "../pages/SignIn/SignUp";

function RouteApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  );
}

export default RouteApp;
