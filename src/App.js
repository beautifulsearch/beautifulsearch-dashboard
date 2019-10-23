import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Navigation from './components/Navigation';

// might want to move all the style file imports to styles.js file :)
import './assets/css/normalizer.css';
import './assets/css/constants.css';
import './App.css';
import './assets/css/components/navigation.css';

function App() {
  return (
    <Router>
      <div>
        <Navigation />

        <div className="matter">
          <Switch>
            <Route path="/">
              Home how are you
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
