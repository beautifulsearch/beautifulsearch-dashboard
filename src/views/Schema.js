import React from "react";

const schemaAttributes = ["id",
  "description",
  "nps_link",
  "location",
  "states",
  "title",
  "visitors"
];

const attributeValue = [ "text", "number", "date", "geolocation" ];

let schemaAttributesToReturn = [];

schemaAttributes.forEach((val, index) => {
  schemaAttributesToReturn.push(
    <tr className="schema__attribute" key={index}> 
      <td>{val}</td>
      <td> 
        <select className="attribute__value">
          <option>{attributeValue[0]}</option>
          <option>{attributeValue[1]}</option>
          <option>{attributeValue[2]}</option>
          <option>{attributeValue[3]}</option>
        </select>
      </td>
    </tr>)
});

export default function Schema() {
  return (
    <div className="schema">
      <div className="schema__container">
        <div>
          <h1 className="schema__welcome-text">Manage Engine Schema</h1>
          <div className="schema__headline">Add new fields or change the types of existing ones.</div>
        </div>
        <div style={{display: "flex"}}>
          <button className="create-schema__button button--primary">
            Create a Schema Field
          </button>
          <button className="create-schema__button button--secondary">
            Update types
          </button>
        </div>
      </div>
      <div className="schema-attribute__container">
        <table className="schema-container__table">
          <tbody>
            { schemaAttributesToReturn }
          </tbody>
        </table>
      </div>
    </div>
  );
}
