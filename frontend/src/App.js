import React, { useEffect } from "react";
import Header from "./components/header/header";
import * as toastr from "toastr";
import Home from './pages/Home/Home';
import Presentation from "./pages/Presentation/Presentation";
import Workspaces from "./pages/Workspaces/Workspaces";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { BrowserRouter, Route, Routes, Navigate, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { getLocalToken } from "./actions";
import Workspace from "./pages/Workspace/Workspace";

const defRouteBeforeLogIn = "/home";
const defRouteAfterLogIn = "/presentation";

const App = (props) => {

    useEffect(() => {
      props.getLocalToken();
    }, []);

    toastr.options.iconClass = "custom-toastr-icon";

    const isLoggedIn = localStorage.getItem('token');
    return (
      <div className="app">     
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="workspaces" element={ isLoggedIn ? <Workspaces /> : <Navigate to={defRouteBeforeLogIn} /> } />
                <Route path="workspaces/:id" element={ isLoggedIn ? <Workspace /> : <Navigate to={defRouteBeforeLogIn} /> } />
                <Route path="home" element={ isLoggedIn ? <Navigate to={defRouteAfterLogIn} /> : <Home /> } />
                <Route path="presentation" element={ isLoggedIn ? <Presentation /> : <Navigate to={defRouteBeforeLogIn} /> } />
                <Route path="login" element={ isLoggedIn ? <Navigate to={defRouteAfterLogIn} /> : <Login /> } />
                <Route path="signup" element={ isLoggedIn ? <Navigate to={defRouteAfterLogIn} /> : <Signup /> } />      
                <Route path="*" exact element={<Navigate to={defRouteAfterLogIn} />} />
            </Routes>     
        </BrowserRouter>
      </div>
   );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.token
  };
};

export default connect(mapStateToProps, {getLocalToken})(App);