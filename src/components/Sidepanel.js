import React, { useEffect, useState } from 'react';

export default function Sidepanel() {
  let [ slideVisible, toggleSlideVisible ] = useState(false);

  useEffect(() => {
    dragSlider();
  }, []);

  const dragSlider = () => {
    let currentElement  = document.getElementById('slide-panel-overlay');
    currentElement.classList.remove('slide-panel__overlay');
    toggleSlideVisible(false);
  }

  return (
    <div id="slide-panel-overlay" className="slide-panel__overlay">
      { slideVisible &&
        <div className="slide__panel slide__panel--visible">
          <div className="slide-panel__heading">
            <h2 style={{marginLeft: "20"}}>Sample task List</h2>
            <span className="close" onClick={dragSlider}>×</span>
          </div>
          <div className="slide-panel__content">
            <div className="progress-bar__container">
              <div className="progress-bar__text">1/4 tasks completed</div>
              <progress className="panel-progress__bar" value="25" max="100"></progress>
            </div>
          </div> 
          <div className="slide-panel__content">
            <div className="panel-checkbox__container">
              <p className="slide-panel__checkbox"></p>  
            </div>
            <div className="panel-text__container">
              <div className="slide-panel__text">Create an index</div>
              <div className="slide-panel__body">An index stores the data that you want to make searchable in name.</div>
            </div>
          </div>
          <div className="slide-panel__content">
            <div className="panel-checkbox__container">
              <p className="slide-panel__checkbox"></p>
            </div>
            <div className="panel-text__container">
              <div className="slide-panel__text">Add records to search</div>
              <div className="slide-panel__body">Records are the information that you want to make searchable. You can push data via the API or through our Dashboard UI.</div>
              <button className="button--primary panel-upload__link">Upload record(s)</button>
            </div>
          </div>
          <div className="slide-panel__content">
            <div className="panel-checkbox__container">
              <p className="slide-panel__checkbox"></p>  
            </div>
            <div className="panel-text__container">
              <div className="slide-panel__text">Configure searchable attributes</div>
              <div className="slide-panel__body">Select the attributes of your data that you want to make searchable. See guide for more details.</div>
            </div>
          </div>
          <div className="slide-panel__content">
            <div className="panel-checkbox__container">
              <p className="slide-panel__checkbox"></p>  
            </div>
            <div className="panel-text__container">
              <div className="slide-panel__text">Configure custom ranking</div>
              <div className="slide-panel__body">Use a custom ranking attribute to order your results by a metric that's important to your business goals. See guide for more details.</div>
            </div>
          </div>
        </div>  
      }
    </div>
  );
}
