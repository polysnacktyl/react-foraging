import React, { useContext } from 'react';
import { Context } from '../../utils/Reducer';
import { UploadContainer } from './UploadContainer';
import './Modal.css';

const MegaUpload = (props) => {
  const { state } = useContext(Context);
  const triggerText = 'uploadal modal';

  const onSubmit = (e) => {
    e.preventDefault(e);
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    console.log(e.target[2].value);
    console.log(state);
  };

  return (
    <div className="App">
      <UploadContainer triggerText={triggerText} onSubmit={onSubmit} />
    </div>
  );
};

export default MegaUpload;