import React from "react";
import { Switch, Router, Route, Redirect } from "react-router";
import { createBrowserHistory } from "history";
import Home from "./pages/Home/Home";

const App = () => {
    const history = createBrowserHistory();

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