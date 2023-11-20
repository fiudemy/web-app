import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import { getStudentsByCourseId, getFriendsFrom, getFriendsTo } from '../../services/axios_utils';
import AppAppBar from './AppAppBar';
import { useParams } from 'react-router-dom';

const Students = () => {
  const { courseId } = useParams();
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [requested, setRequested] = useState([]);
  const [friendships, setFriendships] = useState([]);
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const userList = await getStudentsByCourseId(courseId);
        setUsers(userList);

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

        const pendingFriendIds = friendsFrom
        .filter((friendship) => friendship.status === 'pending' && friendship.from === currentUserId)
        .map((pendingFriendship) => pendingFriendship.to);
        const requested = userList.filter(user => pendingFriendIds.includes(user.id));
        setRequested(requested);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };
    fetchUsersData();
  }, []);


  return (
    <>
        <AppAppBar showsSignInOptions={false} isStudent={true} />
        <div style={{ marginLeft: "5%" }}>
            <h2>Alumnos:</h2>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <UsersList users={users} friends={friends} requested={requested} friendships={friendships} />
        </div>
    </>
  );
};

export default Students;
