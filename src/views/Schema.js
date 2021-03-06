import React, {useEffect, useState} from "react";
import Modal from 'react-modal';
import cogoToast from "cogo-toast";
import Solr from '../services/solr';

export default function Schema({ instance, core }) {
  const [schemaAttributesBackup, setSchemaAttributesBackup] = useState([]);
  const [schemaAttributes, setSchemaAttributes] = useState([]);
  const [fieldTypes, setFieldTypes] = useState([]);
  const [showingAddFieldModal, toggleAddFieldModal ] = useState(false);
  const [newField, setNewField] = useState({name: '', type: ''});

  // schema
  const fetchSchemaAttributes = async () => {
    const solr = new Solr(instance, core);
    const { data } = await solr.getSchema();
    setSchemaAttributes(data.fields.map(d => ({...d})));
    // store the value in the backup field
    // to diff and make changes
    // and reset back to the right value
    setSchemaAttributesBackup(data.fields.map(d => ({...d})));
  }

  useEffect(() => {
    fetchSchemaAttributes();
  }, []);

  const filteredSchemaAttributes = () => {
    return schemaAttributes.filter(a => !a.name.startsWith('_'));
  }


  // field types
  const fetchFieldTypes = async () => {
    const solr = new Solr(instance, core);
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

  const deleteSchemaAttribute = async (name) => {
    const solr = new Solr(instance, core);
    try {
      await solr.deleteField(name);
      cogoToast.success("Field deleted successfully");
    }
    catch(e) {
      console.log(e);
      cogoToast.error(`Failed to delete field`);
    } finally {
      fetchFieldTypes();
      fetchSchemaAttributes();
    }
  }

  const syncSchemaChange = async () => {
    if (window.confirm("Syncing the changes will break existing search. You will need to reindex the data for the app to work correctly. Do you agree?")) {
      const solr = new Solr(instance, core);
      let syncSuccess = false;
      for (let i=0; i<schemaAttributes.length; i++) {
        const orignal = schemaAttributesBackup[i];
        const updated = schemaAttributes[i];

        if ((orignal.name !== updated.name) || (orignal.type !== updated.type)) {
          syncSuccess = true;
          try {
            await solr.deleteField(orignal.name);
            await solr.addField({
              name: updated.name,
              type: updated.type
            });
          } catch (e) {
            syncSuccess = false;
            console.log(e);
            cogoToast.error(`Failed when updating field ${orignal.name}, please contact support for more information`);
            break;
          }
        }
      }

      syncSuccess && cogoToast.success("Schema update successful. Please reindex the data.")
    }
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

    const solr = new Solr(instance, core);
    try {
      await solr.addField(newField);
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
          <button
            className="create-schema__button button--secondary"
            onClick={syncSchemaChange}
          >
            Update types
          </button>
        </div>
      </div>
      <div className="schema-attribute__container">
        <table className="schema-container__table">
          <tbody>
            {filteredSchemaAttributes().map((a, index) => (
              <tr className="schema__attribute" key={a.name}>
                <td className="schema-attribute__name">{a.name}</td>
                <td>
                  <div style={{ display: "flex"}}>
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
                    <button className="delete__button"  onClick={() => {if(window.confirm(`Delete the item ${a.name} ?`)){deleteSchemaAttribute(a.name)};}}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>  
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
