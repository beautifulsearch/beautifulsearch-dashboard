import React from "react";

const schemaAttributes = ["id",
  "description",
  "nps_link",
  "location",
  "states",
  "title",
  "visitors"
];

let schemaAttributesToReturn = [];

schemaAttributes.forEach((val, index) => {
  schemaAttributesToReturn.push(
    <tr className="document__attribute" key={index}> 
      <td>{val}</td>
      <td style={{ color: "#b8c2cc"}}> => </td>
      <td style={{ fontWeight: "400" }}> 
        sample text here      
      </td>
    </tr>)
});

export default function Schema() {
  return (
    <div className="documents">
      <div className="documents__container">
        <h1 className="documents__welcome-text">Documents</h1>
        <div style={{display: "flex"}}>
          <button className="create-schema__button button--primary">
            Index Documents
          </button>
        </div>
      </div>
      <div className="documents-attribute__container">
        <div className="documents__attributes">
          <p style={{ color: "#b8c2cc"}} >ID <span style={{ color: "#8795a1"}}>park_great-smoky-mountains</span></p>
          <table className="documents-attribute__table">
            <tbody>
              { schemaAttributesToReturn }
            </tbody>  
          </table>
        </div>
      </div>
    </div>
  );
}