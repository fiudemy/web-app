import * as React from 'react';
import AppFooter from './modules/views/AppFooter';
import ProductValues from './modules/views/ProductValues';
import AppAppBar from './modules/views/AppAppBar';
import ProductDescription from './modules/views/ProductDescription';
import withRoot from './modules/withRoot';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <React.Fragment>
          <AppAppBar />
          <BrowserRouter>
            <Routes>
              <Route path="/sign-in" element={<SignIn/>}/>
              <Route path="/sign-up" element={<SignUp/>}/>
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
