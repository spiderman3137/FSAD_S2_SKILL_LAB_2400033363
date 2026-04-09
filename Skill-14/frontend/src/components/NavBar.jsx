import { NavLink, useNavigate } from "react-router-dom";
import { clearStoredUser, getStoredUser } from "../utils/session";

function NavBar() {
  const navigate = useNavigate();
  const sessionUser = getStoredUser();

  function handleLogout() {
    clearStoredUser();
    navigate("/login", { replace: true });
  }

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Session Active</p>
        <h1>AuthFlow Portal</h1>
      </div>

      <nav className="nav-links">
        <NavLink
          to="/home"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`.trim()}
        >
          Home
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`.trim()}
        >
          Profile
        </NavLink>
        <button type="button" className="nav-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="user-badge">
        <span>{sessionUser?.fullName || "Logged in user"}</span>
        <small>@{sessionUser?.username}</small>
      </div>
    </header>
  );
}

export default NavBar;

