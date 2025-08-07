import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      //2nd line is to refresh friend req in home page
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="" style={{color:"white"}}>
    <div className="container py-4">
      <h1 className="mb-4 fw-bold fs-3"></h1>

      {isLoading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Incoming Friend Requests */}
          {incomingRequests.length > 0 && (
            <section className="mb-5">
              <h4 className="d-flex align-items-center gap-2 mb-3">
                <UserCheckIcon size={20} className="text-primary" />
                Friend Requests
                <span className="badge bg-primary ms-2">{incomingRequests.length}</span>
              </h4>

              <div className="d-flex flex-column gap-3">
                {incomingRequests.map((request) => (
                  <div key={request._id} className="card shadow-sm">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={request.sender.profilePic}
                          alt={request.sender.fullName}
                          className="rounded-circle"
                          style={{ width: "56px", height: "56px", objectFit: "cover" }}
                        />
                        <div>
                          <h6 className="mb-1 fw-semibold">{request.sender.fullName}</h6>
                          <div className="d-flex flex-wrap gap-2">
                            <span className="badge bg-secondary">
                              Native: {request.sender.nativeLanguage}
                            </span>
                            <span className="badge bg-light border text-muted">
                              Learning: {request.sender.learningLanguage}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => acceptRequestMutation(request._id)}
                        disabled={isPending}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Accepted Requests Notifications */}
          {acceptedRequests.length > 0 && (
            <section className="mb-5">
              <h4 className="d-flex align-items-center gap-2 mb-3">
                <BellIcon size={20} className="text-success" />
                New Connections
              </h4>

              <div className="d-flex flex-column gap-3">
                {acceptedRequests.map((notification) => (
                  <div key={notification._id} className="card shadow-sm">
                    <div className="card-body d-flex align-items-start gap-3">
                      <img
                        src={notification.recipient.profilePic}
                        alt={notification.recipient.fullName}
                        className="rounded-circle mt-1"
                        style={{ width: "40px", height: "40px", objectFit: "cover" }}
                      />

                      <div className="flex-grow-1">
                        <h6 className="fw-semibold mb-1">{notification.recipient.fullName}</h6>
                        <p className="mb-1 text-muted small">
                          {notification.recipient.fullName} accepted your friend request
                        </p>
                        <p className="text-muted small d-flex align-items-center mb-0">
                          <ClockIcon size={14} className="me-1" />
                          Recently
                        </p>
                      </div>

                      <span className="badge bg-success d-flex align-items-center">
                        <MessageSquareIcon size={14} className="me-1" />
                        New Friend
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* No Notifications */}
          {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
            <NoNotificationsFound />
          )}
        </>
      )}
    </div>
    </div>
  );
};

export default NotificationsPage;
