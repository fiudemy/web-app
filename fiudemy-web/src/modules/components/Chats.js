import React, { useState } from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';

const Chats = () => {
   const [selectedChat, setSelectedChat] = useState(null);

   const chatData = {
      results: [
         {
            id: '65501b55526e4efa99f694a1',
            user1: '65233646667fb42d32918fc7',
            user2: '65386e58642f664c56ab800f',
            messages: [
               {
                  sender: '65233646667fb42d32918fc7',
                  message: 'hola',
                  last_modified: '2023-11-12T00:24:53.014000',
                  date_created: '2023-11-12T00:24:53.014000',
               },
               // Add more messages as needed
            ],
         },
         {
            id: '65501b55526e4efa99f694a1',
            user1: '65233646667fb42d32918fc8',
            user2: '65386e58642f664c56ab800f',
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
      <Box display="flex">
         {/* Left side - List of people */}
         <Box width={300} borderRight="1px solid #ccc">
            <List>
               {chatData.results.map((chat) => (
                  <ListItem key={chat.id} onClick={() => handleChatSelection(chat)}>
                     <Typography>{chat.user1}</Typography>
                  </ListItem>
               ))}
            </List>
         </Box>

         {/* Right side - Display selected chat */}
         <Box flex={1} p={3}>
            {selectedChat && (
               <div>
                  <Typography variant="h5">Chat with {selectedChat.user1}</Typography>
                  <List>
                     {selectedChat.messages.map((message, index) => (
                        <ListItem key={index}>
                           <Typography>
                              {message.sender === '65233646667fb42d32918fc7' ? 'You: ' : `${selectedChat.user1}: `}
                              {message.message}
                           </Typography>
                        </ListItem>
                     ))}
                  </List>
               </div>
            )}
         </Box>
      </Box>
   );
};

export default Chats;
