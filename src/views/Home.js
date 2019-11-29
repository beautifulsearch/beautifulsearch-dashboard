import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import cogoToast from "cogo-toast";

// import Solr from "solr-admin-client";
import Solr from "../services/solr";
import { setInstance, connect, listCores, setCore, setOnboardingDetails } from "../store/global";

export default function Home({ instance, core }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const cores = useSelector(state => state.global.cores) || [];
  const [newCoreName, setNewCoreName] = useState("");

  const handleInstanceChange = (e) => {
    const instance = e.target.value || "";
    dispatch(setInstance(instance.trim()));
  }

  const onConnect = async () => {
    // when a new connection attempt is made make sure to remove any pre selected core
    dispatch(setCore(null));

    try {
      const solr = new Solr(instance, null);
      if (!solr) return;
      const { data } = await solr.getStatus();
      const cores = Object.keys(data.status);
      cogoToast.success("Connection to Solr successful");
      dispatch(connect());
      dispatch(listCores(cores));
    } catch(e) {
      console.log(e);
      cogoToast.error(e.message || "Failed to connect to the Solr instance");
    }
  }

  const onCoreChange = e => {
    const core = e.target.value || "";
    dispatch(setCore(core.trim()));
    history.push('/schema');
  }

  const createCore = async () => {
    const solr = new Solr(instance, core);
    try{
      const { data } = await solr.createCore(newCoreName);
      cogoToast.success(data.msg);
      dispatch(setOnboardingDetails({ coreCreated: true }));
      await solr.setSidePanelValues(true, false);
      cogoToast.success("Task Completed Succefully");
    } catch(e) {
      console.log(e)
      // cogoToast.error(data.msg);
    }
    onConnect();
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
            <div className="core__item" key={c}>
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

          {
            <div className="core__item">
              <input type="text" value={newCoreName} onChange={e => setNewCoreName(e.target.value)}/>
              <button className="button--secondary" onClick={createCore}>Create Core</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
