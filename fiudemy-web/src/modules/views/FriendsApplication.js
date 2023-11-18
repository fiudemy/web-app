import React, { useEffect, useState } from 'react';
import {
  Button,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { getFriendsTo, getAllUsers } from '../../services/axios_utils';
import UsersList from '../components/UsersList';


const FriendsApplication = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [friendsApplicants, setFriendsApplicants] = useState([]);
  const [friendships, setFriendships] = useState([]);

  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        const userList = await getAllUsers();
        const friendsTo = await getFriendsTo();
        setFriendships(friendsTo);
        const pendingFriendIds = friendsTo
        .filter((friendship) => friendship.status === "pending")
        .map((pendingFriendship) => pendingFriendship.from);
        const applicants = userList.filter(user => pendingFriendIds.includes(user.id));
        setFriendsApplicants(applicants);
      } catch (error) {
        console.error('Error fetching friends data:', error);
      }
    };
    fetchFriendsData();
  }, [userId]);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBackButtonClick}
        style={{ margin: '5px', width: 'fit-content' }}
      />
      <div style={{ marginLeft: "5%" }}>
        <h2>Solicitudes:</h2>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <UsersList users={[]} friends={friendsApplicants} friendships={friendships} areApplicants={true}/>
      </div>
    </>
  );
};

export default FriendsApplication;
