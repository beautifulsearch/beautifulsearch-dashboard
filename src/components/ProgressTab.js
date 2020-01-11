import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleSlidePanel } from "../store/global";

export default function ProgressTab() {
  const dispatch = useDispatch();
  let onboarding = useSelector(state => state.global.onboarding);
  const [ taskProgress, setTaskProgress ] = useState({});

  useEffect(() => {
    const onboardingProgress = () => {
      const taskKeys = Object.keys(onboarding);
      const taskLength = taskKeys.length;
      const taskValue = Object.values(onboarding);
      let taskCompletedcount = 0;
      taskValue.forEach( value => {
        if(value === true) {
          taskCompletedcount += taskCompletedcount;
        }
      })
      const progress = (taskCompletedcount/taskLength)* 100;

      const task = { tasksCount: taskLength, progress: progress, tasksCompleted: taskCompletedcount};
      setTaskProgress(task);
    }
    onboardingProgress();
  }, [onboarding]);

  const slidePanelToggle = () => {
    dispatch(toggleSlidePanel());
  }

  return (
    <div className="progress-component" onClick={ slidePanelToggle } >
      <div className="progress-component__container">
        <progress className="progress__bar" value={taskProgress.progress} max="100"></progress>
        <span className="progress-component__text">{`${taskProgress.tasksCompleted}/${taskProgress.tasksCount} tasks completed`}</span>
        <i className="fas fa-chevron-right task-bar__arrow"></i>
      </div>
    </div>
  );
}
