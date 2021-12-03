import React from 'react';
import './SaveBtn.css';

function SaveBtn(props){

  return (
    <button className="save-button" onClick={props.handleSave}>Save</button>
  )
};

export default SaveBtn;