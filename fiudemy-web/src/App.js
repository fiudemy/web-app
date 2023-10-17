import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AppAppBar from './modules/views/AppAppBar';
import AppFooter from './modules/views/AppFooter';
import ProductDescription from './modules/views/ProductDescription';
import ProfessorHome from './modules/views/ProfessorHome';
import ProfessorInit from './modules/views/ProfessorInit';
import StudentHome from './modules/views/StudentHome';
import withRoot from './modules/withRoot';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <React.Fragment>
          <AppAppBar />
          <BrowserRouter>
            <Routes>
              <Route path="/sign-in" element={<SignIn route="/student-home" />}/>
              <Route path="/sign-up" element={<SignUp route="/student-home"/>}/>
              <Route path="/student-home" element={<StudentHome/>}/>
              <Route path="/professor" element={<ProfessorInit/>}/>
              <Route path="/professor-home" element={<ProfessorHome/>}/>
              <Route path="*" element={<ProductDescription/>}/>
            </Routes>
          </BrowserRouter>
          <AppFooter />
        </React.Fragment>
      </header>
    </div>
  );
}

export default withRoot(App);
