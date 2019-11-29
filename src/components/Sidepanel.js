import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleSlidePanelDeactive } from "../store/global";
import { useHistory } from "react-router-dom";

export default function Sidepanel() {
  const dispatch = useDispatch();
  const history = useHistory();
  let slidePanelStatus = useSelector(state => state.global.slidePanelStatus);
  let createCoreStatus = useSelector(state => state.global.createCoreStatus);
  let addDocumentStatus = useSelector(state => state.global.addDocumentStatus);
  let [ currentTaskProgress, setCurrentTaskProgress ] = useState(0);
  let [ taskCompletionCount, setTaskCompletionCount ] = useState(0);

  useEffect(() => {
    checkingTaskStatus();
  }, [ createCoreStatus, addDocumentStatus, slidePanelStatus]);

  const closeSlider = () => {
    if(slidePanelStatus === true) {
      dispatch(toggleSlidePanelDeactive());
    }
  }
  const checkingTaskStatus = () => {
    if(slidePanelStatus === true ) {
      if(createCoreStatus === true ) {
        let createCore = document.getElementById('panel-create-core');
        createCore.classList.add('slide-panel__checkbox--active');
        let createCoreText = document.getElementById('panel-create-text');
        createCoreText.classList.add('slide-panel__text--active');
        let panelCore = document.getElementById('panel-core');
        panelCore.classList.add('slide-panel__content--active');
        setCurrentTaskProgress(25);
        setTaskCompletionCount(1)
        if(addDocumentStatus === true) {
          let createCore = document.getElementById('panel-add-record');
          createCore.classList.add('slide-panel__checkbox--active');
          let createCoreText = document.getElementById('panel-add-text');
          createCoreText.classList.add('slide-panel__text--active');
          let panelCore = document.getElementById('panel-record');
          panelCore.classList.add('slide-panel__content--active');
          setCurrentTaskProgress(50);
          setTaskCompletionCount(2)
        }
      }
    }
  }

  const uploadRecord = () => {
    dispatch(toggleSlidePanelDeactive());
    history.push('/documents','sidepanel');
  }

  return (
    <div id="slide-panel-overlay" className="slide-panel__overlay">
      <div className="slide__panel slide__panel--visible">
        <div className="slide-panel__heading">
          <h2 style={{marginLeft: "20"}}>Sample task List</h2>
          <span className="close" onClick={closeSlider}>×</span>
        </div>
        <div className="slide-panel__content">
          <div className="progress-bar__container">
            <div className="progress-bar__text">{`${taskCompletionCount}/2 tasks completed`}</div>
            <progress className="panel-progress__bar" value={currentTaskProgress} max="100"></progress>
          </div>
        </div> 
        <div className="slide-panel__content">
          <div className="panel-checkbox__container">
            <div id="panel-create-core">
              {
                createCoreStatus ? 
                <i className="fas fa-check-circle"></i> :
                <p className="slide-panel__checkbox"></p>
              }
            </div>
          </div>
          <div id="panel-core" className="panel-text__container">
            <div id="panel-create-text" className="slide-panel__text">Create a core</div>
            <div className="slide-panel__body">A core stores the data that you want to make searchable in name.</div>
          </div>
        </div>
        <div className="slide-panel__content">
          <div className="panel-checkbox__container">
            <div id="panel-add-record">
              {
                addDocumentStatus ? 
                <i className="fas fa-check-circle"></i> :
                <p className="slide-panel__checkbox"></p>
              }
            </div>
          </div>
          <div id="panel-record" className="panel-text__container">
            <div id="panel-add-text" className="slide-panel__text">Add records to search</div>
            <div className="slide-panel__body">Records are the information that you want to make searchable. You can push data via the API or through our Dashboard UI.</div>
            <button className="button--primary panel-upload__link" onClick={uploadRecord} disabled={addDocumentStatus}>Upload record(s)</button>
          </div>
        </div>
      </div>
    </div>
  );
}
