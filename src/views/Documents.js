import React, { useEffect, useState } from "react";
import Solr from '../services/solr';
import JsonEditor from '../components/JsonEditor';
import Modal from 'react-modal';

export default function Documents({ instance, core }) {
  // const [fieldTypes, setDocuments] = useState([]);
  const [showingJsonModal, toggleJsonModal] = useState(false);
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

  useEffect(() => {
    fetchDocumentsAttributes();
  }, []);

  const fetchDocumentsAttributes = async () => {
    const solr = new Solr(instance, core);
    const { data } = await solr.query();
    // console.log(data);
    // setDocuments(data.fieldTypes);
  }

  return (
    <div className="documents">
      <div className="documents__container">
        <h1 className="documents__welcome-text">Documents</h1>
        <div style={{display: "flex"}}>
          <button onClick={() => toggleJsonModal(true)} className="create-schema__button button--primary">
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
      <Modal
        isOpen={showingJsonModal}
        contentLabel="Label Here"
        onRequestClose={() => toggleJsonModal(false)}
        className="synonyms-modal__content"
        overlayClassName="modal__overlay">

          <div className="synonym-modal__header">
            <h3 style={{fontWeight: "400"}}>Add new documents to <b>park_great-smoky-mountains</b></h3>
            <span className="close" onClick={() => toggleJsonModal(false)}>×</span>
          </div>
          <JsonEditor></JsonEditor>
          <div className="synonym-modal__button">
            <button onClick={() => toggleJsonModal(false)} className="button--secondary">
              Cancel
            </button>
            <button className="button--primary continue__button">
              Continue
            </button>
          </div>
      </Modal>
    </div>
  );
}
