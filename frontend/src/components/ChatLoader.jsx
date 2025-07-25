import { LoaderIcon } from "lucide-react";

function ChatLoader() {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center p-4 text-center">
      <LoaderIcon className="text-primary spinner-border" style={{ width: "2.5rem", height: "2.5rem" }} />
      <p className="mt-3 fs-5 fst-italic font-monospace">Connecting to chat...</p>
    </div>
  );
}

export default ChatLoader;
