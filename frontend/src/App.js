import React from "react";
import { Switch, Router, Route, Redirect } from "react-router";
import { createBrowserHistory } from "history";
import Home from "./pages/Home/Home";
import * as toastr from "toastr";

const App = () => {
    const history = createBrowserHistory();
    toastr.options.iconClass = "custom-toastr-icon";
   return (
      <div className="app">
          <Router history={history}>
              <Switch>
                  <Route path="/home" component={Home} />
                  <Redirect to="/home" />
              </Switch>
          </Router>
      </div>
   );
};

export default App;