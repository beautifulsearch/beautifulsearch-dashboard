import React, { useState } from "react";
import Switch from "react-switch";
import classNames from 'classnames';

export default function Relevance() {

let [ dropdown, toggleDropdownValue ] = useState(false);
let [ checked, toggleSwitchValue ] = useState(true);
let [ weightValue, toggleWeightValue ] = useState();

const editAttributes = () => {
  if(dropdown === false) {
    toggleDropdownValue(true);
    dropdown = true;
  } else {
      toggleDropdownValue(false);
      dropdown = false;
  }
}

const checkWeightValue = e => {
  weightValue = e.target.value;
  toggleWeightValue(e.target.value);
}

const handleToggleChange = e => {
  if(checked === true) {
    toggleSwitchValue(false);
    checked = false;
  } else {
    toggleSwitchValue(true);
    checked = true;
  }
}

const relevanceAttributes = ["id",
  "description",
  "nps_link",
  "location",
  "states",
  "title",
  "visitors",
  "world_heritage_site"
];

let relevanceAttributesToReturn = [];

relevanceAttributes.forEach((val, index) => {
  relevanceAttributesToReturn.push(
    <div key={index} className={classNames({'relevance-edit': dropdown})}>
      <div onClick={editAttributes} id={index} className={classNames({"relevance-attributes__container":true, 'relevance-edit__settings': dropdown})}>
        <div className="relevance__attribute"> 
          <div className="relevance-attribute__name">{val}</div>
          <div className="relevance-attribute__type">type</div>
        </div>
        <div className="relevance-attribute__filter">
          <p>2.4</p>
        </div>
      </div>
      <div className="relevance-text_Search">
        {  dropdown &&
          <div>
            <div className="relevance-container">
              <div className="relevance-value__header">Text Search</div>
              <div className="relevance-value__change">
                <Switch onChange={handleToggleChange} checked={checked} />
                <span className="relevance-value__text">Search this field</span>
              </div>
            </div>
            <div>
              { checked &&
              <div className="relevance-container">
                <div className="relevance-value__header">Weight</div>
                <input className="slider" type="range" min="0.0" max="10.0" onChange={checkWeightValue}/>
                <input className="slider-value" placeholder={weightValue} />
              </div>
              } 
            </div>
            <div className="boosts__container">
              <div className="relevance-value__header boost-text__header">Boosts</div>
              <button className="button--primary">
                Add Boosts
              </button>
            </div>
          </div>
        }
      </div>
    </div>)
});


  return (
    <div className="relevance">
      <div className="relevance__container">
        <div>
          <h1 className="relevance__welcome-text">Relevance Tuning</h1>
          <div className="relevance__headline">
            Set field weights and boosts.
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <button className="create-relevance__button button--secondary">
            Restore Defaults
          </button>  
          <button className="create-relevance__button button--primary">
            Save
          </button>
        </div>
      </div>
      <div className="relevance-attribute__container">
        <div className="relevance__attributes">
          <h3>Manage Fields</h3>
          <div className="relevance-attribute__table">
            { relevanceAttributesToReturn }
          </div> 
        </div>
        <div className="preview__container">
          <div className="preview__text">Preview</div>
          <input className="preview__input" placeholder="Search national-parks-demo"/>
          <div className="search__alert">
            Enter a query to see search results  
          </div>
        </div>
      </div>
    </div>
  );
}
