import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="container-fluid py-2 border-bottom d-flex justify-content-end position-absolute top-0">
      <button 
        onClick={handleVideoCall} 
        className="btn btn-success btn-sm d-flex align-items-center gap-1 shadow"
      >
        <VideoIcon size={18} />
        <span>Call</span>
      </button>
    </div>
  );
}

export default CallButton;
