import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);

    const ProfileDetails = async()=>{
       try{
        const res = await  axios.get('/auth/protected')
        
            setUser(res.data);
       }catch(error ){
            console.error('Error fetching user data:', error);
        };
    }

    useEffect(() => {
       ProfileDetails()
    }, []); // Empty dependency array ensures useEffect runs once on component mount

    return (
        <div>
            <h2>Profile</h2>
            {user ? (
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* Add other user details as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
