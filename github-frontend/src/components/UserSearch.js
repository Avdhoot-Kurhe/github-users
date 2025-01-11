import React, { useState } from 'react';

const UserSearch = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSearch = () => {
    if (username) {
      onSearch(username);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub Username"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default UserSearch;
