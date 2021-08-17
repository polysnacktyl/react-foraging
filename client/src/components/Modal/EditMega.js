import React, { useContext, useState } from 'react';
import { Context } from '../../utils/Reducer';
import { Container } from './EditContainer';
import './Modal.css';


const MegaEdit = (props) => {
  const { state } = useContext(Context);
  const [tags, setTags] = useState('');
  const triggerText = 'edit information';
  const user = state.user;
  const image = state.images._id;


  const onSubmit = async (e) => {
    e.preventDefault(e);

    setTags(e.target[0].value);

  };



  const axiosEdit = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/edit', {
        method: 'PUT',
        body: JSON.stringify({ tags: tags, user: user, _id: image }),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log(res.json());

    } catch (err) { console.log(err.message) }
  }
  axiosEdit();


  return (
    <div className="App">
      <Container triggerText={triggerText} user={state.user} onSubmit={onSubmit} />
    </div>
  );
};

export default MegaEdit;