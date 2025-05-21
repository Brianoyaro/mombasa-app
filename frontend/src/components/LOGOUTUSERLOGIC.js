import React from "react";
import { useNavigate } from "react-router-dom";


// import { setCurrentUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { useSelector } from "react-redux";

const LogoutUserLogic = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);

    const handleLogout = () => {
        localStorage.removeItem("token");
        // Clear user data from Redux store
        dispatch(logoutUser());

        // Redirect to login page
        navigate("/login");
        // OR
        // window.location.href = "/login";
    };

  return (
    <div>
        <h1>Welcome, {user ? user.username : "Guest"}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
export default LogoutUserLogic;