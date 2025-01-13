import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
function UserDetails() {
    const location = useLocation();
    const { user } = location.state || {};
    
  const [reposData, getReposData] = useState([]);
  const [followerData, setFollowerData] = useState([]);
 var repositoriesLink =user.starred_url;

repositoriesLink = repositoriesLink.replace(/{.*}/g, "");

  const getFollowerData=async()=>{
    try {  
      // console.log("here data is "+ repositoriesLink);
      const response = await axios.get(`${user.followers_url}`);  
      setFollowerData(response.data);  
    } catch (error) {  
      console.error('Error fetching user data:', error);  
    } 
  }
    const getRepos = async () => {  
      try {  
        const response = await axios.get(`${repositoriesLink}`);  
        getReposData(response.data);  
      } catch (error) {  
        console.error('Error fetching user data:', error);  
      }  
    }; 
    useEffect(() => {
      getRepos();
      getFollowerData();
    },[]);
  
  return (
    <div className='userDetails-cart'>
        <div className='datails-1'>
        <img src={user.avatar_url} alt=''  />
        <h3>@{user.username}</h3>
        <p style={{color:"black"}}>{user.bio}</p>
        <p style={{color:"black"}}>{user.location}</p>
        <p style={{color:"black"}}>follower {followerData.length}</p>
        </div>

        <div className='datails-2'>
            <h1>{user.name}</h1>
            <div>
          {reposData.map((item,index) => ( 
            <div id='card' key={index}>
              <a href={item.html_url} target="_blank" rel="noopener noreferrer">
              <h2>{item.name}</h2>
              <p style={{color:"black"}}>{item.description}</p>
              </a>

            </div>
           ))}
            </div>
        </div>
    </div>
  );
}

export default UserDetails;
