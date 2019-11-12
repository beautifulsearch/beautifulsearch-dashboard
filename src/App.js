import React, { } from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import Navigation from './components/Navigation';
import Home from './views/Home';
import Schema from './views/Schema';
import Documents from './views/Documents';
import Synonyms from './views/Synonyms';
import Relevance from './views/Relevance';

// might want to move all the style file imports to styles.js file :)
import './assets/css/normalizer.css';
import './assets/css/constants.css';
import './App.css';
import './assets/css/components/navigation.css';

function App() {
  const instance = useSelector(state => state.global.instance);
  const core = useSelector(state => state.global.core);

  return (
    <Router>
      <div>
        <Navigation />

        <div className="matter">
          <Switch>
            <Route exact path="/">
              <Home instance={instance} core={core}/>
            </Route>
            <Route exact path="/schema">
              <Schema instance={instance} core={core}/>
            </Route>
            <Route exact path="/documents">
              <Documents instance={instance} core={core}/>
            </Route>
            <Route exact path="/synonyms">
              <Synonyms instance={instance} core={core}/>
            </Route>
            <Route exact path="/relevance">
              <Relevance instance={instance} core={core}/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
