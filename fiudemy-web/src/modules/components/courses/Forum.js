import {useParams} from "react-router-dom";
import {getForumData} from "../../../services/axios_utils";
import {useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppAppBar from "../../views/AppAppBar";
import ForumIcon from '@mui/icons-material/Forum';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

export const CourseForum = () => {
   const { courseId } = useParams();
   const [forumData, setForumData] = useState(null);
   const [selectedDiscussion, setSelectedDiscussion] = useState(null);
   const [newMessage, setNewMessage] = useState('');
   const currentUserId = localStorage.getItem("userId");
   const messagesContainerRef = useRef(null);
   useEffect(() => {
      const fetchAndSetForumData = async () => {
         const forumData = await getForumData(courseId);
         setForumData(forumData);
      }
      fetchAndSetForumData();
   }, [courseId]);
   useEffect(() => {
      // Scroll to the bottom when the selectedChat changes
      if (messagesContainerRef.current) {
         messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
   }, [selectedDiscussion]);
   const handleDiscussionSelection = (discussion) => {
      setSelectedDiscussion(discussion);
   };
   const isStudent = localStorage.getItem("userRole") === "student";
   const handleSendMessage = async () => {
      if (newMessage.trim() === '') {
         return;
      }
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
   if (!forumData) {
      return <div> Loading </div>
   }
   return (
      <Box>
         <AppAppBar showsSignInOptions={false} isStudent={isStudent} isChat={true}/>
         <Box display="flex">
            {/* Left side - List of discussions */}
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
                  {forumData.results.map((discussion) => (
                     <Box key={discussion.id} onClick={() => handleDiscussionSelection(discussion)} sx={{
                        height: "50px",
                        borderBottom: "1px solid #ccc",
                        display: "flex",
                        justifyContent: "center"
                     }}>
                        <ForumIcon />
                        {discussion.title}
                     </Box>
                  ))}
               </Box>
            </Box>
            {/* Right side - Display messages of the selected discussion */}
            <Box flex={1} p={3}>
               {selectedDiscussion && (
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
                        <ForumIcon />
                        <Typography>{selectedDiscussion.title}</Typography>
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
                        {selectedDiscussion.messages.map((message, index) => (
                           <Box key={index}>
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
                                    columnGap: "10px"
                                 }}>
                                    <Box sx={{
                                       display: "flex",
                                       flexDirection: "column",
                                       fontSize: "10px",
                                       alignItems: "center"}}>
                                       <AccountCircleIcon fontSize={"medium"}/>
                                       <Box>{message.sender_name}</Box>
                                    </Box>
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