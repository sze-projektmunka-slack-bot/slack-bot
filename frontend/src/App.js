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

const App = (props) => {

    useEffect(() => {
      props.getLocalToken();
    }, []);

    toastr.options.iconClass = "custom-toastr-icon";
    return (
      <div className="app">     
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/home" exact element={<Home />} />
                <Route path="/presentation" exact 
                  element={props.isLoggedIn ? <Presentation /> : <Navigate to="/home" />} 
                />
                <Route path="/login" exact element={props.isLoggedIn ? <Navigate to="/presentation" /> : <Login />} />
                <Route path="/signup" exact element={props.isLoggedIn ? <Navigate to="/presentation" /> : <Signup />} />      
                <Route path="*" exact element={<Navigate to="/home" />} />
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