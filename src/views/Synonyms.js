import React, {useState} from "react";
import Modal from 'react-modal';

export default function Synonyms() {
  const [showingAddSynonymsModal, toggleAddSynonymModal] = useState(false);
  let synonymSelectionType = true;  
  let synonyms = []; //fill in synonyms

  const toggleSynonymType = (value) => {
    synonymSelectionType = value;
    let synonym = document.getElementById('synoyms');
    let synonymOneWay = document.getElementById('one-way-synoyms');
    if(synonymSelectionType === true) {
      synonymOneWay.classList.remove('synonyms-source__active');
      synonym.classList.add('synonyms-source__active');
    }
    else{
      synonym.classList.remove('synonyms-source__active');
      synonymOneWay.classList.add('synonyms-source__active');
    }
  };

  return (
    <div className="synonyms">
      <div> 
        { synonyms.length > 0 ?
        <table className="synonyms-attribute__table">
          <thead>
            <tr className="synonyms-attribute__head">
              <th>Type</th>
              <th>Expansion</th>
              <th></th>
            </tr>  
          </thead>  
          <tbody>
            <tr className="synonyms-attribute__body">
              <th>Synonym</th>
              <th>
                <div className="synonyms-expansion">
                  <div>{synonyms[0]}</div>
                  <div className="synonyms-espression">↔</div>
                  <div>{synonyms[1]}</div>
                </div>
              </th>
              <th>
                <div>
                  <span style={{ marginRight: 16, padding: 8}}>Edit</span>  
                  <span style={{ padding: 8}}>Delete</span>
                </div>  
              </th>
            </tr>
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
          <div onClick={() => toggleSynonymType(true)} id="synoyms" className="synonyms-source__active synonyms-source__type">Synonyms</div>
          <div onClick={() => toggleSynonymType(false)} id="one-way-synoyms" className="synonyms-source__type">One-way Synonyms</div>
        </div>

        <div>
          { synonymSelectionType === false ?
          <div className="form__row">
            <label style={{ marginTop: 20}}>Synonyms</label>
            <input placeholder="List Of Synonyms"/>
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
          <button className="button--primary">
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}