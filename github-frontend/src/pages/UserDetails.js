import { useLocation } from 'react-router-dom';

function UserDetails() {
    const location = useLocation();
    const { user } = location.state || {};
  
  return (
    <div className='userDetails-cart'>
        <div className='datails-1'>
        <img src={user.avatar_url} alt=''  />
        <h1>{user.name}</h1>
        <p>@{user.username}</p>
        </div>

        <div className='datails-2'>
            <h1>{user.name}</h1>
        </div>
    </div>
  );
}

export default UserDetails;
