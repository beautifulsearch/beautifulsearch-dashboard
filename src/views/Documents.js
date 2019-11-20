import React, { useEffect, useState } from "react";
import JsonEditor from '../components/JsonEditor';
import Modal from 'react-modal';
import cogoToast from "cogo-toast";
import Solr from '../services/solr';


export default function Documents({ instance, core }) {
  const [ documents, setDocuments ] = useState([]);
  const [ optionToUpload, toggleOptionToUpload ] = useState(true);
  const [ jsonUpload, toggleJsonUpload ] = useState(true);
  const [ showingJsonModal, toggleJsonModal ] = useState(false);
  const [ schemaFields, setSchemaFields ] = useState([]);
  const [ working, setWorking ] = useState(false);
  const [ idField, setIdField ] = useState('');
  const [ file, setFile ] = useState();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const solr = new Solr(instance, core);
    const { data } = await solr.query();
    setDocuments(data.response.docs);
  }

  const onClosingModal = () => {
    toggleJsonModal(false);
    toggleOptionToUpload(true);
    toggleJsonUpload(true);
    setFile(null);
  }

  const onFileChange = (event) => {
    let file =  event.target.files[0];
    setFile(file);
    getFileSchema(file);
  }

  const getFileSchema = async (file) => {
    setWorking(true);
    const solr = new Solr(instance, core);
    const fileName = file.name;
    var reader = new FileReader();
    reader.onload = async (e) => {
      var fileContent = e.target.result;
      try {
        await solr.uploadJson(fileName, JSON.parse(fileContent))
      } catch(e) {
        const schemaFields = Object.keys(e.response.data.schema);
        setSchemaFields(schemaFields);
        setWorking(false);
      }
    };
    reader.readAsText(file);
  }

  const upload = async (fileName, fileContent) => {
    const solr = new Solr(instance, core);
    try {
      await solr.completeImport(fileName, idField);
      toggleJsonModal(false);
      cogoToast.success('File upload successfull');
      fetchDocuments();
    } catch(e) {
      console.log(e);
    }
  }

  const uploadJsonFile = async () => {
    const fileName = file.name;
    var reader = new FileReader();
    reader.onload = async (e) => {
      var fileContent = e.target.result;
      upload(fileName, JSON.parse(fileContent))
    };
    reader.readAsText(file);
  }

  return (
    <div className="documents">
      <div className="documents__container">
        <h1 className="documents__welcome-text">Documents</h1>
        <div style={{ display: "flex" }}>
          <button
            onClick={() => toggleJsonModal(true)}
            className="create-schema__button button--primary"
          >
            Index Documents
          </button>
        </div>
      </div>
      <div className="documents-attribute__container">
        {documents.map(document => (
          <div className="documents__attributes" key={document.id}>
            <p style={{ color: "#b8c2cc" }}>
              ID <span style={{ color: "#8795a1" }}>{document.id}</span>
            </p>
            <table className="documents-attribute__table">
              <tbody>
                {
                  Object.keys(document).map(key => (
                  <tr className="document__attribute" key={key}>
                    <td>{key}</td>
                    <td style={{ color: "#b8c2cc" }}> => </td>
                    <td style={{ fontWeight: "400" }}>{document[key]}</td>
                  </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <Modal
        isOpen={showingJsonModal}
        contentLabel="Label Here"
        onRequestClose={onClosingModal}
        className="documents-modal__content"
        overlayClassName="modal__overlay"
      >
        <div className="synonym-modal__header">
          <h3 style={{ fontWeight: "300", fontSize: "24px" }}>
            Add new documents to{" "}
            <b style={{ fontWeight: "500" }}>park_great-smoky-mountains</b>
          </h3>
          <span className="close" onClick={onClosingModal}>
            ×
          </span>
        </div>
        <div>
          {optionToUpload ? (
            <div>
              <div className="upload-header__container">
                <p className="upload-header__text">
                  There are three ways to send documents to your Engine for
                  indexing. You can paste raw JSON, upload a .json file, or POST
                  to the Documents API endpoint.
                </p>
                <p
                  style={{ marginTop: "16px" }}
                  className="upload-header__text"
                >
                  Click on your choice below or see Indexing by API.
                </p>
              </div>
              <div className="upload-option__container">
                <div
                  className="upload__option"
                  onClick={() => toggleOptionToUpload(false)}
                >
                  <p>
                    <i className="fas fa-file-signature"></i>
                  </p>
                  <p className="upload-title__text">Paste JSON</p>
                </div>
                <div
                  className="upload__option"
                  onClick={() => {
                    toggleOptionToUpload(false);
                    toggleJsonUpload(false);
                  }}
                >
                  <p>
                    <i className="fas fa-file-upload"></i>
                  </p>
                  <p className="upload-title__text">Upload a JSON File</p>
                </div>
              </div>
              <div className="upload__text">
                <div>
                  The Documents API can be used to add new documents to your
                  Engine, update documents, retrieve documents by id, and delete
                  documents. There are a variety of client libraries to help you
                  get started.
                </div>
              </div>
              <div className="upload__action">
                <button onClick={onClosingModal} className="button--secondary">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              {jsonUpload ? (
                <div>
                  <JsonEditor></JsonEditor>
                  <div className="synonym-modal__button">
                    <button
                      onClick={onClosingModal}
                      className="button--secondary"
                    >
                      Cancel
                    </button>
                    <button className="button--primary continue__button">
                      Continue
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    id="file"
                    className="uploader__input"
                    onChange={onFileChange}
                    accept="application/json"
                  />
                  <label htmlFor="file" className="uploader__label">
                    <i className="fas fa-upload upload-icon"></i>
                    <div>
                      {!file ? (
                        <div>Upload a .json</div>
                      ) : (
                        <div>{file && file.name}</div>
                      )}
                    </div>
                  </label>

                  {schemaFields.length > 0 && (
                    <div>
                      <label>
                        Select ID field
                        <select
                          value={idField}
                          onChange={e => setIdField(e.target.value)}
                        >
                          {schemaFields.map(f => (
                            <option value={f} key={f}>
                              {f}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  )}
                  <div className="synonym-modal__button">
                    <button
                      onClick={onClosingModal}
                      className="button--secondary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={uploadJsonFile}
                      className="button--primary continue__button"
                      disabled={working || !idField}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
