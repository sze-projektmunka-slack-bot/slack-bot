import React, { useEffect } from "react";
import Header from "./components/header/header";
import * as toastr from "toastr";
import Home from './pages/Home/Home';
import Presentation from "./pages/Presentation/Presentation";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { getLocalToken } from "./actions";

const defRouteBeforeLogIn = "/home";
const defRouteAfterLogIn = "/presentation";

const App = (props) => {

    useEffect(() => {
      props.getLocalToken();
    }, []);

    toastr.options.iconClass = "custom-toastr-icon";

    const isLoggedIn = props.isLoggedIn;

    return (
      <div className="app">     
        <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/home" exact element={ isLoggedIn ? <Navigate to={defRouteAfterLogIn} /> : <Home /> } />
              <Route path="/presentation" element={ props.isLoggedIn ? <Presentation /> : <Navigate to={defRouteBeforeLogIn} /> } />
              <Route path="/login" exact element={ props.isLoggedIn ? <Navigate to={defRouteAfterLogIn} /> : <Login /> } />
              <Route path="/signup" exact element={ props.isLoggedIn ? <Navigate to={defRouteAfterLogIn} /> : <Signup /> } />      
              <Route path="*" exact element={<Navigate to={defRouteAfterLogIn} />} />
            </Routes>     
        </BrowserRouter>
      </div>
   );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps, {getLocalToken})(App);