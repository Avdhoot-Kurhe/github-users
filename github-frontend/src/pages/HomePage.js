import React, { useEffect, useState } from 'react';
import UserSearch from '../components/UserSearch';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [userData, setUserData] = useState([]);

  const fetchUserData = async (username) => {
    try {
      const response = await axios.post('https://github-users-9uiw.onrender.com/api/users/addUser', { username });
      console.log("here data is "+response.data);
    } catch (error) {
      console.error("Here error is " +error.message);
    }
  };
  const hereData = async () => {  
    try {  
      const response = await axios.get('https://github-users-9uiw.onrender.com/api/users/all-users');  
      setUserData(response.data);  
        console.log("here data is "+response.data);
    } catch (error) {  
      console.error('Error fetching user data:', error);  
    }  
  }; 
  useEffect(() => {
    hereData();
  },[]);

  return (
    <div>
      <UserSearch onSearch={fetchUserData} />
      {userData && (
        <div>
          <h1>User Data</h1>  
    <ul>  
    {userData.map((user) => (  
  <Link to={`/user-details/${user.username}`}  state={{ user }} key={user.id} className='userBox'>
    <div className='userNames'>
      <img src={user.avatar_url} alt={`${user.username}'s avatar`} />
      <div>
      <h3>{user.username}</h3>
      <p>{user.bio}</p>
      </div>
    </div>
  </Link>
))}  
    </ul> 
        </div>
      )}
    </div>
  );
};

export default HomePage;
