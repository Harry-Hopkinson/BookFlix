import React from 'react';
import './DeleteToast.css';
import Toast from 'react-bootstrap/Toast';

function DeleteToast(props) {

  const toastStyle = {
    position: 'absolute',
    minWidth: 300,
    bottom: 10,
    right: 40,
  };

  if (props.show) {
    return (
      <Toast style={toastStyle} show={props.show} onClose={() => props.setShow(false)} delay={2000} autohide>
        <Toast.Header>
          <strong className="mr-auto">Book Deleted</strong>
        </Toast.Header>
        <Toast.Body>{props.title}</Toast.Body>
      </Toast>
    );
  }
  return null
}

export default DeleteToast;