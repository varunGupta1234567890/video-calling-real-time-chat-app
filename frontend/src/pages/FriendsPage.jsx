import React, { useEffect, useState } from "react";
import { getMyFriends } from "../lib/api.js";
import FriendCard from "../components/FriendCard";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getMyFriends();
        setFriends(data);
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="container py-4" style={{color:"white"}}>
      <h2 className="mb-4">My Friends</h2>
      {friends.length === 0 ? (
        <p>No friends yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {friends.map((friend) => (
            <div className="col" key={friend._id}>
              <FriendCard friend={friend} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
