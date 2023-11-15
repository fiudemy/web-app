import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./modules/views/SignIn/SignInScreen";
import SignUp from "./modules/views/SignUp/SignUpScreen";
import ProductDescription from './modules/views/ProductDescription';
import ProfessorHome from './modules/views/ProfessorHome';
import StudentHome from './modules/views/StudentHome';
import MarketPlace from './modules/views/MarketPlace';
import CourseHome from './modules/views/Courses/CourseHomeScreen';
import withRoot from './modules/withRoot';
import EditCourse, { ViewCourse } from "./modules/components/courses/EditCourse";
import Chats from "./modules/components/Chats";
import Profile from './modules/views/Profile';
import Friends from './modules/views/Friends';
import FriendsApplication from './modules/views/FriendsApplication';
import Users from './modules/views/Users';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <React.Fragment>
          <BrowserRouter>
            <Routes>
              <Route path="/sign-in" element={<SignIn/>}/>
              <Route path="/sign-up" element={<SignUp/>}/>
              <Route path="/student-home" element={<StudentHome/>}/>
              <Route path="/professor-home" element={<ProfessorHome/>}/>
              <Route path="/courses/:courseId" element={<ViewCourse/>}/>
              <Route path="/marketplace" element={<MarketPlace/>}/>
              <Route path="/course" element={<CourseHome/>}/>
              <Route path="/chats" element={<Chats/>}/>
              <Route path="/profile/:userId" element={<Profile/>}/>
              <Route path="/friends/:userId" element={<Friends/>}/>
              <Route path="/friendsApplication/:userId" element={<FriendsApplication/>}/>
              <Route path="/users" element={<Users/>}/>
              <Route path="*" element={<ProductDescription/>}/>
            </Routes>
          </BrowserRouter>
        </React.Fragment>
      </header>
    </div>
  );
}

export default withRoot(App);
