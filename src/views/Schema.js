import React, {useEffect, useState} from "react";
import Solr from '../services/solr';

export default function Schema() {
  const [schemaAttributes, setSchemaAttributes] = useState([]);
  const [fieldTypes, setFieldTypes] = useState([]);

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

  const createNewAttribute = async (name, type) => {
    // netowrk call to create the new field in the schema
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
            {filteredSchemaAttributes().map((a, index) => (
              <tr className="schema__attribute" key={a.name}>
                <td>{a.name}</td>
                <td>
                  <select className="attribute__value" value={a.type} onChange={(e) => onFieldTypeChange(a.name, e.target.value)}>
                    {
                      filteredFieldTypes().map( ft => (
                        <option value={ft.name} key={ft.name}>{ft.name}</option>
                      ))
                    }
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
