import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import Navigation from './components/Navigation';
import Home from './views/Home';

import Solr from './services/solr';

// might want to move all the style file imports to styles.js file :)
import './assets/css/normalizer.css';
import './assets/css/constants.css';
import './App.css';
import './assets/css/components/navigation.css';

function App() {
  const solr = new Solr('gettingstarted');

  const fetchSchema = async () => {
    const response = await solr.getSchema();
    console.log(response);
  }

  useEffect(() => {
    fetchSchema();
  }, [])


  return (
    <Router>
      <div>
        <Navigation />

        <div className="matter">
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
