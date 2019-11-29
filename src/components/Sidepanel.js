import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from "react-redux";
import { toggleSlidePanel } from "../store/global";
import { useHistory } from "react-router-dom";

export default function Sidepanel() {
  const dispatch = useDispatch();
  const history = useHistory();
  let onboarding = useSelector(state => state.global.onboarding);

  const closeSlider = () => {
    dispatch(toggleSlidePanel());
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


        <div className={classNames({"slide-panel__content": true, "slide-panel__content--checked": onboarding.coreCreated})}>
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

        <div className={classNames({"slide-panel__content": true, "slide-panel__content--checked": onboarding.documentImported})}>
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
