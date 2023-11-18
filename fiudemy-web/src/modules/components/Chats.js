import React, {useEffect, useRef, useState} from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppAppBar from "../views/AppAppBar";
import {getChats, sendMessage} from "../../services/axios_utils";
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import IconButton from "@mui/material/IconButton";
import { Link } from 'react-router-dom';

const Chats = () => {
   const [selectedChat, setSelectedChat] = useState(null);
   const [chatData, setChatsData] = useState(null);
   const [newMessage, setNewMessage] = useState('');
   const messagesContainerRef = useRef(null);
   const currentUserId = localStorage.getItem("userId");
   useEffect(() => {
      const setChats = async () => {
         const chat = await getChats();
         setChatsData(chat);
      }
      setChats();
   }, []);
   useEffect(() => {
      // Scroll to the bottom when the selectedChat changes
      if (messagesContainerRef.current) {
         messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
   }, [selectedChat]);
   const handleChatSelection = (chat) => {
      setSelectedChat(chat);
   };

   const handleSendMessage = async () => {
      if (newMessage.trim() === '') {
         return;
      }
      const chatData = {
         "sender": currentUserId,
         "message": newMessage,
      }
      const currentDate = new Date().toISOString();
      const formattedDate = currentDate.slice(0, 23) + '000';
      const updatedChat = {
         ...selectedChat,
         messages: [
            ...selectedChat.messages,
            {
               sender: chatData["sender"],
               message: newMessage,
               time: formattedDate,
               last_modified: formattedDate,
               date_created: formattedDate,
            },
         ],
      };
      await sendMessage(selectedChat.id, chatData);
      setSelectedChat(updatedChat);
      setNewMessage('');
   }
   const transformDate = (date) => {
      const localDate = new Date(date + 'Z'); // Append 'Z' to indicate UTC time
      const options = {
         year: 'numeric',
         month: '2-digit',
         day: '2-digit',
         hour: '2-digit',
         minute: '2-digit',
         hour12: false,
         timeZone: 'America/Argentina/Buenos_Aires',
      };
      return new Intl.DateTimeFormat('es-AR', options).format(localDate);
   }
   if (!chatData) {
      return <div> Loading </div>
   }
   return (
      <Box >
         <AppAppBar showsSignInOptions={false} isProfessor={false} isChat={true}/>
         <Box display="flex">
            {/* Left side - List of people */}
            <Box sx={{
               width: "300px",
               height: "100%",
               display: "flex",
               flexDirection: "column",
               paddingTop: "25px",
               rowGap: "25px"
            }} borderRight="1px solid #ccc">
                  {chatData.results.map((chat) => (
                     <Box key={chat.id} onClick={() => handleChatSelection(chat)} sx={{
                        height: "50px",
                        borderBottom: "1px solid #ccc",
                        display: "flex",
                        justifyContent: "center"
                     }}>
                        <AccountCircleIcon />
                        {currentUserId === chat.user1 ? (
                           chat.user2_name
                        ) : (
                           chat.user1_name
                        )}
                     </Box>
                  ))}
            </Box>
            {/* Right side - Display selected chat */}
            <Box flex={1} p={3}>
               {selectedChat && (
                  <Box sx={{
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "space-between",
                     height: "80vh",
                     width: "100vh"}}>
                     <Box sx={{
                        fontVariant:"h5",
                        height: "50px",
                        background: "#ff3567",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "20px",
                        columnGap: "5px",
                        fontWeight: "bold"
                        }}>
                        <AccountCircleIcon />
                        {currentUserId === selectedChat.user1 ? (
                           <Link to={`/profile/${selectedChat.user2}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                              <Typography>{selectedChat.user2_name}</Typography>
                           </Link>
                        ) : (
                           <Link to={`/profile/${selectedChat.user1}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                              <Typography>{selectedChat.user1_name}</Typography>
                           </Link>
                        )}
                     </Box>
                     <Box sx={{
                        paddingTop: "20px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "10px",
                        maxHeight: "80vh", // Set your desired max height
                        overflowY: "auto", // Add a vertical scrollbar if the content exceeds the max height
                        }}
                        ref={messagesContainerRef}>
                        {selectedChat.messages.map((message, index) => (
                           <Box key={index}>
                              {message.sender === currentUserId ? (
                                 <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                 }}>
                                    <Box sx={{
                                       display: "flex",
                                       flexDirection: "row",
                                       justifyContent: "flex-end",
                                       width: "50%",
                                       background: "rgba(255,53,103,0.66)",
                                       borderRadius: "15px",
                                       paddingLeft: "15px",
                                       paddingRight: "15px",
                                    }}>
                                       <Box sx ={{
                                          display: "flex",
                                          flexDirection: "column",}}>
                                          {`${message.message}`}
                                          <Box sx={{
                                             fontSize: "10px",
                                             display: "flex",
                                             flexDirection: "row",
                                             justifyContent: "flex-end"}}>
                                             {transformDate(message.time)}
                                          </Box>
                                       </Box>
                                    </Box>
                                 </Box>
                              ) : (
                                 <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                 }}>
                                    <Box sx={{
                                       display: "flex",
                                       flexDirection: "row",
                                       justifyContent: "flex-start",
                                       width: "50%",
                                       background: "rgba(255,200,212,0.49)",
                                       borderRadius: "15px",
                                       paddingRight: "15px",
                                       paddingLeft: "15px",
                                    }}>
                                       <Box sx ={{
                                          display: "flex",
                                          flexDirection: "column",}}>
                                          {`${message.message}`}
                                          <Box sx={{
                                             fontSize: "10px",
                                             display: "flex",
                                             flexDirection: "row",
                                             justifyContent: "flex-start"}}>
                                             {transformDate(message.time)}
                                          </Box>
                                       </Box>
                                    </Box>
                                 </Box>
                              )}
                           </Box>
                        ))}
                     </Box>
                     <Box sx={{display: "flex", flexDirection: "row"}}>
                        <TextField
                           id="standard-search"
                           type="search"
                           label="Escribe un mensaje..."
                           variant="standard"
                           value={newMessage}
                           onChange={(e) => setNewMessage(e.target.value)}
                           sx={{width: "100%"}}/>
                        <IconButton onClick={handleSendMessage}>
                           <SendIcon/>
                        </IconButton>
                     </Box>
                  </Box>
               )}
            </Box>
         </Box>
      </Box>
   );
};

export default Chats;
