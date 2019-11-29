import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import Solr from '../services/solr';
import cogoToast from "cogo-toast";
import ClipLoader from 'react-spinners/ClipLoader';
import classNames from 'classnames';

export default function Synonyms({ instance, core }) {
  const [showingAddSynonymsModal, toggleAddSynonymModal] = useState(false);
  let [ synonymSelectionType, toggleSynonymSelectionType ] = useState(true);
  let [ synonymLoader, toggleSynonymLoader ] = useState(true);
  let [ synonymValue, setSynonymValue] = useState("");
  let [ synonymCurrentIndex, setSynonymCurrentIndex ] = useState(null);
  let [ synonymArray, setSynonymArray] = useState([]);
  let [ synonymsList, setSynonymsList] = useState([]);

  useEffect(() => {
    const resetSynonymArray = () => {
      setSynonymCurrentIndex(null);
      if(showingAddSynonymsModal === false) {
        setSynonymArray([]);
      }
    }
    fetchAddedSynonymsList();
    resetSynonymArray();
  }, [showingAddSynonymsModal]);

  const addSynonymTag = () => {
    synonymArray = [
      ...synonymArray,
      ...synonymValue.trim().split(",")
    ];
    setSynonymArray(synonymArray);
    setSynonymValue("");
  }

  const addSynonymToApi = async () => {
    const solr = new Solr(instance, core);
    if(synonymCurrentIndex) {
      await solr.deleteSynonymEntry(synonymCurrentIndex);
      setSynonymCurrentIndex(null);
    }
    if(synonymArray.length > 1) {
      try {
        await solr.addSynonym([synonymArray.toString()]);
        cogoToast.success('Synonyms are added successfully');
        toggleAddSynonymModal(false);
        setSynonymArray([]);
        fetchAddedSynonymsList();
      } catch(e) {
        console.log(e);
      }
    }
    else {
      cogoToast.warn('Please type minimum 2 synonyms to add');
    }
  }

  const fetchAddedSynonymsList = async () => {
    const solr = new Solr(instance, core);
    const data = await solr.fetchSynonym();
    setSynonymsList(data.data.synonymMappings.managedList);
    toggleSynonymLoader(false);
  }

  const openEditSynonymsModal = synonym => {
    synonymArray = [
      ...synonymArray,
      ...synonym.trim().split(",")
    ];
    setSynonymArray(synonymArray);
    toggleAddSynonymModal(true);
  }

  const deleteSynonym = async (synonym, index) => {
    setSynonymCurrentIndex(index);
    const updatedSynonymArray = synonymArray.filter(currSynonym => synonym !== currSynonym);
    setSynonymArray(updatedSynonymArray);
  }

  const deleteSynonymEntry = async (index) => {
    const solr = new Solr(instance, core);
    try{
      await solr.deleteSynonymEntry(index);
      fetchAddedSynonymsList();
      cogoToast.success("Sucessfully deleted synonyms entry");
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div className="synonyms">
      <div className="synonyms-welcome__container">
        <h1 className="synonyms__welcome-text">Synonyms</h1>
        {
          synonymsList.length > 0 &&
          <button className="connection__button button--primary" onClick={() => toggleAddSynonymModal(true)}>
            Add Synonyms
          </button>
        }
      </div>
      <div>
        { synonymLoader ?
          <div className="synonym-container__loader">
          <ClipLoader
            sizeUnit={"px"}
            size={50}
            color={'#123abc'}
            loading={true}/>
          </div> :
          <div className="synonyms-table__container" >
            { synonymsList.length > 0 ?
            <table className="synonyms-attribute__table">
              <thead>
                <tr className="synonyms-attribute__head">
                  <th>Type</th>
                  <th>Expansion</th>
                  <th></th>
                </tr>  
              </thead>  
              <tbody>
                { synonymsList &&
                  synonymsList.map( (synonym, index)=> (
                  <tr className="synonyms-attribute__body" key={synonym} >
                    <th>Synonym</th>
                    <th>
                      <div className="synonyms-expansion">
                        { 
                          synonym.split(",").map( elem => (
                            <div key={elem} className="synonym-expansion__container">
                              <span>{elem}</span>
                              <span className="synonyms-expression">↔</span>
                            </div>
                          ))
                        }
                      </div>
                    </th>
                    <th>
                      <div className="synonyms-action__container">
                        <div className="documents-action__box" onClick={() => openEditSynonymsModal(synonym)}>
                          <i className="fas fa-edit"></i>
                        </div>
                        <div className="documents-action__box" onClick={() => {if(window.confirm(`Delete current synonym entry?`)){deleteSynonymEntry(index)};}}>
                          <i className="fas fa-trash"></i>
                        </div>
                      </div>  
                    </th>
                  </tr>
                  ))}
              </tbody>  
            </table> :
            <div>
              <div className="synonyms__heading">No Synonyms Yet</div>
              <div className="synonyms-body__text">Use Synonyms, Alternative Corrections or Placeholders to easily expand user queries.</div>
              <div className="synonyms__action">
                <button className="connection__button button--primary" onClick={() => toggleAddSynonymModal(true)}>
                    Add Synonyms
                </button>
              </div>
            </div>
            }
          </div>
        }
      </div>  

      <Modal
        isOpen={showingAddSynonymsModal}
        contentLabel="Label Here"
        onRequestClose={() => toggleAddSynonymModal(false)}
        className="synonyms-modal__content"
        overlayClassName="modal__overlay">

        <div className="synonym-modal__header">
          <h3>Add Expansion</h3>
          <span className="close" onClick={() => toggleAddSynonymModal(false)}>×</span>
        </div>        


        <div className="synonyms__text">
          <p>Use Synonyms to specify multiple words that should be considered equivalent.</p>  
        </div>

        <h4>Type</h4>

        <div className="synonyms__type">
          <div onClick={() => toggleSynonymSelectionType(true)} className={classNames({"synonyms-source__type": true, 'synonyms-source__active': synonymSelectionType })}>Synonyms</div>
          <div onClick={() => toggleSynonymSelectionType(false)} className={classNames({"synonyms-source__type": true, 'synonyms-source__active': !synonymSelectionType })}>One-way Synonyms</div>
        </div>

        <div>
          { synonymSelectionType === true ?
          <div className="form__row">
            <label style={{ marginTop: 20}}>Synonyms</label>
            <div className="synonym-tag__container">
            {
              synonymArray.length > 0 &&
              synonymArray.map( (synonym, index) => (
                <div className="synonym__tag" key={index}>
                  <span>{synonym}</span>
                  <span className="close synonym__delete" onClick={() => deleteSynonym(synonym, index)}>×</span>
                </div> 
              ))
            }
            </div>
            <input value={synonymValue} onChange={e => setSynonymValue(e.target.value)} placeholder="List Of Synonyms"/>
            <div>
              {
                synonymValue && <div onClick={addSynonymTag} className="synonym-add__suggestion">{`Add ${synonymValue}`}</div>
              }
            </div>
          </div> :
          <div className="form__row">
            <label style={{ marginTop: 20}}>Search Term</label>
            <input placeholder="Input Expression"/>
            <label style={{ marginTop: 20}}>Alternatives</label>
            <input placeholder="List Of Synonyms"/>
          </div>
          }
        </div>

        <div className="synonyms-action__button">
          <button
            className="button--secondary"
            onClick={() => toggleAddSynonymModal(false)}
            style={{ marginRight: 20 }}>
            Discard
          </button>
          <button onClick={addSynonymToApi} className="button--primary">
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}