import React from 'react';

const Profile = () => {
  const userData = JSON.parse(localStorage.authUserData);

  return (
    <div>
      <h1>Name: {userData.userName}</h1>
      <h1>e-mail: {userData.userEmail}</h1>
    </div>
  );
};

export default Profile;
