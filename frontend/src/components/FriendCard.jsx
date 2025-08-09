import { Link } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../constants";
import axios from "axios";
import { toast } from "react-hot-toast"; // Optional for user feedback
import { useMutation}  from "@tanstack/react-query";
import { deletefriend } from "../lib/api.js";


const FriendCard = ({ friend, onDelete }) => {
  //delete functionality lagani h isliye usemutation use kiya h
  //mutation ke andar onsuccess toast hi visible hota h
   const {mutate:deletefriendrequest} = useMutation({
    mutationFn: deletefriend,
    onSuccess: () => {
      toast.success(`${friend.fullName} removed from friends`);
      if (onDelete) onDelete(friend._id); // update UI in parent
    },
    onError: (error) => {
      console.error("Error removing friend", error);
      toast.error("Failed to remove friend");
    },
  });

const handleDelete = (e) => {
  e.preventDefault();
    const confirmDelete = window.confirm(
      `Are you sure you want to remove ${friend.fullName} from friends?`
    );
    if (confirmDelete) {
     deletefriendrequest(friend._id);
    }
  };

  return (
    <div className="card shadow-sm border border-light-subtle mb-3">
      <div className="card-body">
        {/* USER INFO */}
        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="rounded-circle overflow-hidden" style={{ width: "48px", height: "48px" }}>
            <img
              src={friend.profilePic}
              alt={friend.fullName}
              className="img-fluid h-100 w-100 object-fit-cover"
            />
          </div>
          <h5 className="mb-0 text-truncate">{friend.fullName}</h5>

          <i
            className="bi bi-trash-fill ms-auto text-danger"
            style={{ cursor: "pointer", marginTop: "-35px" }}
            onClick={handleDelete}
            title="Unfriend"
          ></i>
        </div>

        {/* LANGUAGES */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          <span className="badge bg-secondary text-light">
            {getLanguageFlag(friend.nativeLanguage)} Native: {friend.nativeLanguage}
          </span>
          <span className="badge border border-secondary text-secondary">
            {getLanguageFlag(friend.learningLanguage)} Learning: {friend.learningLanguage}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline-primary w-100">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="me-1"
        style={{ height: "14px", verticalAlign: "middle" }}
      />
    );
  }
  return null;
}
