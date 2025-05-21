import React from "react";
import { useNavigate } from "react-router-dom";




const LogoutUserLogic = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
    const handleLogout = () => {
        localStorage.removeItem("user");
        

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