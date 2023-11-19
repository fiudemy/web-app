import {useParams} from "react-router-dom";
import {getForumData} from "../../../services/axios_utils";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import {ListItem} from "@mui/material";
import AppAppBar from "../../views/AppAppBar";
import ForumIcon from '@mui/icons-material/Forum';

export const CourseForum = () => {
   const { courseId } = useParams();
   const [forumData, setForumData] = useState(null);
   const [selectedDiscussion, setSelectedDiscussion] = useState(null);
   useEffect(() => {
      const fetchAndSetForumData = async () => {
         const forumData = await getForumData(courseId);
         setForumData(forumData);
      }
      fetchAndSetForumData();
   }, [courseId]);
   const handleDiscussionSelection = (discussion) => {
      setSelectedDiscussion(discussion);
   };
   const isStudent = localStorage.getItem("userRole") === "student";
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
                  <div>
                     <Typography variant="h5">{selectedDiscussion.title}</Typography>
                     <List>
                        {selectedDiscussion.messages.map((message, index) => (
                           <ListItem key={index}>
                              <Typography>{`${message.sender_name}: ${message.message}`}</Typography>
                           </ListItem>
                        ))}
                     </List>
                  </div>
               )}
            </Box>
         </Box>
      </Box>
   );
};