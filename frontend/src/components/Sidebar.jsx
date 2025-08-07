import { Link, useLocation, useNavigate } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";
import {Navigate} from "react-router-dom";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const handleclick = (e) => {
   e.preventDefault();
    navigate("/profilepage")
  }
  return (
    <aside className="d-none d-lg-flex flex-column  border-end vh-100 sticky-top" style={{ width: "260px",backgroundColor:""}}>
      {/* LOGO */}
      <div className="p-4 border-bottom" style={{backgroundColor:""}}>
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <ShipWheelIcon style={{ width: "36px", height: "36px" }} className="text-primary" />
          <span className="fs-4 fw-bold font-monospace text-primary">Streamify</span>
        </Link>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-grow-1 p-3">
        <Link
          to="/"
          className={`btn btn-outline-secondary w-100 text-start mb-2 d-flex align-items-center gap-2 ${
            currentPath === "/" ? "active" : ""
          }`} style={{color:"white"}}
        >
          <HomeIcon size={18} className="text-muted" />
          Home
        </Link>

        <Link
          to="/friends"
          className={`btn btn-outline-secondary w-100 text-start mb-2 d-flex align-items-center gap-2 ${
            currentPath === "/friends" ? "active" : ""
          }`} style={{color:"white"}}
        >
          <UsersIcon size={18} className="text-muted" />
          Friends
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-outline-secondary w-100 text-start d-flex align-items-center gap-2 ${
            currentPath === "/notifications" ? "active" : ""
          }`} style={{color:"white"}}>
        
          <BellIcon size={18} className="text-muted" />
          Notifications
        </Link>
      </nav>

      {/* USER PROFILE */}
      <div className="p-3 border-top mt-auto" style={{backgroundColor:"" ,color:"white"}}>
        <div className="d-flex align-items-center gap-3">
          <img
            src={authUser?.profilePic}
            alt="User Avatar"
            className="rounded-circle"
            style={{ width: "40px", height: "40px", objectFit: "cover" }} onClick={handleclick}/>
          
          <div>
            <div className="fw-semibold small">{authUser?.fullName}</div>
            <div className="text-success small d-flex align-items-center gap-1">
              <span
                className="rounded-circle bg-success d-inline-block"
                style={{ width: "8px", height: "8px" }}
              ></span>
              Online
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
