import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleSlidePanel } from "../store/global";
import { useHistory } from "react-router-dom";

export default function Sidepanel() {
  const dispatch = useDispatch();
  const history = useHistory();
  let slidePanelStatus = useSelector(state => state.global.slidePanelStatus);
  let onboarding = useSelector(state => state.global.onboarding);

  const closeSlider = () => {
    dispatch(toggleSlidePanel());
  }


  // TODO: remove this and use react classes for dynamic classnames
  const checkingTaskStatus = () => {
    if(slidePanelStatus === true ) {
      if(onboarding.coreCreated === true ) {
        let createCore = document.getElementById('panel-create-core');
        createCore.classList.add('slide-panel__checkbox--active');
        let createCoreText = document.getElementById('panel-create-text');
        createCoreText.classList.add('slide-panel__text--active');
        let panelCore = document.getElementById('panel-core');
        panelCore.classList.add('slide-panel__content--active');
        if(onboarding.documentImported === true) {
          let createCore = document.getElementById('panel-add-record');
          createCore.classList.add('slide-panel__checkbox--active');
          let createCoreText = document.getElementById('panel-add-text');
          createCoreText.classList.add('slide-panel__text--active');
          let panelCore = document.getElementById('panel-record');
          panelCore.classList.add('slide-panel__content--active');
        }
      }
    }
  }

  const uploadRecord = () => {
    dispatch(toggleSlidePanel());
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
            <div className="progress-bar__text">{`${1}/2 tasks completed`}</div>
            <progress className="panel-progress__bar" value={1} max="100"></progress>
          </div>
        </div>
        <div className="slide-panel__content">
          <div className="panel-checkbox__container">
            <div id="panel-create-core">
              {
                onboarding.coreCreated ?
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
                onboarding.documentImported ?
                <i className="fas fa-check-circle"></i> :
                <p className="slide-panel__checkbox"></p>
              }
            </div>
          </div>
          <div id="panel-record" className="panel-text__container">
            <div id="panel-add-text" className="slide-panel__text">Add records to search</div>
            <div className="slide-panel__body">Records are the information that you want to make searchable. You can push data via the API or through our Dashboard UI.</div>
            <button className="button--primary panel-upload__link" onClick={uploadRecord}>Upload record(s)</button>
          </div>
        </div>
      </div>
    </div>
  );
}
