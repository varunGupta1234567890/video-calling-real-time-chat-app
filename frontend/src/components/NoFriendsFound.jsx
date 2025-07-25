const NoFriendsFound = () => {
  return (
    <div className="card p-4 text-center shadow-sm border" >
      <div className="card-body" style={{hover:{backgroundColor:"pink"}}}>
        <h3 className="card-title fw-semibold fs-5 mb-2">No friends yet</h3>
        <p className="text-muted mb-0">
          Connect with language partners below to start practicing together!
        </p>
      </div>
    </div>
  );
};

export default NoFriendsFound;
