import React, { useState } from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppAppBar from "../views/AppAppBar";

const Chats = () => {
   const [selectedChat, setSelectedChat] = useState(null);

   const chatData = {
      results: [
         {
            id: '65501b55526e4efa99f694a1',
            user1: '65233646667fb42d32918fc7',
            user1_name: 'andres',
            user2: '65386e58642f664c56ab800f',
            user2_name: 'carlos',
            messages: [
               {
                  sender: '65233646667fb42d32918fc7',
                  message: 'hola',
                  last_modified: '2023-11-12T00:24:53.014000',
                  date_created: '2023-11-12T00:24:53.014000',
               },
               {
                  sender: '65386e58642f664c56ab800f',
                  message: 'como andas?',
                  last_modified: '2023-11-12T00:24:53.014000',
                  date_created: '2023-11-12T00:24:53.014000',
               },
               {
                  sender: '65233646667fb42d32918fc7',
                  message: 'bn vos?',
                  last_modified: '2023-11-12T00:24:53.014000',
                  date_created: '2023-11-12T00:24:53.014000',
               },
               // Add more messages as needed
            ],
         },
         {
            id: '65501b55526e4efa99f694a1',
            user1: '65233646667fb42d32918fc8',
            user1_name: 'andres',
            user2: '65386e58642f664c56ab800f',
            user2_name: 'diego',
            messages: [
               {
                  sender: '65233646667fb42d32918fc7',
                  message: 'pepe',
                  last_modified: '2023-11-12T00:24:53.014000',
                  date_created: '2023-11-12T00:24:53.014000',
               },
               // Add more messages as needed
            ],
         },
         // Add more conversations as needed
      ],
   };

   const handleChatSelection = (chat) => {
      setSelectedChat(chat);
   };

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
                        {chat.user2_name}
                     </Box>
                  ))}
            </Box>
            {/* Right side - Display selected chat */}
            <Box flex={1} p={3}>
               {selectedChat && (
                  <Box>
                     <Box sx={{
                        fontVariant:"h5",
                        height: "50px",
                        background: "#ff3567",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "20px",
                        columnGap: "5px"
                        }}>
                        <AccountCircleIcon />
                        {selectedChat.user2_name}
                     </Box>
                     <Box sx={{
                        paddingTop: "20px",
                        paddingLeft: "20px",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "10px",
                     }}>
                        {selectedChat.messages.map((message, index) => (
                           <Box key={index}>
                              <Typography>
                                 {message.sender === '65233646667fb42d32918fc7' ? 'You: ' : `${selectedChat.user2_name}: `}
                                 {message.message}
                              </Typography>
                           </Box>
                        ))}
                     </Box>
                  </Box>
               )}
            </Box>
         </Box>
      </Box>
   );
};

export default Chats;
