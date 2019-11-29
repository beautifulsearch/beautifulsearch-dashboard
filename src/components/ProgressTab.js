import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleSlidePanel } from "../store/global";

export default function ProgressTab() {
  const dispatch = useDispatch();
  let slidePanelStatus = useSelector(state => state.global.slidePanelStatus);
  let onboarding = useSelector(state => state.global.onboarding);


  const slidePanelToggle = () => {
    dispatch(toggleSlidePanel());
  }

  return (
    <div className="progress-component" onClick={ slidePanelToggle } >
      <div className="progress-component__container">
        <progress className="progress__bar" value={1} max="100"></progress>
        <span className="progress-component__text">{`${1}/2 tasks completed`}</span>
        <i className="fas fa-chevron-right task-bar__arrow"></i>
      </div>
    </div>
  );
}
