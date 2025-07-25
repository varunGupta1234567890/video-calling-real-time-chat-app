import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="navbar navbar-expand  border-bottom  shadow-sm" style={{ height: "64px", zIndex: 1030,backgroundColor:"" }}>
      <div className="container-fluid d-flex align-items-center justify-content-between" style={{backgroundColor:""}}>

        {/* LOGO - Only in Chat Page */}
        {isChatPage && (
          <Link to="/" className="d-flex align-items-center text-decoration-none gap-2 ps-3">
            <ShipWheelIcon size={40} className="text-primary" />
            <span className="fs-3 fw-bold font-monospace text-primary">Streamify</span>
          </Link>
        )}

        <div className="d-flex align-items-center gap-3 ms-auto me-3">

          {/* Notifications */}
          <Link to="/notifications" className="btn btn-light rounded-circle p-2">
            <BellIcon size={20} className="text-secondary" />
          </Link>

          {/* Theme Switcher */}
          <ThemeSelector />

          {/* Avatar */}
          <div className="rounded-circle overflow-hidden border" style={{ width: "36px", height: "36px" }}>
            <img
              src={authUser?.profilePic}
              alt="User Avatar"
              className="img-fluid"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>

          {/* Logout */}
          <button className="btn btn-light rounded-circle p-2" onClick={logoutMutation}>
            <LogOutIcon size={20} className="text-danger" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
