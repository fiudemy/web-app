import React, { useEffect, useState } from 'react';
import {
    Button,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Input,
    CircularProgress,
  } from '@mui/material';
import { Edit as EditIcon, Chat as ChatIcon, Group as GroupIcon, ArrowBack as ArrowBackIcon, Close } from '@mui/icons-material';
import {
    getCoursesByTeacherEmail,
    getUserById,
    getCoursesByStudentId,
    updateUserProfilePicture,
    createChat,
    getChats,
    getAllUsers,
    getFriendsFrom,
    getFriendsTo,
    sendFriendRequestTo,
    deleteFriendship
} from '../../services/axios_utils';
import { PersonAdd, GroupAdd, HowToReg, AccessTime } from '@mui/icons-material';
import { CoursesGrid } from '../components/courses/CoursesGrid';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const currentUserId = localStorage.getItem("userId");

    const [userData, setUserData] = useState(null);
    const [userCourses, setUserCourses] = useState([]);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [friendCount, setFriendCount] = useState(0);
    const [friends, setFriends] = useState([]);
    const [pendingFriends, setPendingFriends] = useState([]);
    const [friendships, setFriendships] = useState([]);
    const [isEditProfileOpen, setEditProfileOpen] = useState(false);
    const [isUploading, setUploading] = useState(false);
    const [chatLoading, setChatLoading] = useState(false);
    const [friendsLoading, setFriendsLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserById(userId);
            setUserData(userData);
            if (userData && userData.role === "teacher") {
                try {
                    const userCoursesList = await getCoursesByTeacherEmail(userData.email);
                    setUserCourses(userCoursesList);
                } catch (error) {
                    console.error(error);
                }
            }
            if (userData && userData.role === "student") {
                try {
                    const userCoursesList = await getCoursesByStudentId(userId);
                    setUserCourses(userCoursesList);
                } catch (error) {
                    console.error(error);
                }
            }
            setIsCurrentUser(userId === currentUserId);

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
            setFriendCount(friends.length);

            const pending = allFriendships
            .filter(friendship => friendship.status === 'pending')
            .map(friendship => {
                return friendship.from === currentUserId ? friendship.to : friendship.from;
            });
            setPendingFriends(pending);
            setFriendsLoading(false);
        };
        fetchUserData();
    }, [userId]);

    const handleAddFriend = () => {
        sendFriendRequestTo(userId);
    };

    const handleDeleteFriend = async () => {
        const friendship = friendships.find(friendship => (
            (friendship.from === userId && friendship.to === currentUserId)
            || (friendship.to === userId && friendship.from === currentUserId)
        ));
        await deleteFriendship(friendship.id);
    }

    const handlePendingFriend = () => {
        console.log('Do nothing');
    };

    const handleCreateChat = async (friendId) => {
        try {
            setChatLoading(true);
            const allChats = await getChats();
            const existingChat = allChats.results.find(
                (chat) => (chat.user1 === friendId) || (chat.user2 === friendId)
            );
            if (existingChat) {
                navigate(`/chats`);
            } else {
                await createChat(currentUserId, friendId);
                navigate(`/chats`);
            }
        } catch (error) {
            console.error('Error creating chat:', error);
        } finally {
            setChatLoading(false);
        }
    };

    const handleFriendCountClick = () => {
        navigate(`/friends/${userId}`);
    };

    const handleFriendApplicationClick = () => {
        navigate(`/friendsApplication/${userId}`);
    };

    const handleEditProfileClose = () => {
        setEditProfileOpen(false);
    };

    const handleProfilePhotoChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          setUploading(true);
          try {
            const imageUrl = await updateUserProfilePicture(selectedFile);
            setSuccessMessage('Profile picture updated successfully!');
          } catch (error) {
            console.error('Error updating profile picture:', error);
          } finally {
            setUploading(false);
            setEditProfileOpen(false);
          }
        }
    };

    const handleEditProfileClick = () => {
        setEditProfileOpen(true);
      };

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    const handleCloseSuccessMessage = () => {
        setSuccessMessage(null);
    };


    const isFriend = friends.some((friend) => friend.id === userId);
    const isPendingFriend = pendingFriends.some((pendingFriend) => pendingFriend === userId);

    const renderAddFriendButton = () => {
        if (friendsLoading) {
            return <CircularProgress size={20} />;
        } else if (isFriend) {
            return (
                <IconButton onClick={handleDeleteFriend} aria-label="Delete Friend">
                    <HowToReg />
                </IconButton>
            );
        } else if (isPendingFriend) {
            return (
                <IconButton onClick={handlePendingFriend} aria-label="Pending Friend">
                    <AccessTime />
                </IconButton>
            );
        } else {
            return (
                <IconButton onClick={handleAddFriend} aria-label="Add as Friend">
                    <PersonAdd />
                </IconButton>
            );
        }
    };


    return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
        <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackButtonClick}
            style={{ margin: '5px', width: 'fit-content' }}
        />
        {successMessage && (
            <div
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px',
                    marginBottom: '20px',
                    position: 'relative',
                }}
            >
                {successMessage}
                <IconButton
                    style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        color: 'white',
                    }}
                    onClick={handleCloseSuccessMessage}
                >
                    <Close />
                </IconButton>
            </div>
        )}
      {userData && (
        <>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: "8%", marginTop: "2%", marginBottom: '16px'}}>
                <div>
                    <img
                    src={userData.profile_picture ? userData.profile_picture : "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}  // TODO reemplazar por foto del back
                    alt={userData.first_name}
                    style={{ width: '200px', height: '200px', borderRadius: '50%' }}
                    />
                    {isCurrentUser && (
                        <IconButton
                            onClick={handleEditProfileClick}
                            aria-label="Edit Profile Picture"
                        >
                            <EditIcon />
                        </IconButton>
                    )}
                </div>
                <div style={{ marginLeft: '16px', textAlign: 'left' }}>
                <Typography variant="h4" style={{ marginBottom: '8px', marginLeft: "20px" }}>
                    {`${userData.first_name} ${userData.last_name}`}
                </Typography>
                {isCurrentUser && (
                    <Button
                    startIcon={friendsLoading ? <CircularProgress size={20} /> : <GroupIcon />}
                    variant="outlined"
                    onClick={handleFriendCountClick}
                    style={{ marginBottom: '16px', marginLeft: "20px" }}
                    >
                    {friendsLoading ? 'Cargando...' : `Amigos: ${friendCount}`}
                    </Button>
                )}
                {isCurrentUser && (
                    <Button
                    startIcon={<GroupAdd />}
                    variant="outlined"
                    onClick={handleFriendApplicationClick}
                    style={{ marginBottom: '16px', marginLeft: "20px" }}
                    >
                    {`Solicitudes`}
                    </Button>
                )}
                <div style={{ display: 'flex', marginBottom: '16px', marginLeft: '20px' }}>
                    {!isCurrentUser && renderAddFriendButton()}
                    {!isCurrentUser && isFriend && (
                        <IconButton
                            onClick={() => handleCreateChat(userId)}
                            aria-label="Create Chat"
                            disabled={chatLoading}
                            style={{ marginLeft: '8px' }}
                        >
                            {chatLoading ? <CircularProgress size={24} /> : <ChatIcon />}
                        </IconButton>
                    )}
                </div>
                </div>
            </div>
            <div style={{ alignSelf: 'flex-start', marginTop: "40px", marginLeft: "8%" }}>
                <Typography variant="h6">Cursos:</Typography>
            </div>
            <div style={{ alignSelf: 'flex-start', marginLeft: "2%" }}>
                <CoursesGrid courses={userCourses} />
            </div>
            {isEditProfileOpen && (
                <Dialog open={isEditProfileOpen} onClose={handleEditProfileClose}>
                <DialogTitle>Editar Foto de Perfil</DialogTitle>
                <DialogContent>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePhotoChange}
                        disabled={isUploading}
                    />
                    {isUploading && <CircularProgress />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditProfileClose} disabled={isUploading}>
                        Cancelar
                    </Button>
                </DialogActions>
                </Dialog>
            )}
        </>
      )}
    </div>
    );
};

export default Profile;
