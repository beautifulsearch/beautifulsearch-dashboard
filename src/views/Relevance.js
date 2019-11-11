import React from "react";

export default function Relevance() {

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
    <div className="relevance-attributes__container" key={index}>
      <div className="relevance__attribute"> 
        <div className="relevance-attribute__name">{val}</div>
        <div className="relevance-attribute__type">type</div>
      </div>
      <div className="relevance-attribute__filter">
        <p>2.4</p>
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
