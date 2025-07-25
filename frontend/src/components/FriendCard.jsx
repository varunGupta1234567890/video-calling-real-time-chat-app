import { Link } from "react-router-dom"; // use react-router-dom for web apps
import { LANGUAGE_TO_FLAG } from "../constants";


const FriendCard = ({ friend }) => {
const handle = () =>{
  console.log("delete");
  
  
}

  return (
    <div className="card shadow-sm border border-light-subtle mb-3" style ={{ backgroundColor:""}}>
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
            <i className="bi bi-trash-fill ms-auto" style ={{cursor:"pointer",marginTop: "-35px"}} onClick={handle}></i>
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
