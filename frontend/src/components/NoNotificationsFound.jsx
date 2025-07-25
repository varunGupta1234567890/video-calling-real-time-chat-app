import { BellIcon } from "lucide-react";

function NoNotificationsFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 text-center">
      <div
        className="d-flex align-items-center justify-content-center rounded-circle bg-light mb-4"
        style={{ width: "64px", height: "64px" ,color:"white"}}
      >
        <BellIcon className="text-muted" size={32} />
      </div >
      <h3 className="fs-5 fw-semibold mb-2">No notifications yet</h3>
      <p className="text" style={{ maxWidth: "480px" }}>
        When you receive friend requests or messages, they'll appear here.
      </p>
    </div>
  );
}

export default NoNotificationsFound;
