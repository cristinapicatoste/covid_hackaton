import { HOME } from "./routes/routes";
import Home from "./pages/home";
import "./App.css";
import Navbar from "./components/Navbar";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (

    <Router>
      <Navbar />
      <div className={"container"}>
        <div className="main">
          <Switch>
            <Route exact path={HOME} component={Home} />
          </Switch>
        </div>
      </div>
    </Router>

  );
}

export default App;
