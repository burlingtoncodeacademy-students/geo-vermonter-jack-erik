import React from 'react'

function Modal(props) {

    if (!props.modalIsOpen) {
        return null;
    } else {
     return (
             <div id='modal-background'>
                 <div id='modal-box'>
                     <p>List of Vermont counties</p>
                     <button onClick={props.modalUpdater}>Close</button>
                 </div>
             </div>
     )
    }
    // take props.isOpen (default to false)

    // return a <ul> with a list of VT counties based on a JSON file probably

    // return two buttons: guess and cancel

    // functions for guess and cancel (in parent/pass as props?)


    return;
}

export default Modal;