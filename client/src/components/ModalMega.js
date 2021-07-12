import React from 'react';
import './Modal.css';
import { Container } from './ModalContainer';

const ModalMega = (props) => {
  const triggerText = '+🍄';
  // const onSubmit = (event) => {
  //   event.preventDefault(event);
  // };
  return (
    <div className="App">

      <Container triggerText={triggerText} onSubmit={props.handleImageUpload} />

    </div>
  );
};

export default ModalMega;