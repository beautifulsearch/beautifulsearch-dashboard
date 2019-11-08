import React, {useEffect, useState} from "react";
import Modal from 'react-modal';
import cogoToast from "cogo-toast";
import Solr from '../services/solr';

export default function Schema() {
  const [schemaAttributes, setSchemaAttributes] = useState([]);
  const [fieldTypes, setFieldTypes] = useState([]);
  const [showingAddFieldModal, toggleAddFieldModal ] = useState(false);
  const [newField, setNewField] = useState({name: '', type: ''});

  // schema
  const fetchSchemaAttributes = async () => {
    const solr = new Solr();
    const { data } = await solr.getSchema();
    setSchemaAttributes(data.fields);
  }

  useEffect(() => {
    fetchSchemaAttributes();
  }, []);

  const filteredSchemaAttributes = () => {
    return schemaAttributes.filter(a => !a.name.startsWith('_'));
  }


  // field types
  const fetchFieldTypes = async () => {
    const solr = new Solr();
    const { data } = await solr.getFields();
    setFieldTypes(data.fieldTypes);
  }

  useEffect(() => {
    fetchFieldTypes();
  }, []);

  const filteredFieldTypes = () => {
    return fieldTypes.filter(ft => !ft.name.startsWith('_'));
  }

  const onFieldTypeChange = (attribute, type) => {
    const schemeAttributesClone = [...schemaAttributes];
    const index = schemeAttributesClone.findIndex((a) => a.name === attribute);
    schemeAttributesClone[index].type = type;
    setSchemaAttributes([...schemeAttributesClone]);
  }

  const syncSchemaChagne = async () => {
    // confirm
    // network call to update the schema changes
  }

  const createNewAttribute = async () => {
    const { name, type } = newField;
    if (!name) {
      cogoToast.warn("Name is required to add a field");
      return;
    }

    if (!type) {
      cogoToast.warn("Type is required to add a field");
      return;
    }

    const solr = new Solr();
    try {
      await solr.addFields(newField);
      setNewField({name: '', type: ''});
      toggleAddFieldModal(false);
      fetchSchemaAttributes();
      cogoToast.success("New field addedd successfully");
    } catch(e) {
      console.log(e.message);
      cogoToast.error("Failed to add new field");
    }
  }

  return (
    <div className="schema">
      <div className="schema__container">
        <div>
          <h1 className="schema__welcome-text">Manage Engine Schema</h1>
          <div className="schema__headline">
            Add new fields or change the types of existing ones.
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <button
            className="create-schema__button button--primary"
            onClick={() => toggleAddFieldModal(true)}
          >
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
            {filteredSchemaAttributes().map((a, index) => (
              <tr className="schema__attribute" key={a.name}>
                <td>{a.name}</td>
                <td>
                  <select
                    className="attribute__value"
                    value={a.type}
                    onChange={e => onFieldTypeChange(a.name, e.target.value)}
                  >
                    {filteredFieldTypes().map(ft => (
                      <option value={ft.name} key={ft.name}>
                        {ft.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showingAddFieldModal}
        contentLabel="Label Here"
        onRequestClose={() => toggleAddFieldModal(false)}
        className="modal__content"
        overlayClassName="modal__overlay"
      >
        <h3>Add a new field to schema</h3>

        <div className="form__row">
          <label>Field Name</label>
          <input
            placeholder="field_name"
            onChange={e => setNewField({ ...newField, name: e.target.value })}
          />
        </div>

        <div className="form__row">
          <label>Field Type</label>
          <select
            className="attribute__value"
            value={newField.type}
            onChange={e => setNewField({ ...newField, type: e.target.value })}
          >
            {filteredFieldTypes().map(ft => (
              <option value={ft.name} key={ft.name}>
                {ft.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: 40 }}>
          <button className="button--primary" onClick={createNewAttribute}>
            Add Field
          </button>
          <button
            className="button--secondary"
            onClick={() => toggleAddFieldModal(false)}
            style={{ marginLeft: 20 }}
          >
            Close Modal
          </button>
        </div>
      </Modal>
    </div>
  );
}
