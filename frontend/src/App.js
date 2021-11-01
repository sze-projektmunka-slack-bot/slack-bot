import React from "react";
import { Switch, Router, Route, Redirect } from "react-router";
import { createBrowserHistory } from "history";
import Header from "./components/header/header";
import * as toastr from "toastr";
import Home from './pages/Home/Home';
import Presentation from "./pages/Presentation/Presentation";

const App = () => {
    const history = createBrowserHistory();
    toastr.options.iconClass = "custom-toastr-icon";
   return (
      <div className="app">     
        <Header />
        <Router history={history}>
            <Switch>
                <Route path="/presentation" component={Presentation} />
                <Route path="/home" component={Home} />
                
                <Redirect to="/presentation" />
            </Switch>
        </Router>
      </div>
   );
};

export default App;