import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import Navigation from './components/Navigation';
import Home from './views/Home';
import Schema from './views/Schema';
import Documents from './views/Documents';

// might want to move all the style file imports to styles.js file :)
import './assets/css/normalizer.css';
import './assets/css/constants.css';
import './App.css';
import './assets/css/components/navigation.css';

function App() {
  const [appState, setAppState] = useState({
    instances: [],
    instance: localStorage.getItem("instance") || "",
    cores: [],
    core: localStorage.getItem("core") || ""
  });

  return (
    <Router>
      <div>
        <Navigation />

        <div className="matter">
          <Switch>
            <Route exact path="/">
              <Home appState={appState} setAppState={setAppState}/>
            </Route>
            <Route exact path="/schema">
              <Schema />
            </Route>
            <Route exact path="/documents">
              <Documents />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
