import React, { useContext, useState } from 'react';
import { Context } from '../../utils/Reducer';
import { Container } from './EditContainer';
import './Modal.css';


const MegaEdit = (props) => {
  const { state } = useContext(Context);
  const [tags, setTags] = useState([]);
  const triggerText = 'edit information';
  const user = state.user;


  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: user, tags: tags })
  }

  function handleNewInfo(e) {
    e.preventDefault(e);
    setTags(e.target[0].value);
  }
  console.log(tags);

  const onSubmit = async (e) => {
    e.preventDefault(e);

    (console.log(tags))
      // .then(fetch('http://localhost:3000/auth/edit',
      //   options))

      // .then(console.log(e.target[0].value, state))

      // .catch(err => console.log(err.message))
  };

  return (
    <div className="App">
      <Container triggerText={triggerText} onSubmit={onSubmit} onKeyDown={handleNewInfo} />
    </div>
  );
};

export default MegaEdit;