import React from "react";
import Header from "./components/header/header";
import * as toastr from "toastr";
import Home from './pages/Home/Home';
import Presentation from "./pages/Presentation/Presentation";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
    toastr.options.iconClass = "custom-toastr-icon";
    return (
      <div className="app">     
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/presentation" exact element={<Presentation />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/signup" exact element={<Signup />} />      
            </Routes>     
        </BrowserRouter>
      </div>
   );
};

export default App;