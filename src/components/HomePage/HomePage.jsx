import React from 'react';

const HomePage = () => {

  const userData = JSON.parse(localStorage.getItem('authUserData'));

  return (
    <div>
      <h1>Hello, {userData.userName}</h1>
    </div>
  );
};

export default HomePage;
