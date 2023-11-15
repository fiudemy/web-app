import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { PersonAdd, Add, Remove, AccessTime } from '@mui/icons-material';
import { acceptFriendship, rejectFriendship, sendFriendRequestTo } from '../../services/axios_utils';

const UsersList = ({ users, friends, requested = [], friendships = [], areCurrentFriends = false, areApplicants = false }) => {
    const currentUserId = localStorage.getItem("userId");
    const filteredUsers = users.filter(user => user.id !== currentUserId);

    var displayedList = areCurrentFriends ? friends : filteredUsers;
    displayedList = areApplicants ? friends : displayedList;

    const [searchTerm, setSearchTerm] = useState('');

    const handleDeleteFriend = (friendId) => {
        // TODO connect with backend and delete friendship
        console.log(`Deleted friend with ID: ${friendId}`);
    };

    const handleAddFriend = (friendId) => {
        sendFriendRequestTo(friendId);
    };

    const handleAcceptFriend = (friendId) => {
        const foundFriendship = friendships.find(friendship => (
            friendship.from === friendId || friendship.to === currentUserId
        ));
        acceptFriendship(foundFriendship.id);
    };

    const handleRejectFriend = (friendId) => {
        const foundFriendship = friendships.find(friendship => (
            friendship.from === friendId || friendship.to === currentUserId
        ));
        rejectFriendship(foundFriendship.id);
    };

    const handleRemoveRequestFriend = (friendId) => {
        // TODO connect with backend and delete request of friendship
        console.log(`Deleted friend with ID: ${friendId}`);
    };

    return (
        <div style={{ marginBottom: '10px' }}>
        <TextField
            id="outlined-search"
            label="Search by Name"
            type="search"
            variant="outlined"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ margin: '10px', width: "80%" }}
        />
        <List
            style={{
                width: '80%',
                border: '1px solid #ccc',
                borderRadius: '8px',
                margin: '0 auto',
                boxSizing: 'border-box',
                maxHeight: '400px',
                overflowY: 'auto',
                paddingBottom: '8px',
            }}
        >
            {displayedList
                    .filter(user => `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((user, index) => (
                <Link to={`/profile/${user.id}`} key={user.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem
                        disablePadding
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: index !== users.length - 1 ? '1px solid #ccc' : 'none',
                            padding: '12px',
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar alt={`${user.first_name} ${user.last_name}`} src={user.avatar ? user.avatar : "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1317&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} style={{ width: '70px', height: '70px' }} />
                        </ListItemAvatar>
                        <ListItemText primary={`${user.first_name} ${user.last_name}`} style={{ fontSize: '20px', marginLeft: '16px' }} />
                        {areCurrentFriends && !areApplicants && 
                            <Button startIcon={<DeleteIcon />} variant="outlined" onClick={() => handleDeleteFriend(user.id)} style={{ marginLeft: '8px' }}>
                                Eliminar
                            </Button>
                        }
                        {!areCurrentFriends && !areApplicants && !requested.some((request) => request.id == user.id) ? friends.some((friend) => friend.id === user.id) ? (
                            <Button startIcon={<DeleteIcon />} variant="outlined" onClick={() => handleDeleteFriend(user.id)} style={{ marginLeft: '8px' }}>
                                Eliminar
                            </Button>
                        ) : (
                            <Button startIcon={<PersonAdd />} variant="outlined" onClick={() => handleAddFriend(user.id)} style={{ marginLeft: '8px' }}>
                                Agregar
                            </Button>
                        ): ""}
                        {!areCurrentFriends && !areApplicants && requested.some((request) => request.id == user.id) &&
                            <Button startIcon={<AccessTime />} variant="outlined" onClick={() => handleRemoveRequestFriend(user.id)} style={{ marginLeft: '8px' }}>
                                Pendiente
                            </Button>
                        }
                        {areApplicants &&
                            <>
                                <Button startIcon={<Add />} variant="outlined" onClick={() => handleAcceptFriend(user.id)} style={{ marginLeft: '8px' }}>
                                    Aceptar
                                </Button>
                                <Button startIcon={<Remove />} variant="outlined" onClick={() => handleRejectFriend(user.id)} style={{ marginLeft: '8px' }}>
                                    Rechazar
                                </Button>
                            </>
                        }
                    </ListItem>
                </Link>
            ))}
        </List>
        </div>
    );
};

export default UsersList;
