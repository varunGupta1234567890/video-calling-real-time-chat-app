import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getMyFriends,
  sendFriendRequest,
} from "../lib/api.js";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

import { capitialize } from "../lib/utils";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();//friend
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
//send request button to be disabled if request has already sent
//usequery se data fetch karte h or usemutation se data ko change karte h
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getMyFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });
//useeffect hook se outgoing friend requests ke ids ko set karna h
  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div style={{backgroundColor:"",color:"white"}}>
    <div className="py-4 px-3" style={{backgroundColor:""}}>
      <div className="container">
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3 mb-4" style={{color:"white"}}>
          <h1 className="h3 fw-bold">Your Friends</h1>
          <Link to="/notifications" className="btn btn-outline-secondary btn-sm d-flex align-items-center" style={{color:"white"}}>
            <UsersIcon size={16} className="me-2" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="row g-3">
            {friends.map((friend) => (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={friend._id}>
                <FriendCard friend={friend} />
              </div>
            ))}
          </div>
        )}

        <section className="mt-5">
          <div className="mb-4" style={{color:"white"}}>
            <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
              <div>
                <h2 className="h3 fw-bold">Meet New Learners</h2>
                <p className="text mb-0">Discover perfect language exchange partners based on your profile</p>
              </div>
            </div>
          </div> 

          {loadingUsers ? (
            <div className="d-flex justify-content-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card p-4 text-center bg-light">
              <h5 className="fw-semibold mb-2">No recommendations available</h5>
              <p className="text-muted">Check back later for new language partners!</p>
            </div>
          ) : (
            <div className="row g-4">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
//ye pta karne ke liye ki kya request already sent hui h ya ni
                return (
                  <div className="col-12 col-md-6 col-lg-4 " style={{backgroundColor:""}} key={user._id}>
                    <div className="card h-100 shadow-sm">
                      <div className="card-body d-flex flex-column gap-3">
                        <div className="d-flex align-items-center gap-3">
                          <img src={user.profilePic} alt={user.fullName} className="rounded-circle" style={{ width: "64px", height: "64px", objectFit: "cover" }} />
                          <div>
                            <h5 className="mb-0">{user.fullName}</h5>
                            {user.location && (
                              <div className="text-muted small d-flex align-items-center mt-1">
                                <MapPinIcon size={12} className="me-1" />
                                {user.location}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge bg-secondary">
                            {getLanguageFlag(user.nativeLanguage)} Native: {capitialize(user.nativeLanguage)}
                          </span>
                          <span className="badge bg-light border">
                            {getLanguageFlag(user.learningLanguage)} Learning: {capitialize(user.learningLanguage)}
                          </span>
                        </div>

                        {user.bio && <p className="small text-muted mb-0">{user.bio}</p>}

                      
                          <button className={`btn w-100 mt-auto ${hasRequestBeenSent ? "btn-outline-secondary disabled" : "btn-primary"}`}
                          
                          onClick={() => sendRequestMutation(user._id)}
                          disabled={hasRequestBeenSent || isPending}>
                        
                          {hasRequestBeenSent ? (
                            <>
                              <CheckCircleIcon size={16} className="me-2" />
                              Request Sent
                            </>
                          ) : (
                            <>
                              <UserPlusIcon size={16} className="me-2" />
                              Send Friend Request
                            </>
                          )} 
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
