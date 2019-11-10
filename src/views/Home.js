import React from 'react';
import { useHistory } from "react-router-dom";
import cogoToast from "cogo-toast";

import Solr from "../services/solr";

export default function Home({ appState, setAppState }) {
  const history = useHistory();
  const { instance, cores } = appState;

  const handleInstanceChange = (e) => {
    const instance = e.target.value;
    setAppState({
      ...appState,
      instance
    });
  }

  const onConnect = async () => {
    // when a new connection attempt is made make sure to remove any pre selected core
    localStorage.removeItem('core');
    // will be used by the solr service to make requests
    localStorage.setItem('instance', instance.trim());


    try {
      const solr = new Solr();
      if (!solr) return;
      const { data } = await solr.getStatus();
      const cores = Object.keys(data.status);
      cogoToast.success("Connection to Solr successful");
      setAppState({
        ...appState,
        cores,
        core: "",
      });
    } catch(e) {
      console.log(e);
      cogoToast.error(e.message || "Failed to connect to the Solr instance");
    }
  }

  const onCoreChange = e => {
    const core = e.target.value;
    localStorage.setItem("core", core.trim());
    setAppState({
      ...appState,
      core
    });
    history.push('/schema');
  }


  return (
    <div className="home__container">
      {/* connection */}
      <div className="connection__box">
        <h4 className="connection__welcome-text">Welcome to BeautifulSearch</h4>
        <h2 className="connection__headline">
          Let's start by connecting to your Solr instance
        </h2>
        <h5 className="connection__subheading">
          This Solr instance will be used for all operations like query
          optimization and relevence tuning.
        </h5>

        <input
          type="url"
          className="connection__url"
          placeholder="https://www.mysolr.com"
          value={instance}
          onChange={handleInstanceChange}
        />
        <button
          className="connection__button button--primary"
          onClick={onConnect}
        >
          Connect
        </button>
      </div>

      {/* select cores */}
      <div className="core__list">
        <h4 className="connection__welcome-text" style={{marginTop: 0, paddingTop: 0}}>Select a Core</h4>
        <div>
          {cores.length === 0 && (
            <div className="core__empty">No Cores Found</div>
          )}
          {cores.map(c => (
            <div className="core__item">
              <label>
                <input
                  type="radio"
                  name="core"
                  value={c}
                  onChange={onCoreChange}
                />
                {c}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
