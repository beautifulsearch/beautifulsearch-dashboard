import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import Solr from "./services/solr";

import Navigation from './components/Navigation';
import Sidepanel from './components/Sidepanel';
import Home from './views/Home';
import Schema from './views/Schema';
import Documents from './views/Documents';
import Synonyms from './views/Synonyms';
import Relevance from './views/Relevance';

import { connect, disconnect } from "./store/global";

// might want to move all the style file imports to styles.js file :)
import './assets/css/normalizer.css';
import './assets/css/constants.css';
import './App.css';
import './assets/css/components/navigation.css';

function App() {
  const dispatch = useDispatch();
  const instance = useSelector(state => state.global.instance);
  const core = useSelector(state => state.global.core);
  const connected = useSelector(state => state.global.connected);
  const [statusPoll, setStautsPoll] = useState(null);

  const checkConnection = async () => {
    const solr = new Solr(instance);
    try {
      await solr.getStatus();
      dispatch(connect());
    } catch (e) {
      dispatch(disconnect());
    }
  }

  useEffect(() => {
    checkConnection();
    const tracker = window.setInterval(checkConnection, (15*1000));
    setStautsPoll(tracker);

    return () => {
      window.clearInterval(statusPoll);
    }
  }, [])

  return (
    <Router>
      <div>
        <Navigation />
        <Sidepanel />

        {!connected && <div>Check your connection</div>}
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
              <Synonyms/>
            </Route>
            <Route exact path="/relevance">
              <Relevance/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
