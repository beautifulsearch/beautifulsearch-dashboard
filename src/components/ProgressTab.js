import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleSlidePanelActive, toggleSlidePanelDeactive } from "../store/global";

export default function ProgressTab() {
  const dispatch = useDispatch();
  let createCoreStatus = useSelector(state => state.global.createCoreStatus);
  let addDocumentStatus = useSelector(state => state.global.addDocumentStatus);
  let [ currentTaskProgress, setCurrentTaskProgress ] = useState(0);
  let [ taskCompletionCount, setTaskCompletionCount ] = useState(0);
  let slidePanelStatus = useSelector(state => state.global.slidePanelStatus);

  useEffect(() => {
    const checkingTaskStatus = () => {
      if(createCoreStatus === true) {
        setCurrentTaskProgress(25);
        setTaskCompletionCount(1)
        if(addDocumentStatus === true) {
          setCurrentTaskProgress(50);
          setTaskCompletionCount(2);
        }
      }
    }
    checkingTaskStatus();

  }, [ createCoreStatus, addDocumentStatus, slidePanelStatus ]);

  const slidePanelToggle = () => {
    if(slidePanelStatus === false) {
      dispatch(toggleSlidePanelActive());
    }
    else {
      dispatch(toggleSlidePanelDeactive());
    }
  }

  return (
    <div className="progress-component" onClick={ slidePanelToggle } >
      <div className="progress-component__container">
        <progress className="progress__bar" value={currentTaskProgress} max="100"></progress>
        <span className="progress-component__text">{`${taskCompletionCount}/2 tasks completed`}</span>
        <i className="fas fa-chevron-right task-bar__arrow"></i>
      </div>
    </div>
  );
}