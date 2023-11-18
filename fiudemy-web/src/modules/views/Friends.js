import React, { useEffect, useState } from 'react';
import {
  Button,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { getFriendsTo, getFriendsFrom, getAllUsers } from '../../services/axios_utils';
import UsersList from '../components/UsersList';


const Friends = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [friendships, setFriendships] = useState([]);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        const userList = await getAllUsers();
        const friendsFrom = await getFriendsFrom();
        const friendsTo = await getFriendsTo();
        const allFriendships = [...friendsFrom, ...friendsTo];
        setFriendships(allFriendships);

        const friendIds = allFriendships
        .filter((friendship) => friendship.status === 'accepted')
        .map((friendship) => {
            return friendship.from === currentUserId ? friendship.to : friendship.from;
        })
        .filter((friendId) => friendId !== currentUserId);
        const friends = userList.filter(user => friendIds.includes(user.id));
        setFriends(friends);
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
        <h2>Amigos:</h2>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <UsersList users={[]} friends={friends} friendships={friendships} areCurrentFriends={true}/>
      </div>
    </>
  );
};

export default Friends;
