import * as React from 'react';
import AppFooter from './modules/views/AppFooter';
import ProductValues from './modules/views/ProductValues';
import AppAppBar from './modules/views/AppAppBar';
import ProductDescription from './modules/views/ProductDescription';
import withRoot from './modules/withRoot';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import StudentHome from './modules/views/StudentHome';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <React.Fragment>
          <AppAppBar />
          <BrowserRouter>
            <Routes>
              <Route path="/home" element={<ProductDescription/>}>
              </Route>
              <Route path="/student-home" element={<StudentHome/>}>
              </Route>
            </Routes>
          </BrowserRouter>
          {/* <ProductValues /> */} 
          {/* comente ese productvalues pq no entiendo q hace ahi */}
          <AppFooter />
        </React.Fragment>
      </header>
    </div>
  );
}

export default withRoot(App);
